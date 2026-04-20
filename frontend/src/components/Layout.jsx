import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-surface-950 text-surface-50 font-sans selection:bg-brand-500/30">
      {/* Background blobs for premium feel */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-brand-900/20 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-900/20 blur-[120px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] rounded-full bg-brand-950/10 blur-[120px]" />
      </div>

      <Navbar />

      <main className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {children}
      </main>

      <footer className="relative mt-auto py-8 border-t border-surface-900 bg-surface-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-surface-500 text-sm">
            © 2026 AI Resume Screening System. Built for high-performance
            recruitment.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
