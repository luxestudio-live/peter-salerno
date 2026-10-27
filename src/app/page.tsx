"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Book3DExperience } from "@/components/Book3DExperience";

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handleNavigatePage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  return (
    <div className="bg-[#FAF9F6] text-[#121314] min-h-screen selection:bg-[#A85B32] selection:text-[#FFFFFF] flex flex-col justify-between">
      <Header
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
        totalPages={6}
      />

      <main className="pt-20 sm:pt-24 flex-1 flex flex-col justify-center">
        <Book3DExperience
          initialPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>

      <Footer />
    </div>
  );
}
