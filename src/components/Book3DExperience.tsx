"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Radio,
  ExternalLink,
  Award,
  Users,
  Mic2,
  Send,
  Download,
} from "lucide-react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { SPEAKING_TOPICS, PODCAST_EPISODES, SERVICES, MILESTONES, SITE_METADATA } from "@/data/site-data";

interface Book3DExperienceProps {
  initialPage?: number;
  onPageChange?: (page: number) => void;
}

export function Book3DExperience({
  initialPage = 0,
  onPageChange,
}: Book3DExperienceProps) {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [turnDirection, setTurnDirection] = useState<"next" | "prev">("next");
  const [activeTopicIndex, setActiveTopicIndex] = useState<number>(0);
  const [bookingFormSubmitted, setBookingFormSubmitted] = useState<boolean>(false);
  const totalSpreads = 6; // 0: Cover, 1: Prologue/Philosophy, 2: Keynotes, 3: Radio, 4: Advisory, 5: Epilogue/Booking

  useEffect(() => {
    if (initialPage !== undefined && initialPage !== currentPage) {
      setTurnDirection(initialPage > currentPage ? "next" : "prev");
      setCurrentPage(initialPage);
    }
  }, [initialPage]);

  const spreadTitles = [
    "Cover",
    "Prologue & The Philosophy",
    "Keynote Curriculum",
    "Happy Business Radio",
    "Advisory & Mentoring",
    "Epilogue & Direct Booking",
  ];

  const goToPage = (pageIndex: number) => {
    if (pageIndex < 0 || pageIndex >= totalSpreads || pageIndex === currentPage) return;
    setTurnDirection(pageIndex > currentPage ? "next" : "prev");
    setCurrentPage(pageIndex);
    if (onPageChange) onPageChange(pageIndex);
  };

  const nextPage = () => {
    if (currentPage < totalSpreads - 1) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  };

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextPage();
      if (e.key === "ArrowLeft") prevPage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  // Touch swipe handling
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) nextPage();
    else if (diff < -50) prevPage();
    touchStartX.current = null;
  };

  // Scroll wheel page turning with debounce
  const wheelLockRef = useRef<boolean>(false);
  const handleWheel = (e: React.WheelEvent) => {
    if (wheelLockRef.current) return;
    if (Math.abs(e.deltaY) > 40) {
      wheelLockRef.current = true;
      if (e.deltaY > 0) nextPage();
      else prevPage();
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 700);
    }
  };

  const featuredPodcast = PODCAST_EPISODES[0];
  const activeTopic = SPEAKING_TOPICS[activeTopicIndex] || SPEAKING_TOPICS[0];

  return (
    <div
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full min-h-[calc(100vh-80px)] py-6 sm:py-10 flex flex-col items-center justify-between select-none"
    >
      {/* Top Chapter Progress Bar */}
      <div className="w-full max-w-[1240px] px-6 mb-4 flex items-center justify-between text-xs font-mono text-[#5A5A58]">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#A85B32]" />
          <span className="uppercase tracking-widest text-[#121314] font-semibold">
            {currentPage === 0 ? "Book Cover" : `Spread 0${currentPage} of 05`}
          </span>
          <span className="hidden sm:inline text-[#A85B32]">·</span>
          <span className="hidden sm:inline text-[#121314] font-medium">
            {spreadTitles[currentPage]}
          </span>
        </div>

        {/* Quick Chapter Selector Dots */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {Array.from({ length: totalSpreads }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToPage(i)}
              className={`h-2 transition-all duration-300 rounded-full ${
                currentPage === i
                  ? "w-8 bg-[#A85B32]"
                  : "w-2 bg-[#E8E4DC] hover:bg-[#A85B32]/50"
              }`}
              aria-label={`Go to spread ${i}: ${spreadTitles[i]}`}
            />
          ))}
        </div>
      </div>

      {/* 3D BOOK STAGE CONTAINER */}
      <div className="relative w-full max-w-[1240px] px-4 sm:px-6 flex-1 flex items-center justify-center [perspective:2200px]">
        {/* Ambient Floor Shadow */}
        <div className="absolute -bottom-6 w-[88%] max-w-[980px] h-12 bg-black/25 rounded-full blur-2xl pointer-events-none" />

        <AnimatePresence mode="wait">
          {/* ========================================================= */}
          {/* SPREAD 0: THE 3D HARDCOVER BOOK FRONT COVER               */}
          {/* ========================================================= */}
          {currentPage === 0 && (
            <motion.div
              key="cover"
              initial={{ opacity: 0, scale: 0.94, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.94, rotateY: -25 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-full max-w-[500px] aspect-[1/1.42] rounded-r-2xl rounded-l-sm bg-[#141516] p-8 sm:p-12 flex flex-col justify-between border-y border-r border-[#3E3832] shadow-[24px_24px_60px_rgba(0,0,0,0.35),_-6px_0_16px_rgba(0,0,0,0.5)] overflow-hidden cursor-pointer group"
              onClick={nextPage}
            >
              {/* Spine Crease on Left */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/90 via-black/40 to-transparent border-r border-white/10" />
              <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-white/5" />

              {/* Cloth Leather Texture Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#A85B32_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

              {/* Top Foil Stamp */}
              <div className="pl-6 relative z-10 space-y-2">
                <span className="font-mono text-xs text-[#A85B32] uppercase tracking-[0.25em] font-semibold block">
                  Peter Salerno
                </span>
                <div className="w-14 h-[1.5px] bg-[#A85B32]/70" />
              </div>

              {/* Center Embossed Title */}
              <div className="pl-6 my-auto py-6 relative z-10 space-y-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-[#A85B32]/20 text-[#A85B32] border border-[#A85B32]/30">
                  Official Australian Edition
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FAF9F6] leading-[1.08] tracking-tight">
                  The Man <br />
                  With The <br />
                  <span className="text-[#A85B32] italic font-normal">Magic Message</span>
                </h1>
                <p className="font-sans text-xs sm:text-sm text-[#E8E4DC]/80 leading-relaxed max-w-sm">
                  Discovering Your Better Self Through Storytelling, Commercial Acumen & The Power of Laughter.
                </p>
              </div>

              {/* Bottom Interactive Open Prompt */}
              <div className="pl-6 pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
                <div className="space-y-0.5">
                  <span className="block font-mono text-xs uppercase tracking-widest text-[#A85B32]">
                    Keynote Speaker · Author · Broadcaster
                  </span>
                  <span className="block font-sans text-xs text-[#E8E4DC]/50">
                    Scroll, tap, or click to open
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextPage();
                  }}
                  className="px-4 py-2 rounded-full bg-[#A85B32] hover:bg-[#8F4822] text-white text-xs font-semibold tracking-wider uppercase flex items-center space-x-1.5 transition-colors shadow-sm"
                >
                  <span>Open Book</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* SPREAD 1: PROLOGUE & THE SALERNO PHILOSOPHY              */}
          {/* ========================================================= */}
          {currentPage === 1 && (
            <motion.div
              key="spread-1"
              initial={{ opacity: 0, rotateY: turnDirection === "next" ? 20 : -20 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: turnDirection === "next" ? -20 : 20 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative w-full max-w-[1180px] bg-[#FFFFFF] rounded-2xl border border-[#E8E4DC] shadow-[0_24px_60px_rgba(0,0,0,0.1)] overflow-hidden grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#E8E4DC]"
            >
              {/* Left Page: The Prologue */}
              <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 bg-[#FAF9F6]/40 relative">
                {/* Center Book Spine Shadow Overlay */}
                <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/5 to-transparent pointer-events-none" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-3 text-xs font-mono text-[#5A5A58]">
                    <span className="text-[#A85B32] font-semibold uppercase">Prologue</span>
                    <span>Page 01</span>
                  </div>

                  <span className="text-xs font-mono text-[#A85B32] uppercase tracking-wider block font-semibold">
                    Four Decades of Real Business Acumen
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#121314] leading-tight">
                    The accidental magician with a commercial compass.
                  </h2>
                  <p className="font-sans text-sm sm:text-base text-[#5A5A58] leading-relaxed">
                    Before stepping onto the world’s most prestigious conference stages, Peter Salerno built and led high-performing commercial practices in the relentlessly competitive worlds of financial advisory and sales leadership.
                  </p>
                  <p className="font-sans text-sm sm:text-base text-[#5A5A58] leading-relaxed">
                    Earning qualification for the prestigious <strong className="text-[#121314]">Million Dollar Round Table (MDRT)</strong> and later serving as <strong className="text-[#121314]">President of Laughter Clubs Australasia</strong>, Peter discovered a profound commercial truth: technical excellence opens the door, but genuine human warmth, psychological safety, and laughter are what sustain enduring performance.
                  </p>
                </div>

                {/* Credential Tags */}
                <div className="pt-4 border-t border-[#E8E4DC] grid grid-cols-3 gap-3 text-xs text-[#5A5A58]">
                  <div>
                    <span className="block font-serif text-base text-[#121314]">MDRT</span>
                    <span className="text-xs text-[#5A5A58]">Sales Acumen</span>
                  </div>
                  <div>
                    <span className="block font-serif text-base text-[#121314]">3,000+</span>
                    <span className="text-xs text-[#5A5A58]">Keynotes Delivered</span>
                  </div>
                  <div>
                    <span className="block font-serif text-base text-[#121314]">President</span>
                    <span className="text-xs text-[#5A5A58]">Laughter Clubs AU</span>
                  </div>
                </div>
              </div>

              {/* Right Page: The Salerno Philosophy */}
              <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 bg-[#FFFFFF] relative">
                {/* Center Book Spine Shadow Overlay */}
                <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />

                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-3 text-xs font-mono text-[#5A5A58]">
                    <span className="text-[#A85B32] font-semibold uppercase">Chapter I · Philosophy</span>
                    <span>Page 02</span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl text-[#121314] leading-[1.12]">
                    "A little laughter. <br />
                    <span className="italic font-normal text-[#121314]">A different perspective.</span> <br />
                    A powerful change."
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-[#5A5A58] leading-relaxed">
                    Most corporate speakers rely on manufactured urgency—a transient burst of adrenaline that fades before lunch. Peter’s work begins at the opposite pole: human potential is not added to a team from the outside; it is unlocked by clearing away the frictions, self-limiting beliefs, and seriousness that stifle natural brilliance.
                  </p>

                  <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E4DC] space-y-2 text-xs text-[#121314]">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A85B32] shrink-0" />
                      <span>Humor as a neurochemical reset for high-stress negotiations</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A85B32] shrink-0" />
                      <span>Eliminating invisible 'wobbly tables' in daily operations</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A85B32] shrink-0" />
                      <span>Sustainable, joyful ownership across all organizational tiers</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E4DC] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#5A5A58]">Chapter 2: Master Keynotes →</span>
                  <button
                    type="button"
                    onClick={nextPage}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#121314] text-white hover:bg-[#A85B32] text-xs font-semibold tracking-wider uppercase transition-colors"
                  >
                    <span>Turn Page</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* SPREAD 2: KEYNOTE CURRICULUM (THE 9 MASTER TOPICS)        */}
          {/* ========================================================= */}
          {currentPage === 2 && (
            <motion.div
              key="spread-2"
              initial={{ opacity: 0, rotateY: turnDirection === "next" ? 20 : -20 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: turnDirection === "next" ? -20 : 20 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative w-full max-w-[1180px] bg-[#FFFFFF] rounded-2xl border border-[#E8E4DC] shadow-[0_24px_60px_rgba(0,0,0,0.1)] overflow-hidden grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#E8E4DC]"
            >
              {/* Left Page: Keynote Roster Selector */}
              <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 bg-[#FAF9F6]/40 relative">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-3 text-xs font-mono text-[#5A5A58]">
                    <span className="text-[#A85B32] font-semibold uppercase">Chapter II · Speaking</span>
                    <span>Page 03</span>
                  </div>

                  <span className="text-xs font-mono text-[#A85B32] uppercase tracking-wider block font-semibold">
                    Curated Repertoire
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#121314] leading-tight">
                    Ideas that stay with you long after the applause fades.
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-[#5A5A58] leading-relaxed">
                    Select a keynote below to examine the core takeaways and audience profile:
                  </p>

                  {/* Topic Selectable List */}
                  <div className="space-y-2 pt-1">
                    {SPEAKING_TOPICS.map((topic, idx) => (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => setActiveTopicIndex(idx)}
                        className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition-colors ${
                          activeTopicIndex === idx
                            ? "bg-[#121314] text-white border-[#121314] shadow-xs"
                            : "bg-white text-[#121314] border-[#E8E4DC] hover:border-[#A85B32]"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="font-mono text-xs opacity-70">0{idx + 1}</span>
                          <span className="font-serif text-sm sm:text-base">{topic.title}</span>
                        </div>
                        <span className="text-xs font-mono uppercase opacity-70 hidden sm:inline">
                          {topic.category}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8E4DC] flex items-center justify-between text-xs font-mono text-[#5A5A58]">
                  <span>45–60 Mins · Global Stages</span>
                  <span className="text-[#A85B32]">Now Booking 2026 / 2027</span>
                </div>
              </div>

              {/* Right Page: Selected Topic Deep-Dive */}
              <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 bg-[#FFFFFF] relative">
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-3 text-xs font-mono text-[#5A5A58]">
                    <span className="text-[#A85B32] font-semibold uppercase">Keynote Syllabus</span>
                    <span>Page 04</span>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-[#A85B32] uppercase tracking-wider block font-semibold mb-1">
                      {activeTopic.category} Keynote
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#121314] leading-snug">
                      {activeTopic.title}
                    </h3>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-[#5A5A58] leading-relaxed">
                    {activeTopic.description}
                  </p>

                  <div className="space-y-2 pt-1">
                    <span className="font-mono text-xs uppercase text-[#A85B32] tracking-wider block font-semibold">
                      Key Takeaways for Your Audience:
                    </span>
                    <ul className="space-y-1.5">
                      {activeTopic.takeaways.map((item, i) => (
                        <li key={i} className="text-xs sm:text-sm text-[#121314] flex items-start">
                          <span className="text-[#A85B32] mr-2 font-serif font-bold">·</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E4DC] grid grid-cols-2 gap-3 text-xs text-[#5A5A58]">
                    <div>
                      <span className="font-mono text-xs uppercase text-[#121314] block font-semibold mb-0.5">
                        Ideal For
                      </span>
                      <span>{activeTopic.idealAudiences.join(", ")}</span>
                    </div>
                    <div>
                      <span className="font-mono text-xs uppercase text-[#121314] block font-semibold mb-0.5">
                        Formats
                      </span>
                      <span>{activeTopic.formats.join(" · ")}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E4DC] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => goToPage(5)}
                    className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-full bg-[#A85B32] text-white hover:bg-[#8F4822] text-xs font-semibold tracking-wider uppercase transition-colors"
                  >
                    <span>Enquire About This Keynote</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={nextPage}
                    className="inline-flex items-center justify-center space-x-1 px-4 py-2 rounded-full border border-[#E8E4DC] text-xs font-mono text-[#121314] hover:bg-[#FAF9F6] transition-colors"
                  >
                    <span>Next: Radio Deck</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* SPREAD 3: HAPPY BUSINESS RADIO (BROADCAST STUDIO)        */}
          {/* ========================================================= */}
          {currentPage === 3 && (
            <motion.div
              key="spread-3"
              initial={{ opacity: 0, rotateY: turnDirection === "next" ? 20 : -20 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: turnDirection === "next" ? -20 : 20 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative w-full max-w-[1180px] bg-[#FFFFFF] rounded-2xl border border-[#E8E4DC] shadow-[0_24px_60px_rgba(0,0,0,0.1)] overflow-hidden grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#E8E4DC]"
            >
              {/* Left Page: The Broadcast Story */}
              <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 bg-[#FAF9F6]/40 relative">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-3 text-xs font-mono text-[#5A5A58]">
                    <span className="text-[#A85B32] font-semibold uppercase">Chapter III · Broadcast</span>
                    <span>Page 05</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A85B32] uppercase tracking-widest font-semibold">
                    <Radio className="w-4 h-4 text-[#A85B32]" />
                    Weekly Podcast & National Broadcast
                  </span>

                  <h2 className="font-serif text-3xl sm:text-4xl text-[#121314] leading-tight">
                    Good conversations. <br />
                    <span className="italic font-normal text-[#A85B32]">Happier businesses.</span>
                  </h2>

                  <p className="font-sans text-xs sm:text-sm text-[#5A5A58] leading-relaxed">
                    Where business acumen meets the human side of success. Tune in weekly as Peter sits down with entrepreneurs, chief executives, and cultural pioneers to explore what actually sustains high-performance teams.
                  </p>

                  <div className="pt-2 space-y-2">
                    <span className="block font-mono text-xs uppercase tracking-wider text-[#5A5A58]">
                      Subscribe & Listen On:
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1.5 rounded-full border border-[#E8E4DC] bg-white text-xs text-[#121314] hover:border-[#A85B32] transition-colors cursor-pointer shadow-2xs">
                        Apple Podcasts
                      </span>
                      <span className="px-3 py-1.5 rounded-full border border-[#E8E4DC] bg-white text-xs text-[#121314] hover:border-[#A85B32] transition-colors cursor-pointer shadow-2xs">
                        Spotify
                      </span>
                      <span className="px-3 py-1.5 rounded-full border border-[#E8E4DC] bg-white text-xs text-[#121314] hover:border-[#A85B32] transition-colors cursor-pointer shadow-2xs">
                        YouTube
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E4DC] flex items-center justify-between text-xs font-mono text-[#5A5A58]">
                  <span>Studio Broadcast</span>
                  <span>100+ Episodes Aired</span>
                </div>
              </div>

              {/* Right Page: Tactile Audio Player Component */}
              <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 bg-[#FFFFFF] relative">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-3 text-xs font-mono text-[#5A5A58]">
                    <span className="text-[#A85B32] font-semibold uppercase">The Soundstage</span>
                    <span>Page 06</span>
                  </div>

                  <AudioPlayer
                    title={featuredPodcast.title}
                    episodeNumber={featuredPodcast.episodeNumber}
                    duration={featuredPodcast.duration}
                    guest={featuredPodcast.guest}
                  />
                </div>

                <div className="pt-4 border-t border-[#E8E4DC] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#5A5A58]">Next: Advisory & Masterclasses</span>
                  <button
                    type="button"
                    onClick={nextPage}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#121314] text-white hover:bg-[#A85B32] text-xs font-semibold tracking-wider uppercase transition-colors"
                  >
                    <span>Turn Page</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* SPREAD 4: BEYOND THE STAGE (ADVISORY & MENTORING)         */}
          {/* ========================================================= */}
          {currentPage === 4 && (
            <motion.div
              key="spread-4"
              initial={{ opacity: 0, rotateY: turnDirection === "next" ? 20 : -20 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: turnDirection === "next" ? -20 : 20 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative w-full max-w-[1180px] bg-[#FFFFFF] rounded-2xl border border-[#E8E4DC] shadow-[0_24px_60px_rgba(0,0,0,0.1)] overflow-hidden grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#E8E4DC]"
            >
              {/* Left Page: Beyond the Stage Philosophy */}
              <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 bg-[#FAF9F6]/40 relative">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-3 text-xs font-mono text-[#5A5A58]">
                    <span className="text-[#A85B32] font-semibold uppercase">Chapter IV · Advisory</span>
                    <span>Page 07</span>
                  </div>

                  <span className="text-xs font-mono text-[#A85B32] uppercase tracking-wider block font-semibold">
                    Organizational Transformation
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#121314] leading-tight">
                    Beyond the keynote stage.
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-[#5A5A58] leading-relaxed">
                    Keynotes ignite the room; facilitated workshops and confidential executive mentoring cement durable organizational change. Peter works with boards, chief executives, and leadership teams to dissolve operational bottlenecks.
                  </p>

                  <div className="space-y-3 pt-2">
                    {SERVICES.slice(1).map((srv) => (
                      <div key={srv.id} className="p-4 rounded-xl bg-white border border-[#E8E4DC] space-y-1.5 shadow-2xs">
                        <span className="font-mono text-xs text-[#A85B32] uppercase font-semibold block">
                          {srv.eyebrow}
                        </span>
                        <h4 className="font-serif text-lg text-[#121314]">{srv.title}</h4>
                        <p className="font-sans text-xs text-[#5A5A58] leading-relaxed">{srv.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8E4DC] flex items-center justify-between text-xs font-mono text-[#5A5A58]">
                  <span>Confidential Engagements</span>
                  <span>Boardrooms & Retreats</span>
                </div>
              </div>

              {/* Right Page: Milestones & Strategic Counsel */}
              <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 bg-[#FFFFFF] relative">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-3 text-xs font-mono text-[#5A5A58]">
                    <span className="text-[#A85B32] font-semibold uppercase">Proven Track Record</span>
                    <span>Page 08</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#121314]">
                    Four Decades of Commercial Leadership
                  </h3>

                  <div className="space-y-3 divide-y divide-[#E8E4DC] pt-1">
                    {MILESTONES.slice(0, 4).map((m) => (
                      <div key={m.year} className="pt-3 first:pt-0 flex items-start space-x-4">
                        <span className="font-mono text-xs text-[#A85B32] font-bold w-12 shrink-0">
                          {m.year}
                        </span>
                        <div>
                          <h5 className="font-serif text-sm font-semibold text-[#121314]">{m.title}</h5>
                          <p className="font-sans text-xs text-[#5A5A58] leading-relaxed mt-0.5">{m.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E4DC] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => goToPage(5)}
                    className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-[#121314] text-white hover:bg-[#A85B32] text-xs font-semibold tracking-wider uppercase transition-colors"
                  >
                    <span>Turn to Back Cover & Booking</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* SPREAD 5: EPILOGUE & THE BACK COVER (DIRECT CONVERSION)   */}
          {/* ========================================================= */}
          {currentPage === 5 && (
            <motion.div
              key="spread-5"
              initial={{ opacity: 0, rotateY: turnDirection === "next" ? 20 : -20 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: turnDirection === "next" ? -20 : 20 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative w-full max-w-[1180px] bg-[#FFFFFF] rounded-2xl border border-[#E8E4DC] shadow-[0_24px_60px_rgba(0,0,0,0.1)] overflow-hidden grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#E8E4DC]"
            >
              {/* Left Page: Praise & The Epilogue */}
              <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 bg-[#FAF9F6]/40 relative">
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-3 text-xs font-mono text-[#5A5A58]">
                    <span className="text-[#A85B32] font-semibold uppercase">Epilogue · Critical Praise</span>
                    <span>Page 09</span>
                  </div>

                  <span className="text-xs font-mono text-[#A85B32] uppercase tracking-wider block font-semibold">
                    What Conference Leaders Say
                  </span>

                  <div className="space-y-4 pt-1">
                    <blockquote className="p-4 rounded-xl bg-white border border-[#E8E4DC] space-y-2 shadow-2xs">
                      <p className="font-serif text-sm sm:text-base italic text-[#121314] leading-relaxed">
                        "Peter Salerno delivered the single most talked-about presentation of our annual convention. The room was laughing within sixty seconds, and our leaders walked away with frameworks they are still quoting months later."
                      </p>
                      <span className="block font-mono text-xs text-[#5A5A58]">
                        — Managing Director, National Financial Services Forum
                      </span>
                    </blockquote>

                    <blockquote className="p-4 rounded-xl bg-white border border-[#E8E4DC] space-y-2 shadow-2xs">
                      <p className="font-serif text-sm sm:text-base italic text-[#121314] leading-relaxed">
                        "In thirty years of organising national events, I have rarely seen an audience transition so seamlessly from genuine belly laughter to profound commercial focus."
                      </p>
                      <span className="block font-mono text-xs text-[#5A5A58]">
                        — Executive Producer, Corporate Summit Australasia
                      </span>
                    </blockquote>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E4DC] space-y-2 text-xs font-mono text-[#5A5A58]">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#A85B32]" />
                    <span>Australian Edition · Direct Speaker Enquiries</span>
                  </div>
                </div>
              </div>

              {/* Right Page: The Back Cover (Direct Booking & Contact) */}
              <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 bg-[#141516] text-white relative">
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono text-[#E8E4DC]/60">
                    <span className="text-[#A85B32] font-semibold uppercase">The Back Cover</span>
                    <span>Page 10</span>
                  </div>

                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-mono tracking-widest uppercase bg-[#A85B32]/20 text-[#A85B32] border border-[#A85B32]/30 mb-2">
                      Now Booking 2026 / 2027
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FAF9F6] leading-snug">
                      Let's make your next event something people remember.
                    </h3>
                  </div>

                  {bookingFormSubmitted ? (
                    <div className="p-6 rounded-xl bg-white/5 border border-[#A85B32] text-center space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-[#A85B32] mx-auto" />
                      <h4 className="font-serif text-xl text-white">Inquiry Received</h4>
                      <p className="text-xs text-[#E8E4DC]/70">
                        Thank you. Peter's executive management team will be in touch within one business day.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setBookingFormSubmitted(true);
                      }}
                      className="space-y-3 text-xs"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-[#A85B32]"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Work Email"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-[#A85B32]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Event / Company"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-[#A85B32]"
                        />
                        <select className="w-full px-3.5 py-2.5 rounded-lg bg-[#202124] border border-white/15 text-white focus:outline-none focus:border-[#A85B32]">
                          <option value="keynote">Keynote Presentation</option>
                          <option value="workshop">Interactive Workshop</option>
                          <option value="advisory">Executive Mentoring</option>
                        </select>
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Estimated date, location, or audience size..."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-[#A85B32] resize-none"
                      />
                      <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-[#A85B32] hover:bg-[#8F4822] text-white text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center space-x-2 shadow-sm"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Booking Enquiry</span>
                      </button>
                    </form>
                  )}

                  <div className="pt-2 flex items-center justify-between text-xs text-[#E8E4DC]/60 font-mono">
                    <a
                      href={`mailto:${SITE_METADATA.email}`}
                      className="hover:text-[#A85B32] transition-colors underline"
                    >
                      {SITE_METADATA.email}
                    </a>
                    <span>Sydney · Melbourne · Global</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => goToPage(0)}
                    className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#E8E4DC]/70 hover:text-white transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Back to Book Cover</span>
                  </button>
                  <span className="font-serif italic text-sm text-[#A85B32]">Peter Salerno</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BOTTOM BOOK NAVIGATION CONTROLS */}
      <div className="w-full max-w-[1240px] px-6 mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={prevPage}
          disabled={currentPage === 0}
          className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-mono transition-colors shadow-2xs ${
            currentPage === 0
              ? "opacity-30 cursor-not-allowed bg-white/40 text-[#5A5A58]"
              : "bg-white border border-[#E8E4DC] text-[#121314] hover:border-[#121314] hover:bg-[#FAF9F6] active:scale-95"
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous Page</span>
        </button>

        <div className="flex items-center space-x-2 text-xs font-mono text-[#5A5A58]">
          <span className="hidden sm:inline">Use arrow keys or scroll to flip pages</span>
          <span className="sm:hidden font-semibold text-[#121314]">
            {currentPage + 1} / {totalSpreads}
          </span>
        </div>

        <button
          type="button"
          onClick={nextPage}
          disabled={currentPage === totalSpreads - 1}
          className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-mono transition-colors shadow-2xs ${
            currentPage === totalSpreads - 1
              ? "opacity-30 cursor-not-allowed bg-white/40 text-[#5A5A58]"
              : "bg-[#121314] text-white hover:bg-[#A85B32] active:scale-95"
          }`}
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next Page</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
