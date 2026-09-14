export interface ServerMarineNewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'Weather & Safety' | 'Ports & Shipping' | 'PFZ & Fisheries' | 'Marine Ecology' | 'Policy & Subsidy' | 'Ocean Technology';
  source: string;
  author?: string;
  publishedAt: string;
  readTime: string;
  importance: 'BREAKING' | 'HIGH' | 'REGULAR';
  tags: string[];
  coastalZone: 'West Coast' | 'East Coast' | 'All India' | 'Arabian Sea' | 'Bay of Bengal' | 'Andaman & Nicobar' | 'Lakshadweep';
  impactLevel: 'CRITICAL_SAFETY' | 'HIGH_POTENTIAL' | 'PORT_OPERATIONS' | 'POLICY_ADVISORY' | 'ROUTINE';
  keyTakeaway: string;
  relatedLocationId?: string;
  externalUrl?: string;
  isLiveFeed: boolean;
  feedType: 'LIVE_RSS' | 'STATIC_ARCHIVE';
}

const STATIC_REFERENCE_BULLETINS: ServerMarineNewsItem[] = [
  {
    id: 'bulletin-static-pfz-reference',
    title: 'Reference Operational Guide: High-Resolution OCM & Thermal Front Mapping Criteria',
    summary: 'Archived reference standard for pelagic convergence mapping, thermal break detection, and fuel optimization across western coastal corridors.',
    content: 'This static reference bulletin documents the standard operational methodology for Potential Fishing Zone (PFZ) advisory formulation. In genuine deployments, optical and radiometer swath data are analyzed to identify planktonic bloom boundaries and thermal fronts to optimize transit routes.',
    category: 'PFZ & Fisheries',
    source: 'Static Reference (Non-Live)',
    author: 'ORCA Maritime Documentation',
    publishedAt: 'Static Reference Bulletin',
    readTime: '3 min read',
    importance: 'REGULAR',
    tags: ['Reference Standard', 'PFZ Methodology', 'Fuel Optimization', 'SST Thermal Breaks'],
    coastalZone: 'West Coast',
    impactLevel: 'ROUTINE',
    keyTakeaway: 'Static reference guide for understanding pelagic aggregation patterns and nautical fuel conservation.',
    relatedLocationId: 'new-mangalore-nmpt',
    isLiveFeed: false,
    feedType: 'STATIC_ARCHIVE'
  },
  {
    id: 'bulletin-static-squall-guideline',
    title: 'Reference Safety Protocol: Offshore Gale & Squall Thresholds for Small Craft',
    summary: 'Static navigational safety standard: Wind speeds gusting over 45 km/h or waves exceeding 2.8m enforce mandatory harbor return protocols.',
    content: 'This static reference bulletin outlines maritime threshold safety protocols for artisanal and motorized fishing vessels. Under severe squall criteria, high-frequency swell surges require motorized traditional boats (Vallams) to stay within protected harbour bounds.',
    category: 'Weather & Safety',
    source: 'Static Reference (Non-Live)',
    author: 'ORCA Safety Protocols',
    publishedAt: 'Static Reference Bulletin',
    readTime: '2 min read',
    importance: 'REGULAR',
    tags: ['Safety Guideline', 'Small Craft Safety', 'Swell Waves', 'Vessel Regulations'],
    coastalZone: 'Arabian Sea',
    impactLevel: 'POLICY_ADVISORY',
    keyTakeaway: 'Strict vessel safety protocol guidelines; small motorized craft must respect wave and gust limits.',
    relatedLocationId: 'cochin-cpt',
    isLiveFeed: false,
    feedType: 'STATIC_ARCHIVE'
  },
  {
    id: 'bulletin-static-port-overview',
    title: 'Reference Infrastructure Overview: Vadhavan Greenfield Deepwater Port Project',
    summary: 'Archived backgrounder: Vadhavan Port project in Palghar district designed with a 20-meter natural draft for deep-draft vessel handling.',
    content: 'This static informational brief provides details on the planned deepwater greenfield port at Vadhavan in Maharashtra. The project includes modern container handling corridors and designated landing wharves for local coastal fishing fleets.',
    category: 'Ports & Shipping',
    source: 'Static Reference (Non-Live)',
    author: 'Maritime Project Briefs',
    publishedAt: 'Static Reference Bulletin',
    readTime: '4 min read',
    importance: 'REGULAR',
    tags: ['Vadhavan Port', 'Port Overview', 'Infrastructure Brief', 'Sagarmala'],
    coastalZone: 'West Coast',
    impactLevel: 'PORT_OPERATIONS',
    keyTakeaway: 'Background infrastructure brief on proposed western coastline port capacity additions.',
    relatedLocationId: 'vadhavan-port',
    isLiveFeed: false,
    feedType: 'STATIC_ARCHIVE'
  }
];

interface ParsedRssItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  source: string;
}

interface NewsCache {
  items: ServerMarineNewsItem[];
  timestamp: number;
}

let newsCache: NewsCache | null = null;
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

function stripHtml(html: string): string {
  return html
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function parseRssXml(xml: string, defaultSource: string): ParsedRssItem[] {
  const items: ParsedRssItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];

    const rawTitle = itemXml.match(/<title>(?:<!\[CDATA\[(.*?)\]\]>|(.*?))<\/title>/s);
    const title = stripHtml(rawTitle ? rawTitle[1] || rawTitle[2] || "" : "");

    const rawLink = itemXml.match(/<link>(?:<!\[CDATA\[(.*?)\]\]>|(.*?))<\/link>/s);
    const link = stripHtml(rawLink ? rawLink[1] || rawLink[2] || "" : "");

    const rawPubDate = itemXml.match(/<pubDate>(?:<!\[CDATA\[(.*?)\]\]>|(.*?))<\/pubDate>/s);
    const pubDate = stripHtml(rawPubDate ? rawPubDate[1] || rawPubDate[2] || "" : "");

    const rawDesc = itemXml.match(/<description>(?:<!\[CDATA\[(.*?)\]\]>|(.*?))<\/description>/s);
    const description = stripHtml(rawDesc ? rawDesc[1] || rawDesc[2] || "" : "");

    const rawSource = itemXml.match(/<source[^>]*>(?:<!\[CDATA\[(.*?)\]\]>|(.*?))<\/source>/s);
    const source = rawSource ? stripHtml(rawSource[1] || rawSource[2] || defaultSource) : defaultSource;

    if (title && (description || link)) {
      items.push({ title, link, pubDate, description, source });
    }
  }

  return items;
}

function classifyMaritimeNews(item: ParsedRssItem, index: number): ServerMarineNewsItem {
  const text = `${item.title} ${item.description}`.toLowerCase();

  // Zone classification
  let coastalZone: 'West Coast' | 'East Coast' | 'Arabian Sea' | 'Bay of Bengal' | 'All India' = 'All India';
  if (text.includes('kerala') || text.includes('kochi') || text.includes('mangaluru') || text.includes('karnataka') || text.includes('goa') || text.includes('mumbai') || text.includes('maharashtra') || text.includes('gujarat')) {
    coastalZone = text.includes('arabian') ? 'Arabian Sea' : 'West Coast';
  } else if (text.includes('tamil nadu') || text.includes('chennai') || text.includes('andhra') || text.includes('visakhapatnam') || text.includes('odisha') || text.includes('paradeep') || text.includes('bengal') || text.includes('kolkata')) {
    coastalZone = text.includes('bay of bengal') ? 'Bay of Bengal' : 'East Coast';
  }

  // Category classification
  let category: 'Weather & Safety' | 'Ports & Shipping' | 'PFZ & Fisheries' | 'Marine Ecology' | 'Policy & Subsidy' | 'Ocean Technology' = 'Weather & Safety';
  let impactLevel: 'CRITICAL_SAFETY' | 'HIGH_POTENTIAL' | 'PORT_OPERATIONS' | 'POLICY_ADVISORY' | 'ROUTINE' = 'ROUTINE';
  let importance: 'BREAKING' | 'HIGH' | 'REGULAR' = 'REGULAR';

  if (text.includes('cyclone') || text.includes('warning') || text.includes('alert') || text.includes('squall') || text.includes('storm') || text.includes('gale') || text.includes('rain') || text.includes('flood') || text.includes('wave')) {
    category = 'Weather & Safety';
    impactLevel = 'CRITICAL_SAFETY';
    importance = 'BREAKING';
  } else if (text.includes('fish') || text.includes('trawler') || text.includes('pfz') || text.includes('catch') || text.includes('marine stock') || text.includes('biomass')) {
    category = 'PFZ & Fisheries';
    impactLevel = 'HIGH_POTENTIAL';
    importance = 'HIGH';
  } else if (text.includes('port') || text.includes('ship') || text.includes('cargo') || text.includes('container') || text.includes('vessel') || text.includes('berth') || text.includes('dock') || text.includes('harbour')) {
    category = 'Ports & Shipping';
    impactLevel = 'PORT_OPERATIONS';
    importance = 'HIGH';
  } else if (text.includes('subsidy') || text.includes('scheme') || text.includes('policy') || text.includes('pmmsy') || text.includes('ministry')) {
    category = 'Policy & Subsidy';
    impactLevel = 'POLICY_ADVISORY';
  } else if (text.includes('mission') || text.includes('submersible') || text.includes('research') || text.includes('technology') || text.includes('satellite') || text.includes('isro')) {
    category = 'Ocean Technology';
  }

  // Relative publish time calculation
  let publishedFormatted = 'Just now';
  if (item.pubDate) {
    try {
      const parsedDate = new Date(item.pubDate);
      if (!isNaN(parsedDate.getTime())) {
        const diffHours = Math.round((Date.now() - parsedDate.getTime()) / (1000 * 60 * 60));
        if (diffHours < 1) {
          publishedFormatted = 'Live • Breaking News';
        } else if (diffHours < 24) {
          publishedFormatted = `${diffHours}h ago • Live Feed`;
        } else {
          publishedFormatted = `${Math.round(diffHours / 24)}d ago • Live Feed`;
        }
      }
    } catch {
      publishedFormatted = 'Live Dispatch';
    }
  }

  const tags: string[] = ['Live RSS', item.source];
  if (coastalZone !== 'All India') tags.push(coastalZone);
  if (text.includes('cyclone')) tags.push('Cyclone Bulletin');
  if (text.includes('port')) tags.push('Port Operation');
  if (text.includes('fisher')) tags.push('Fisheries');
  if (text.includes('weather') || text.includes('rain')) tags.push('Weather Update');

  return {
    id: `live-rss-${index}-${Date.now()}`,
    title: item.title,
    summary: item.description.length > 240 ? item.description.slice(0, 237) + '...' : item.description,
    content: item.description + (item.link ? `\n\nFull official dispatch: ${item.link}` : ''),
    category,
    source: item.source as any,
    author: `${item.source} Live Wire`,
    publishedAt: publishedFormatted,
    readTime: '2 min read',
    importance,
    tags,
    coastalZone,
    impactLevel,
    keyTakeaway: item.description.slice(0, 140) + '...',
    externalUrl: item.link,
    isLiveFeed: true,
    feedType: 'LIVE_RSS'
  };
}

export async function fetchLiveMarineNews(): Promise<{ items: ServerMarineNewsItem[]; fetchedAt: string; isLive: boolean }> {
  const now = Date.now();
  if (newsCache && (now - newsCache.timestamp) < CACHE_DURATION_MS) {
    return {
      items: newsCache.items,
      fetchedAt: new Date(newsCache.timestamp).toISOString(),
      isLive: true
    };
  }

  const feedEndpoints = [
    { url: 'https://www.thehindu.com/news/national/feeder/default.rss', source: 'The Hindu National' },
    { url: 'https://www.thehindu.com/news/national/kerala/feeder/default.rss', source: 'Coastal Kerala Desk' },
    { url: 'https://www.thehindu.com/news/national/tamil-nadu/feeder/default.rss', source: 'Coastal Tamil Nadu Desk' },
    { url: 'https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms', source: 'Times of India' }
  ];

  const parsedItems: ParsedRssItem[] = [];

  const results = await Promise.allSettled(
    feedEndpoints.map(async (feed) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      try {
        const res = await fetch(feed.url, {
          headers: { 'User-Agent': 'SAGAR-SAFE-Marine-Intelligence/2.0' },
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!res.ok) return [];
        const xml = await res.text();
        return parseRssXml(xml, feed.source);
      } catch (e) {
        clearTimeout(timeoutId);
        return [];
      }
    })
  );

  for (const r of results) {
    if (r.status === 'fulfilled') {
      parsedItems.push(...r.value);
    }
  }

  // Filter and score for maritime, coastal, weather, climate, port relevance
  const maritimeKeywords = [
    'sea', 'ocean', 'coast', 'coastal', 'marine', 'port', 'dock', 'harbour', 'harbor',
    'fish', 'fisher', 'cyclone', 'monsoon', 'rain', 'imd', 'weather', 'flood',
    'boat', 'ship', 'vessel', 'cargo', 'trawler', 'tsunami', 'water', 'tide', 'wave',
    'kerala', 'tamil nadu', 'chennai', 'mumbai', 'goa', 'gujarat', 'odisha', 'andhra',
    'isro', 'incois', 'coast guard', 'navy', 'waterways'
  ];

  const relevantRssItems = parsedItems.filter((item) => {
    const combined = `${item.title} ${item.description}`.toLowerCase();
    return maritimeKeywords.some(kw => combined.includes(kw));
  });

  // Convert to ServerMarineNewsItem objects
  const liveNewsItems: ServerMarineNewsItem[] = relevantRssItems.slice(0, 16).map((item, idx) => {
    return classifyMaritimeNews(item, idx);
  });

  // Combine live breaking items with our marked static reference bulletins
  // Place breaking live items at the top
  const combinedItems: ServerMarineNewsItem[] = [...liveNewsItems, ...STATIC_REFERENCE_BULLETINS];

  // Remove duplicates by title similarity
  const uniqueItems: ServerMarineNewsItem[] = [];
  const seenTitles = new Set<string>();

  for (const item of combinedItems) {
    const normalizedTitle = item.title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 40);
    if (!seenTitles.has(normalizedTitle)) {
      seenTitles.add(normalizedTitle);
      uniqueItems.push(item);
    }
  }

  newsCache = {
    items: uniqueItems,
    timestamp: now
  };

  return {
    items: uniqueItems,
    fetchedAt: new Date(now).toISOString(),
    isLive: liveNewsItems.length > 0
  };
}
