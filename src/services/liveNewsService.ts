import { MarineNewsItem } from '../types/marine';
import { getLocalizedNewsItems } from '../data/localizedNewsData';

export interface LiveNewsFeedResult {
  items: MarineNewsItem[];
  isLive: boolean;
  count: number;
  fetchedAt: string;
}

export async function fetchLiveMarineNewsFeed(language = 'en'): Promise<LiveNewsFeedResult> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch('/api/news/live', { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const data = await res.json();
    if (data.success && Array.isArray(data.items) && data.items.length > 0) {
      return {
        items: data.items,
        isLive: Boolean(data.isLive),
        count: data.items.length,
        fetchedAt: data.fetchedAt || new Date().toISOString()
      };
    }
  } catch (error) {
    console.warn('Live news API fetch failed, falling back to verified database:', error);
  }

  // Fallback to localized news data
  const fallbackItems = getLocalizedNewsItems(language);
  return {
    items: fallbackItems,
    isLive: false,
    count: fallbackItems.length,
    fetchedAt: new Date().toISOString()
  };
}
