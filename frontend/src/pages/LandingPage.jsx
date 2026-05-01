import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Target,
  Zap,
  BarChart3,
  Shield,
  FileText,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Rule-based Matching",
    desc: "Transparent skill + experience scoring. No black-box AI bias.",
  },
  {
    icon: Zap,
    title: "10x Faster Screening",
    desc: "Rank hundreds of resumes in seconds and surface top talent instantly.",
  },
  {
    icon: BarChart3,
    title: "Hiring Analytics",
    desc: "Funnel, skills demand and monthly uploads visualized beautifully.",
  },
  {
    icon: Shield,
    title: "Bias-aware Design",
    desc: "Your criteria, your weights. Every score is fully explainable.",
  },
  {
    icon: FileText,
    title: "Structured Intake",
    desc: "Clean resume records with skills, experience and education parsed automatically.",
  },
  {
    icon: Sparkles,
    title: "Built for Recruiters",
    desc: "Formal, keyboard-friendly workflows designed for hiring teams that move fast.",
  },
];

const trustLogos = ["Northwind", "Stellaris", "Acumen", "Lattice", "Veritas", "Orbital"];

const sampleCandidates = [
  { initials: "AP", name: "Aisha Patel", role: "Senior Frontend", score: 94, color: "bg-green-500" },
  { initials: "MC", name: "Marcus Chen", role: "Full Stack", score: 87, color: "bg-green-500" },
  { initials: "PN", name: "Priya N.", role: "ML Engineer", score: 79, color: "bg-blue-500" },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 to-gray-50 dark:from-gray-900 dark:to-gray-900" />
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-sm text-blue-700 mb-6 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300"
              >
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full dark:bg-blue-400" />
                New &middot; Transparent scoring engine v2
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight dark:text-white"
              >
                Resume Screener made{" "}
                <span className="text-blue-600">smarter</span>, not mysterious.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-6 text-lg text-gray-500 leading-relaxed max-w-xl dark:text-gray-400"
              >
                Score, rank and shortlist candidates with a fully transparent rule-based engine. Designed for hiring teams that move fast and hire fairly.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <button
                  onClick={() => navigate("/dashboard")}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Open Dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate("/jobs")}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Run a Job Match
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 flex flex-wrap gap-5 text-sm text-gray-500"
              >
                {["No AI vendor lock-in", "Fully explainable", "GDPR-ready"].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right - Live Screening Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/50 overflow-hidden">
                {/* Card Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Live Screening</p>
                    <p className="text-xs text-gray-400">COHORT &middot; TODAY</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-xs text-gray-500">Active</span>
                  </div>
                </div>

                {/* Candidates */}
                <div className="p-6 space-y-4">
                  {sampleCandidates.map((c) => (
                    <div key={c.initials} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                        {c.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{c.name}</p>
                        <p className="text-xs text-gray-400">{c.role}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.score}%` }} />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 w-8 text-right">{c.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl border border-gray-200 shadow-lg px-5 py-4"
              >
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Avg Match</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  81<span className="text-sm text-gray-400 font-normal"> / 100</span>
                </p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  12.4% vs last week
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Logos */}
      <section className="border-y border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">
            Trusted by fast-moving hiring teams
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {trustLogos.map((logo) => (
              <span key={logo} className="text-lg font-semibold text-gray-300 hover:text-gray-400 transition-colors cursor-default">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
            Why Resume Screener
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Everything you need to hire with{" "}
            <span className="text-blue-600">clarity</span>.
          </h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Purpose-built primitives for modern recruiters. Every feature is designed to make screening faster, fairer and more explainable.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                <f.icon className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl px-8 py-14 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Ready to screen smarter?
          </h2>
          <p className="mt-3 text-gray-500">
            Seed your first cohort in under a minute. Zero setup required.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate("/upload")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Upload First Resume
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/analytics")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              See analytics
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
