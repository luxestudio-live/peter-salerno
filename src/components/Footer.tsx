"use client";

import React from "react";
import { ArrowUpRight, BookOpen, Mail, Phone } from "lucide-react";
import { SITE_METADATA } from "@/data/site-data";

export function Footer() {
  return (
    <footer className="bg-[#121314] text-[#FAF9F6] border-t border-[#3E3832] pt-16 pb-12">
      <div className="max-w-[1380px] mx-auto px-6 sm:px-8 space-y-12">
        {/* Top Colophon Quote */}
        <div className="pb-12 border-b border-[#3E3832]/60 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#A85B32] font-semibold block">
              The Salerno Epilogue
            </span>
            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FAF9F6] italic font-normal leading-snug">
              "The best version of yourself isn't found by standing still. A little laughter opens the door; courage walks through it."
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <div className="text-right">
              <span className="font-serif text-xl text-[#A85B32]">Peter Salerno</span>
              <span className="block font-mono text-xs text-[#E8E4DC]/50 mt-0.5">
                Author & Keynote Speaker
              </span>
            </div>
          </div>
        </div>

        {/* Directory & Booking Routes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs font-sans">
          <div className="space-y-3">
            <span className="font-mono uppercase tracking-wider text-[#A85B32] font-semibold block">
              Direct Representation
            </span>
            <p className="text-[#E8E4DC]/70 leading-relaxed">
              Available across Australia (Sydney, Melbourne, Brisbane, Perth, Adelaide) and internationally for corporate keynotes and summits.
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-mono uppercase tracking-wider text-[#A85B32] font-semibold block">
              Direct Inquiries
            </span>
            <div className="space-y-1.5 text-[#E8E4DC]/80">
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#A85B32]" />
                <a href={`mailto:${SITE_METADATA.email}`} className="hover:text-[#A85B32] transition-colors">
                  {SITE_METADATA.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#A85B32]" />
                <span>Australia & Worldwide</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <span className="font-mono uppercase tracking-wider text-[#A85B32] font-semibold block">
              Publications
            </span>
            <ul className="space-y-1 text-[#E8E4DC]/70">
              <li>The Man With The Magic Message (Hardcover)</li>
              <li>Happy Business Radio (Weekly Broadcast)</li>
              <li>Laughter Therapy Corporate Field Guide</li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-mono uppercase tracking-wider text-[#A85B32] font-semibold block">
              Speaker Credentials
            </span>
            <ul className="space-y-1 text-[#E8E4DC]/70">
              <li>Million Dollar Round Table (MDRT)</li>
              <li>Past President, Laughter Clubs Australasia</li>
              <li>40+ Years Stage & Sales Mentorship</li>
            </ul>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="pt-8 border-t border-[#3E3832]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#E8E4DC]/50">
          <div>
            <span>© 2026 Peter Salerno. All Rights Reserved. Australian Edition.</span>
          </div>
          <div className="flex items-center space-x-6">
            <span>Designed as an Interactive 3D Book Experience</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
