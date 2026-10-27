"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, BookOpen, Bookmark } from "lucide-react";

interface HeaderProps {
  currentPage?: number;
  onNavigatePage?: (pageIndex: number) => void;
  totalPages?: number;
}

export function Header({
  currentPage = 0,
  onNavigatePage,
  totalPages = 6,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const chapters = [
    { label: "Cover", index: 0 },
    { label: "Prologue & Philosophy", index: 1 },
    { label: "Keynotes", index: 2 },
    { label: "Radio", index: 3 },
    { label: "Advisory", index: 4 },
    { label: "Epilogue & Booking", index: 5 },
  ];

  const handleChapterClick = (index: number) => {
    if (onNavigatePage) {
      onNavigatePage(index);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF9F6]/95 backdrop-blur-md py-3 border-b border-[#E8E4DC] shadow-xs"
          : "bg-transparent py-4.5"
      }`}
    >
      <div className="max-w-[1380px] mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Wordmark with Book Emblem */}
        <button
          type="button"
          onClick={() => handleChapterClick(0)}
          className="group flex items-center space-x-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121314] rounded cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-[#121314] flex items-center justify-center text-[#A85B32] shadow-xs group-hover:bg-[#A85B32] group-hover:text-white transition-colors duration-200">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl tracking-tight text-[#121314] leading-none group-hover:text-[#A85B32] transition-colors">
              Peter Salerno
            </span>
            <span className="font-mono text-xs tracking-widest text-[#A85B32] uppercase font-semibold mt-0.5">
              The Magic Message
            </span>
          </div>
        </button>

        {/* Desktop Book Ribbon Chapter Navigation */}
        <nav
          aria-label="Book Chapters"
          className="hidden lg:flex items-center space-x-1 bg-white/70 backdrop-blur-xs px-2 py-1 rounded-full border border-[#E8E4DC] shadow-2xs"
        >
          {chapters.map((ch) => {
            const isCurrent = currentPage === ch.index;
            return (
              <button
                key={ch.index}
                type="button"
                onClick={() => handleChapterClick(ch.index)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors duration-200 relative ${
                  isCurrent
                    ? "bg-[#121314] text-[#FFFFFF] font-semibold shadow-xs"
                    : "text-[#5A5A58] hover:text-[#121314] hover:bg-[#FAF9F6]"
                }`}
              >
                <span>{ch.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            type="button"
            onClick={() => handleChapterClick(5)}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#121314] text-[#FFFFFF] hover:bg-[#A85B32] transition-colors duration-200 shadow-xs active:scale-95"
          >
            <span>Book Peter</span>
            <ArrowUpRight className="ml-1.5 w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#121314] hover:text-[#A85B32] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121314] rounded"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle book navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 top-[65px] bg-[#FAF9F6] z-50 lg:hidden flex flex-col justify-between p-6 sm:p-8 overflow-y-auto border-t border-[#E8E4DC]"
        >
          <div className="space-y-6 pt-2">
            <span className="font-mono text-xs text-[#A85B32] uppercase tracking-wider block font-semibold">
              Book Table of Contents
            </span>
            <div className="flex flex-col space-y-3">
              {chapters.map((ch) => (
                <button
                  key={ch.index}
                  type="button"
                  onClick={() => handleChapterClick(ch.index)}
                  className={`text-left py-3 px-4 rounded-xl border flex items-center justify-between font-serif text-xl transition-colors ${
                    currentPage === ch.index
                      ? "bg-[#121314] text-white border-[#121314]"
                      : "bg-white text-[#121314] border-[#E8E4DC] hover:border-[#A85B32]"
                  }`}
                >
                  <span>{ch.label}</span>
                  <span className="text-xs font-mono opacity-70">Ch. 0{ch.index}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-[#E8E4DC] space-y-3">
            <p className="font-sans text-xs text-[#5A5A58]">
              Ready to bring Peter to your stage?
            </p>
            <button
              type="button"
              onClick={() => handleChapterClick(5)}
              className="w-full py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#121314] text-white hover:bg-[#A85B32] transition-colors flex items-center justify-center space-x-2"
            >
              <span>Jump to Booking Details</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
