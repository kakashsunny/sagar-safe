import React, { useState, useEffect, useCallback } from 'react';
import { 
  Newspaper, 
  Flame, 
  ShieldAlert, 
  Fish, 
  Ship, 
  Compass, 
  Search, 
  Clock, 
  ChevronRight, 
  Share2, 
  Check, 
  Sparkles,
  AlertTriangle,
  FileText,
  X,
  Radio,
  Volume2,
  VolumeX,
  MapPin,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { MarineNewsItem } from '../types/marine';
import { useLanguage } from '../context/LanguageContext';
import { 
  getLocalizedNewsItems, 
  getLocalizedNewsCategories, 
  getLocalizedZones, 
  LOCALIZED_NEWS_UI 
} from '../data/localizedNewsData';
import { speakTextInLanguage, stopSpeaking, getNewsArticleSpokenText } from '../utils/speechVoice';
import { fetchLiveMarineNewsFeed } from '../services/liveNewsService';

interface MarineNewsBulletinProps {
  onSelectLocationByName?: (locationName: string) => void;
  language?: string;
}

export const MarineNewsBulletin: React.FC<MarineNewsBulletinProps> = ({
  onSelectLocationByName,
  language: propLanguage
}) => {
  const { currentLanguage } = useLanguage();
  const activeLang = propLanguage || currentLanguage || 'en';

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedZone, setSelectedZone] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<MarineNewsItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingArticleId, setSpeakingArticleId] = useState<string | null>(null);

  // Live RSS state
  const [newsList, setNewsList] = useState<MarineNewsItem[]>(() => getLocalizedNewsItems(activeLang));
  const [isLiveFeed, setIsLiveFeed] = useState<boolean>(false);
  const [isLoadingLiveNews, setIsLoadingLiveNews] = useState<boolean>(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>('Live Wire Ready');

  const ui = LOCALIZED_NEWS_UI[activeLang] || LOCALIZED_NEWS_UI.en;
  const categories = getLocalizedNewsCategories(activeLang);
  const zones = getLocalizedZones(activeLang);

  const loadLiveNews = useCallback(async (lang: string) => {
    setIsLoadingLiveNews(true);
    try {
      const feed = await fetchLiveMarineNewsFeed(lang);
      if (feed.items && feed.items.length > 0) {
        setNewsList(feed.items);
        setIsLiveFeed(feed.isLive);
        setLastSyncedTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST');
      }
    } catch (e) {
      console.warn('Could not load live news:', e);
      setNewsList(getLocalizedNewsItems(lang));
    } finally {
      setIsLoadingLiveNews(false);
    }
  }, []);

  useEffect(() => {
    loadLiveNews(activeLang);
  }, [activeLang, loadLiveNews]);

  // Stop audio immediately whenever language changes or unmounts
  useEffect(() => {
    stopSpeaking();
    setSpeakingArticleId(null);
  }, [activeLang]);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const filteredNews = newsList.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesZone = selectedZone === 'ALL' || item.coastalZone === selectedZone || item.coastalZone === 'All India';
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      item.title.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query) ||
      item.source.toLowerCase().includes(query) ||
      item.tags.some(t => t.toLowerCase().includes(query));
    return matchesCategory && matchesZone && matchesSearch;
  });

  const handleShare = (item: MarineNewsItem) => {
    navigator.clipboard.writeText(`[SAGAR-SAFE AI Marine News] ${item.title} — Source: ${item.source}`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleToggleArticleVoice = (item: MarineNewsItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (speakingArticleId === item.id) {
      stopSpeaking();
      setSpeakingArticleId(null);
      return;
    }

    stopSpeaking();
    const spokenText = getNewsArticleSpokenText(item, activeLang);

    const started = speakTextInLanguage(
      spokenText,
      activeLang,
      () => setSpeakingArticleId(item.id),
      () => setSpeakingArticleId(null),
      () => setSpeakingArticleId(null)
    );

    if (!started) {
      alert('Speech audio is not supported in this browser.');
    }
  };

  const getCategoryIcon = (value: string) => {
    switch (value) {
      case 'Weather & Safety': return <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />;
      case 'PFZ & Fisheries': return <Fish className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Ports & Shipping': return <Ship className="w-3.5 h-3.5 text-blue-400" />;
      case 'Marine Ecology': return <Compass className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Policy & Subsidy': return <FileText className="w-3.5 h-3.5 text-purple-400" />;
      default: return <Newspaper className="w-3.5 h-3.5" />;
    }
  };

  const getImpactBadge = (level: MarineNewsItem['impactLevel']) => {
    switch (level) {
      case 'CRITICAL_SAFETY':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-400/40 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            <span>Critical Safety</span>
          </span>
        );
      case 'HIGH_POTENTIAL':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>High Potential PFZ</span>
          </span>
        );
      case 'PORT_OPERATIONS':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-400/40 flex items-center gap-1">
            <Ship className="w-3 h-3 text-blue-400" />
            <span>Port Operations</span>
          </span>
        );
      case 'POLICY_ADVISORY':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-400/40 flex items-center gap-1">
            <FileText className="w-3 h-3 text-purple-400" />
            <span>Policy & Subsidy</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
            Ocean Advisory
          </span>
        );
    }
  };

  const breakingArticles = newsList.filter(n => n.importance === 'BREAKING');

  return (
    <section id="marine-intelligence-news-bulletin" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      
      {/* Live Breaking News Floating Ticker */}
      {breakingArticles.length > 0 && (
        <div className="floating-glass-card rounded-2xl p-3 sm:p-4 mb-6 border border-amber-400/30 bg-gradient-to-r from-amber-950/40 via-sky-950/40 to-[#020b16] shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="px-2.5 py-1 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center gap-1.5 text-amber-300 text-xs font-mono font-bold tracking-wider">
                <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                <span>{ui.breakingDispatch}</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 hidden md:inline">
                • {breakingArticles[0].source}
              </span>
            </div>

            <div className="flex-1 truncate">
              <button 
                onClick={() => setActiveArticle(breakingArticles[0])}
                className="text-left text-xs sm:text-sm font-semibold text-white hover:text-cyan-300 transition-colors truncate block w-full"
              >
                {breakingArticles[0].title}
              </button>
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-auto">
              <button
                id="btn-breaking-listen-voice"
                onClick={(e) => handleToggleArticleVoice(breakingArticles[0], e)}
                className={`px-3 py-1 text-xs rounded-full font-mono flex items-center gap-1.5 transition-all ${
                  speakingArticleId === breakingArticles[0].id
                    ? 'bg-rose-500/30 text-rose-300 border border-rose-400/50 animate-pulse'
                    : 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 hover:bg-cyan-500/30'
                }`}
                title={speakingArticleId === breakingArticles[0].id ? ui.stopVoice : ui.listenToArticle}
              >
                {speakingArticleId === breakingArticles[0].id ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                    <span>{ui.stopVoice}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-cyan-300" />
                    <span>{ui.listenToArticle}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setActiveArticle(breakingArticles[0])}
                className="floating-glass-pill px-3 py-1 text-xs font-semibold text-cyan-200 border border-cyan-400/30 flex items-center gap-1"
              >
                <span>{ui.readFullDispatch}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section Header */}
      <div className="floating-glass-card rounded-3xl p-5 sm:p-7 lg:p-8 border border-sky-400/20 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 mb-6 border-b border-white/10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1 border ${
                isLiveFeed 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40' 
                  : 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30'
              }`}>
                <Radio className={`w-3 h-3 ${isLiveFeed ? 'text-emerald-400 animate-pulse' : 'text-cyan-400'}`} />
                {isLiveFeed ? 'LIVE NATIONAL WIRE FEED ACTIVE' : 'REAL-TIME OCEAN DISPATCHES'}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                • {newsList.length} Reports
              </span>
              <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
                • Synced: {lastSyncedTime}
              </span>
            </div>
            <h2 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center shadow-lg shadow-cyan-500/10">
                <Newspaper className="w-5 h-5" />
              </div>
              <span>MARINE INTELLIGENCE & SATELLITE DISPATCHES</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl">
              National coastal RSS dispatches alongside reference oceanographic advisories & maritime regulatory bulletins
            </p>
          </div>

          {/* Sync Button & Search Box */}
          <div className="flex items-center gap-2.5">
            <button
              id="btn-sync-live-news"
              onClick={() => loadLiveNews(activeLang)}
              disabled={isLoadingLiveNews}
              className="px-3 py-2.5 rounded-xl bg-sky-900/40 hover:bg-sky-800/50 border border-sky-400/30 text-xs font-mono text-cyan-200 flex items-center gap-1.5 transition-all shrink-0 disabled:opacity-50"
              title="Refresh live national news feed"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isLoadingLiveNews ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isLoadingLiveNews ? 'Syncing...' : 'Sync Live'}</span>
            </button>

            <div className="relative min-w-[200px] sm:min-w-[280px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="marine-news-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={ui.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-sky-950/60 border border-sky-400/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-3 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.value}
              id={`btn-news-cat-${cat.value.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                selectedCategory === cat.value
                  ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/50 shadow-md shadow-cyan-950/50'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {getCategoryIcon(cat.value)}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Coastal Zone Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 no-scrollbar border-b border-white/5">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mr-1 shrink-0">
            {ui.filterByZone}:
          </span>
          {zones.map((zn) => (
            <button
              key={zn.value}
              id={`btn-news-zone-${zn.value.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setSelectedZone(zn.value)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all ${
                selectedZone === zn.value
                  ? 'bg-sky-500/30 text-sky-200 border border-sky-400/40 shadow-sm'
                  : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              {zn.label}
            </button>
          ))}
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNews.map((item) => {
            const isSpeakingThis = speakingArticleId === item.id;
            return (
              <article
                key={item.id}
                id={`news-card-${item.id}`}
                onClick={() => setActiveArticle(item)}
                className={`floating-glass-card rounded-2xl p-5 cursor-pointer border transition-all flex flex-col justify-between group ${
                  isSpeakingThis 
                    ? 'border-cyan-400 bg-sky-950/70 shadow-[0_0_25px_rgba(6,182,212,0.3)]' 
                    : 'border-sky-400/20 hover:border-cyan-400/40'
                }`}
              >
                <div>
                  {/* Header Row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-lg bg-sky-950/80 border border-cyan-400/20 text-[10px] font-mono font-bold text-cyan-300">
                        {item.source}
                      </span>
                      {item.feedType === 'static_reference' || !item.isLiveFeed ? (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          Reference Bulletin
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          Live Wire
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-slate-400">
                        {item.publishedAt.split('•')[0]}
                      </span>
                    </div>
                    {getImpactBadge(item.impactLevel)}
                  </div>

                  {/* Article Title */}
                  <h3 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-cyan-200 transition-colors leading-snug mb-2">
                    {item.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-300/90 line-clamp-3 leading-relaxed mb-4">
                    {item.summary}
                  </p>

                  {/* Key Takeaway Box */}
                  <div className="bg-sky-950/50 rounded-xl p-3 border border-sky-400/15 mb-4 text-[11px] text-cyan-200/90 leading-relaxed font-mono">
                    <span className="text-amber-400 font-bold mr-1.5">⚡ {ui.keyTakeaway.toUpperCase()}:</span>
                    {item.keyTakeaway}
                  </div>
                </div>

                <div>
                  {/* Tag Pills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5 font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-slate-400 font-mono">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{item.readTime}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Audio listen button on card */}
                      <button
                        id={`btn-listen-article-${item.id}`}
                        onClick={(e) => handleToggleArticleVoice(item, e)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          isSpeakingThis 
                            ? 'bg-cyan-500/30 text-cyan-200 border-cyan-400/50 animate-pulse'
                            : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/5'
                        }`}
                        title={isSpeakingThis ? ui.stopVoice : ui.listenToArticle}
                      >
                        {isSpeakingThis ? (
                          <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5 text-cyan-300" />
                        )}
                      </button>

                      {/* Original Article External Link */}
                      {item.externalUrl && (
                        <a
                          href={item.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-cyan-300 hover:text-white transition-colors flex items-center gap-1 text-[11px] font-mono"
                          title="Open original article link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Source</span>
                        </a>
                      )}

                      {/* Share Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(item);
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                        title={ui.shareArticle}
                      >
                        {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                      </button>

                      <span className="text-cyan-300 group-hover:translate-x-1 transition-transform flex items-center gap-0.5 text-xs font-semibold">
                        {ui.readFullDispatch} <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <Newspaper className="w-10 h-10 text-slate-500 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-semibold text-slate-300">
              {newsList.length === 0 ? 'Live news unavailable.' : ui.noDispatchesFound}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {newsList.length === 0 ? (
                <span>National marine news wire feed is temporarily reconnecting.</span>
              ) : (
                <button 
                  onClick={() => {
                    setSelectedCategory('ALL');
                    setSelectedZone('ALL');
                    setSearchQuery('');
                  }}
                  className="text-cyan-400 underline hover:text-cyan-300 mt-2 font-mono"
                >
                  {ui.clearFilters}
                </button>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Full Article Reading Modal */}
      {activeArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveArticle(null)}
        >
          <div 
            className="floating-glass-card rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-cyan-400/30 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-xs font-mono font-bold">
                  {activeArticle.source}
                </span>
                {getImpactBadge(activeArticle.impactLevel)}
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Title */}
            <h2 className="font-display font-black text-xl sm:text-2xl text-white mb-3 leading-snug">
              {activeArticle.title}
            </h2>

            {/* Author / Timestamp Details */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono mb-5 pb-3 border-b border-white/5">
              {activeArticle.author && (
                <span>{ui.officialSource}: {activeArticle.author}</span>
              )}
              <span>•</span>
              <span>{activeArticle.publishedAt}</span>
              <span>•</span>
              <span>Zone: {activeArticle.coastalZone}</span>
            </div>

            {/* Full Content */}
            <div className="text-sm text-slate-200 leading-relaxed space-y-4 mb-6">
              <p className="font-medium text-cyan-100 text-base leading-relaxed bg-sky-950/40 p-3.5 rounded-2xl border border-sky-400/20">
                {activeArticle.summary}
              </p>
              <p className="text-slate-300 leading-relaxed">
                {activeArticle.content}
              </p>
            </div>

            {/* Actionable Takeaway Card */}
            <div className="bg-gradient-to-r from-cyan-950/60 to-blue-950/60 rounded-2xl p-4 border border-cyan-400/30 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 mb-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{ui.keyTakeaway.toUpperCase()}:</span>
              </div>
              <p className="text-xs text-white leading-relaxed font-mono">
                {activeArticle.keyTakeaway}
              </p>
            </div>

            {/* Related Location Link */}
            {activeArticle.relatedLocationId && onSelectLocationByName && (
              <div className="mb-6 p-3 rounded-xl bg-sky-900/20 border border-sky-400/20 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-cyan-200">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>{ui.relatedSector}: <strong>{activeArticle.relatedLocationId}</strong></span>
                </div>
                <button
                  onClick={() => {
                    onSelectLocationByName(activeArticle.relatedLocationId!);
                    setActiveArticle(null);
                  }}
                  className="text-xs font-bold text-cyan-400 hover:text-white underline font-mono"
                >
                  {ui.viewOnDashboard}
                </button>
              </div>
            )}

            {/* Tags & Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="flex flex-wrap gap-1.5">
                {activeArticle.tags.map((tag, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-cyan-200 border border-white/10 font-mono">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {/* Voice listen in modal */}
                <button
                  onClick={() => handleToggleArticleVoice(activeArticle)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                    speakingArticleId === activeArticle.id
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-400/40 animate-pulse'
                      : 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 hover:bg-cyan-500/30'
                  }`}
                >
                  {speakingArticleId === activeArticle.id ? (
                    <>
                      <VolumeX className="w-4 h-4 text-rose-400" />
                      <span>{ui.stopVoice}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-cyan-300" />
                      <span>{ui.listenToArticle}</span>
                    </>
                  )}
                </button>

                {activeArticle.externalUrl && (
                  <a
                    href={activeArticle.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="floating-glass-pill px-3.5 py-2 text-xs font-mono font-bold text-cyan-300 border border-cyan-400/40 hover:bg-cyan-500/20 flex items-center gap-1.5 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Live Source ↗</span>
                  </a>
                )}

                <button
                  onClick={() => handleShare(activeArticle)}
                  className="floating-glass-pill px-4 py-2 text-xs font-semibold text-slate-200 border border-white/10 hover:border-cyan-400/40 flex items-center gap-1.5"
                >
                  {copiedId === activeArticle.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{ui.copiedLink}</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{ui.shareArticle}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-4 py-2 rounded-xl bg-cyan-400 text-sky-950 font-bold text-xs hover:bg-cyan-300 transition-colors"
                >
                  {ui.closeArticle}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
