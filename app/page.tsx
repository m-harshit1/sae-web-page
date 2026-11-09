"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Home, Wrench, Users, BookOpen, UserPlus, LayoutDashboard,
  Search, X, ChevronUp, Zap, Clock
} from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

import HomeTab     from "@/components/HomeTab";
import ProjectsTab from "@/components/ProjectsTab";
import TeamsTab    from "@/components/TeamsTab";
import BlogTab     from "@/components/BlogTab";
import JoinTab     from "@/components/JoinTab";
import PortalTab   from "@/components/PortalTab";
import GlobalUX    from "@/components/GlobalUX";

/* ── Types ──────────────────────────────────────────────────────────── */
type TabId = "home" | "projects" | "teams" | "blog" | "join" | "portal";

interface NavItem {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  mobileIcon: React.ReactNode;
  color: string;
}

interface SearchResult {
  label: string;
  tab: TabId;
  description: string;
  icon: React.ReactNode;
  category: string;
}

/* ── Nav config ─────────────────────────────────────────────────────── */
const navItems: NavItem[] = [
  { id: "home",     label: "Home",     icon: <Home size={14} />,          mobileIcon: <Home size={20} />,          color: "#E11D48" },
  { id: "projects", label: "Projects", icon: <Wrench size={14} />,        mobileIcon: <Wrench size={20} />,        color: "#F97316" },
  { id: "teams",    label: "Teams",    icon: <Users size={14} />,         mobileIcon: <Users size={20} />,         color: "#0EA5E9" },
  { id: "blog",     label: "Blog",     icon: <BookOpen size={14} />,      mobileIcon: <BookOpen size={20} />,      color: "#34D399" },
  { id: "join",     label: "Join",     icon: <UserPlus size={14} />,      mobileIcon: <UserPlus size={20} />,      color: "#A855F7" },
  { id: "portal",   label: "Portal",   icon: <LayoutDashboard size={14} />, mobileIcon: <LayoutDashboard size={20} />, color: "#F59E0B" },
];

/* ── Search index ───────────────────────────────────────────────────── */
const searchIndex: SearchResult[] = [
  { label: "Home",               tab: "home",     description: "Club overview, gallery & stats",           icon: <Home size={14} />,          category: "Pages" },
  { label: "Vehicle B-26 Specs", tab: "projects", description: "Chassis, drivetrain, suspension, brakes",  icon: <Wrench size={14} />,        category: "Pages" },
  { label: "Team Roster",        tab: "teams",    description: "Executive officers & subsystem leads",     icon: <Users size={14} />,         category: "Pages" },
  { label: "Blog & News",        tab: "blog",     description: "Shakedown reports, outreach updates",       icon: <BookOpen size={14} />,      category: "Pages" },
  { label: "Join Us",            tab: "join",     description: "Recruitment pipeline & sponsor tiers",      icon: <UserPlus size={14} />,      category: "Pages" },
  { label: "Admin Portal",       tab: "portal",   description: "Tasks, inventory & member roster",          icon: <LayoutDashboard size={14} />, category: "Pages" },
  { label: "Chassis FEA",        tab: "projects", description: "ANSYS stress & safety factor analysis",    icon: <Wrench size={14} />,        category: "Engineering" },
  { label: "CVT Calculator",     tab: "projects", description: "Interactive drivetrain speed calculator",   icon: <Wrench size={14} />,        category: "Engineering" },
  { label: "Baja ATV B-26",      tab: "projects", description: "50.1 km/h · 166.2 Nm · 2.94 m/s²",        icon: <Zap size={14} />,           category: "Engineering" },
  { label: "Org Hierarchy",      tab: "teams",    description: "Student leadership tree & divisions",       icon: <Users size={14} />,         category: "People" },
  { label: "Faculty Advisors",   tab: "teams",    description: "In-charge professors & their roles",        icon: <Users size={14} />,         category: "People" },
  { label: "AWIM Outreach",      tab: "home",     description: "K-12 STEM mentoring programme details",     icon: <Home size={14} />,          category: "Outreach" },
  { label: "Sponsorship Tiers",  tab: "join",     description: "Gold, Silver, Bronze ROI packages",         icon: <UserPlus size={14} />,      category: "Sponsors" },
  { label: "Parts Inventory",    tab: "portal",   description: "Admin: manage parts & allocation",          icon: <LayoutDashboard size={14} />, category: "Admin" },
];

const defaultResults = searchIndex.filter(r => r.category === "Pages");

/* ════════════════════════════════════════════════════════════════════
   ROOT PAGE
   ════════════════════════════════════════════════════════════════════ */
export default function SAEIndiaHubContent() {
  const [activeTab,      setActiveTab]      = useState<TabId>("home");
  const [prevTab,        setPrevTab]        = useState<TabId | null>(null);
  const [transitioning,  setTransitioning]  = useState(false);
  const [searchOpen,     setSearchOpen]     = useState(false);
  const [searchQuery,    setSearchQuery]    = useState("");
  const [focusedIdx,     setFocusedIdx]     = useState(0);
  const [showScrollTop,  setShowScrollTop]  = useState(false);
  const [liveTime,       setLiveTime]       = useState("");
  const [headerScrolled, setHeaderScrolled] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const mainRef        = useRef<HTMLElement>(null);

  /* ── Live clock ──────────────────────────────────────────────────── */
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setLiveTime(now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* ── Scroll events ───────────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      setHeaderScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Tab navigation with transition ─────────────────────────────── */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as TabId | null;
      if (tabParam && navItems.some(n => n.id === tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  const navigateTo = useCallback((tab: string) => {
    const t = tab as TabId;
    if (t === activeTab) return;
    setTransitioning(true);
    setPrevTab(activeTab);
    setTimeout(() => {
      setActiveTab(t);
      setTransitioning(false);
      setSearchOpen(false);
      setSearchQuery("");
      window.scrollTo({ top: 0, behavior: "instant" });
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("tab", t);
        window.history.replaceState(null, "", url.toString());
      }
    }, 120);
  }, [activeTab]);

  /* ── Search ──────────────────────────────────────────────────────── */
  const filteredResults = searchQuery.trim().length === 0
    ? defaultResults
    : searchIndex.filter(r =>
        r.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 10);

  const groupedResults = filteredResults.reduce<Record<string, SearchResult[]>>((acc, r) => {
    if (!acc[r.category]) acc[r.category] = [];
    acc[r.category].push(r);
    return acc;
  }, {});

  /* ── Keyboard handler ────────────────────────────────────────────── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(v => !v);
        setSearchQuery("");
        setFocusedIdx(0);
        return;
      }
      if (e.key === "Escape") { setSearchOpen(false); return; }
      if (searchOpen) {
        if (e.key === "ArrowDown") { e.preventDefault(); setFocusedIdx(i => Math.min(i + 1, filteredResults.length - 1)); }
        else if (e.key === "ArrowUp") { e.preventDefault(); setFocusedIdx(i => Math.max(i - 1, 0)); }
        else if (e.key === "Enter" && filteredResults[focusedIdx]) navigateTo(filteredResults[focusedIdx].tab);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [searchOpen, filteredResults, focusedIdx, navigateTo]);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 50);
  }, [searchOpen]);

  useEffect(() => { setFocusedIdx(0); }, [searchQuery]);

  /* ── Render tab ──────────────────────────────────────────────────── */
  const renderTab = () => {
    switch (activeTab) {
      case "home":     return <HomeTab     switchPage={navigateTo} />;
      case "projects": return <ProjectsTab />;
      case "teams":    return <TeamsTab    />;
      case "blog":     return <BlogTab     />;
      case "join":     return <JoinTab     />;
      case "portal":   return <PortalTab   />;
      default:         return <HomeTab     switchPage={navigateTo} />;
    }
  };

  const activeNav = navItems.find(n => n.id === activeTab);

  return (
    <>
      {/* ══ HEADER ══════════════════════════════════════════════════════ */}
      <header
        className="site-header"
        style={{ boxShadow: headerScrolled ? "0 1px 0 rgba(255,255,255,0.04), 0 8px 40px rgba(0,0,0,0.65)" : undefined }}
      >

        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4" style={{ height: "96px" }}>

          {/* ── Logos ── */}
          <button
            onClick={() => navigateTo("home")}
            className="flex items-center gap-5 shrink-0 group cursor-pointer"
            aria-label="SAEINDIA IIITDM Kurnool home"
          >
            {/* College Logo */}
            <img src="/college_logo.png" alt="IIITDM Kurnool" className="h-16 w-auto object-contain opacity-95 group-hover:opacity-100 transition-opacity drop-shadow-md" />
            
            <div className="h-10 w-px bg-white/20 hidden sm:block"></div>

            {/* Club Logo */}
            <img src="/club_logo.png" alt="SAEINDIA Club" className="h-20 w-auto object-contain opacity-100 transition-opacity drop-shadow-xl" />

            <span className="hidden sm:block leading-none ml-3">
              <strong className="block font-heading font-black text-[16px] text-white uppercase tracking-wide leading-tight">
                SAEINDIA
              </strong>
              <small className="block font-mono text-[10.5px] text-slate-400 tracking-[0.16em] uppercase mt-[3px]">
                IIITDM Kurnool
              </small>
            </span>
          </button>

          {/* ── Desktop & Mobile nav ── */}
          <nav className="flex items-center gap-[3px] flex-1 justify-start overflow-x-auto no-scrollbar sm:flex-nowrap" aria-label="Primary">
            {navItems.map(item => (
              <MagneticButton
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => navigateTo(item.id)}
                className={`tab-pill whitespace-nowrap shrink-0 ${activeTab === item.id ? "active" : ""}`}
                style={activeTab === item.id ? { ["--tab-color" as string]: item.color } : {}}
              >
                {item.icon}
                {item.label}
              </MagneticButton>
            ))}
          </nav>

          {/* ── Right controls ── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Live IST clock */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 border border-white/6 rounded font-mono text-[10px] text-slate-500 bg-white/[0.02]">
              <Clock size={10} className="text-slate-600" />
              <span className="tabular-nums">{liveTime}</span>
              <span className="text-slate-700">IST</span>
            </div>

            {/* Search button */}
            <button
              onClick={() => { setSearchOpen(true); setSearchQuery(""); }}
              className="flex items-center gap-2 px-3 py-2 border border-white/10 rounded-md text-slate-400 hover:text-white hover:border-white/22 hover:bg-white/[0.04] transition-all duration-150 cursor-pointer"
              style={{ fontSize: "0.72rem", fontFamily: "var(--font-jetbrains-mono)" }}
              aria-label="Open search (Ctrl+K)"
            >
              <Search size={13} />
              <span className="hidden sm:inline font-mono text-[0.70rem]">Search</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] text-slate-600 font-mono leading-none">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>

        {/* Active tab breadcrumb bar (subtle) */}
        <div className="hidden md:flex max-w-7xl mx-auto px-4 pb-[3px]">
          <div className="flex items-center gap-1.5 font-mono text-[9.5px] text-slate-600 uppercase tracking-widest">
            <span>SAEINDIA</span>
            <span className="text-slate-700">/</span>
            <span style={{ color: activeNav?.color ?? "#E11D48" }}>{activeNav?.label}</span>
          </div>
        </div>
      </header>

      {/* ══ MAIN CONTENT (with fade transition) ══════════════════════════ */}
      <main
        ref={mainRef}
        id="main-content"
        className="pb-20 md:pb-0"
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? "translateY(6px)" : "translateY(0)",
          transition: "opacity 0.12s ease, transform 0.12s ease",
        }}
      >
        {renderTab()}
      </main>

      <GlobalUX />

      {/* ══ MOBILE BOTTOM NAV (iOS-style) ════════════════════════════════ */}
      <nav
        className="md:hidden fixed inset-x-0 bottom-0 z-40 flex items-stretch"
        aria-label="Mobile navigation"
        style={{
          background: "rgba(10,11,13,0.97)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(20px) saturate(180%)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className="flex-1 flex flex-col items-center justify-center gap-[5px] py-3 transition-all duration-200 cursor-pointer relative"
              style={{ color: isActive ? item.color : "rgba(255,255,255,0.35)", background: "transparent", border: "none" }}
              aria-label={item.label}
            >
              {/* Active indicator dot */}
              {isActive && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-b-full animate-fadeIn"
                  style={{ background: item.color }}
                />
              )}
              <span className={`transition-transform duration-200 ${isActive ? "scale-110" : "scale-100"}`}>
                {item.mobileIcon}
              </span>
              <span className="font-mono text-[8.5px] font-bold uppercase tracking-wider leading-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* ══ SEARCH PALETTE ════════════════════════════════════════════════ */}
      {searchOpen && (
        <div
          className="search-overlay"
          onClick={e => { if (e.target === e.currentTarget) setSearchOpen(false); }}
          role="dialog"
          aria-label="Search"
          aria-modal="true"
        >
          <div className="search-panel" style={{ maxWidth: "680px", width: "calc(100vw - 32px)" }}>

            {/* Search input row */}
            <div className="flex items-center gap-3 px-5 border-b border-white/7" style={{ height: "60px" }}>
              <Search size={16} className="shrink-0" style={{ color: "#E11D48" }} />
              <input
                ref={searchInputRef}
                type="text"
                className="search-input"
                style={{ padding: 0, borderBottom: "none", fontSize: "0.95rem" }}
                placeholder="Search pages, specs, members, teams…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                aria-label="Search"
                aria-autocomplete="list"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="shrink-0 w-7 h-7 flex items-center justify-center border border-white/10 rounded text-slate-500 hover:text-white hover:border-white/20 transition-all cursor-pointer"
                style={{ background: "transparent", fontSize: "9px", fontFamily: "monospace" }}
              >
                ESC
              </button>
            </div>

            {/* Grouped results */}
            <div id="search-results" role="listbox" className="max-h-96 overflow-y-auto">
              {Object.keys(groupedResults).length > 0 ? (
                Object.entries(groupedResults).map(([category, items]) => (
                  <div key={category}>
                    {/* Category label */}
                    <div className="px-5 pt-3 pb-1 font-mono text-[9px] text-slate-600 uppercase tracking-[0.15em]">
                      {category}
                    </div>
                    {items.map((result, idx) => {
                      const globalIdx = filteredResults.indexOf(result);
                      return (
                        <button
                          key={idx}
                          role="option"
                          aria-selected={globalIdx === focusedIdx}
                          onClick={() => navigateTo(result.tab)}
                          onMouseEnter={() => setFocusedIdx(globalIdx)}
                          className={`search-result-item ${globalIdx === focusedIdx ? "focused" : ""}`}
                          style={{ width: "100%" }}
                        >
                          <span className="shrink-0 w-7 h-7 flex items-center justify-center rounded border border-white/8 bg-white/[0.03]"
                                style={{ color: navItems.find(n => n.id === result.tab)?.color ?? "#666" }}>
                            {result.icon}
                          </span>
                          <span className="flex-1 min-w-0 text-left">
                            <span className="block text-white font-bold text-xs leading-tight">{result.label}</span>
                            <span className="block text-slate-500 text-[10px] leading-tight mt-0.5 truncate">{result.description}</span>
                          </span>
                          <span className="shrink-0 px-2 py-0.5 bg-white/4 border border-white/8 rounded font-mono text-[9px] text-slate-600 uppercase">
                            {result.tab}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <Search size={28} className="mx-auto mb-3 text-slate-700" />
                  <p className="font-mono text-xs text-slate-600">No results for &quot;{searchQuery}&quot;</p>
                </div>
              )}
            </div>

            {/* Footer hints */}
            <div className="px-5 py-2.5 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {[["↑↓", "navigate"], ["⏎", "select"], ["ESC", "close"]].map(([key, label]) => (
                  <span key={key} className="flex items-center gap-1.5 font-mono text-[9px] text-slate-700">
                    <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/8 rounded text-[9px]">{key}</kbd>
                    {label}
                  </span>
                ))}
              </div>
              <span className="font-mono text-[9px] text-slate-700">Ctrl+K to toggle</span>
            </div>
          </div>
        </div>
      )}

      {/* ══ SCROLL-TO-TOP ════════════════════════════════════════════════ */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`scroll-top-btn ${showScrollTop ? "visible" : ""}`}
        aria-label="Scroll to top"
        title="Back to top"
        style={{ bottom: showScrollTop ? "80px" : "24px" }}
      >
        <ChevronUp size={19} />
      </button>
    </>
  );
}
