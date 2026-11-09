'use client';

import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, Clock, ChevronRight, ArrowLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: "Announcements" | "Testing" | "AWIM Outreach" | "Competitions";
  author: string;
  date: string;
  lastUpdated?: string;
  readTime: string;
}

export default function BlogTab() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    fetchPosts();
  }, []);

  const getFilteredPosts = () => {
    return posts.filter(post => {
      const matchQuery = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === "All" || post.category === selectedCategory;
      return matchQuery && matchCategory;
    });
  };

  if (!isMounted) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center font-mono gap-3 text-slate-400">
        <div className="w-8 h-8 border-2 border-torque-orange border-t-transparent rounded-full animate-spin" />
        <span>Syncing Blog Feed...</span>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn py-16 px-4 max-w-7xl mx-auto space-y-12">
      {/* Title */}
      <div className="space-y-4 text-center">
        <span className="inline-block px-3 py-1 bg-apex-red/10 border border-apex-red/30 text-apex-red font-mono text-xs uppercase tracking-widest skew-x-3">
          Chapter News &amp; Bulletins
        </span>
        <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          SAEINDIA CHAPTER BLOG &amp; REPORTS
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm font-sans">
          Stay updated with track shakedown results, technical design updates, community outreach updates, and official announcements.
        </p>
      </div>

      <div className="space-y-8 animate-fadeIn">
        {/* Filters Bar */}
        <div className="bg-[#1E2025]/50 border border-white/10 rounded-lg p-5 flex flex-col sm:flex-row gap-4 justify-between items-center glass-panel">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-3.5 text-slate-400" size={16} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blog reports..."
              className="w-full bg-carbon-900 border border-white/10 rounded p-3 pl-10 font-mono text-xs text-white focus:outline-none focus:border-apex-red transition-all font-semibold"
            />
          </div>

          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {["All", "Testing", "AWIM Outreach", "Announcements", "Competitions"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 border rounded cursor-pointer transition-all uppercase font-bold ${
                  selectedCategory === cat 
                    ? "bg-apex-red border-apex-red text-white" 
                    : "bg-transparent border-white/5 text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getFilteredPosts().map((post) => (
            <div 
              key={post.id} 
              className="bg-[#1E2025]/40 border border-white/10 rounded-lg p-6 glass-panel flex flex-col justify-between space-y-4 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center font-mono text-xs text-slate-400 uppercase font-bold">
                  <span className="text-torque-orange">{post.category}</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                </div>

                <h3 className="font-heading font-bold text-base text-white uppercase group-hover:text-apex-red transition-colors leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-slate-400 font-sans text-xs leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="border-t border-white/5 pt-4 flex justify-between items-center">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                  <User size={12} className="text-slate-500" />
                  <span>{post.author}</span>
                </div>
                <button 
                  onClick={() => setActivePost(post)}
                  className="flex items-center gap-1 text-xs font-mono font-bold uppercase text-apex-red hover:text-white transition-colors cursor-pointer"
                >
                  <span>Read More</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}

          {getFilteredPosts().length === 0 && (
            <div className="col-span-full py-16 text-center font-mono text-xs text-slate-500 bg-carbon-900/40 border border-white/5 rounded-lg">
              No blog reports matching your filter queries were found in our registry database.
            </div>
          )}
        </div>
      </div>

      {/* Full Article Modal View */}
      <AnimatePresence>
        {activePost !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-center items-center p-4 sm:p-8"
            onClick={() => setActivePost(null)}
          >
            <motion.div 
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#131519] border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              {/* Sticky Header with Close Button */}
              <div className="sticky top-0 bg-[#131519]/90 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center z-10">
                <button 
                  onClick={() => setActivePost(null)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white rounded font-mono text-xs uppercase cursor-pointer transition-all"
                >
                  <ArrowLeft size={14} />
                  <span>Back to Feed</span>
                </button>
                <button 
                  onClick={() => setActivePost(null)}
                  className="w-8 h-8 flex justify-center items-center rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-8 lg:p-12 space-y-8">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4 items-center font-mono text-xs text-slate-400 uppercase font-bold border-b border-white/5 pb-4">
                    <span className="px-2.5 py-1 bg-torque-orange/10 border border-torque-orange/30 text-torque-orange rounded">
                      {activePost.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-slate-500" /> 
                      <span>{activePost.date}</span>
                      {activePost.lastUpdated && activePost.lastUpdated !== activePost.date && (
                        <span className="text-[10px] text-slate-500 font-normal lowercase italic ml-1">
                          (updated {activePost.lastUpdated})
                        </span>
                      )}
                    </span>
                    <span className="flex items-center gap-1"><User size={13} /> {activePost.author}</span>
                    <span className="flex items-center gap-1 ml-auto"><Clock size={13} /> {activePost.readTime}</span>
                  </div>

                  <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight leading-tight">
                    {activePost.title}
                  </h1>
                </div>

                {/* Article Content */}
                <div className="font-sans text-slate-300 text-sm leading-relaxed space-y-6 whitespace-pre-wrap border-t border-white/5 pt-6 pb-10">
                  {activePost.content}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
