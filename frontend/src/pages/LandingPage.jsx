import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Zap,
  BarChart,
  Users,
  ArrowRight,
  CheckCircle,
  Brain,
  Globe,
  Lock,
} from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";

const LandingPage = () => {
  return (
    <div className="space-y-32 pb-20">
      {/* Hero Section */}
      <section className="text-center py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 space-y-10 max-w-5xl mx-auto px-4">
          <div className="flex justify-center">
            <Badge variant="brand" className="px-6 py-2 text-sm tracking-wide">
              v4.0: Now with BERT-based Semantic Analysis
            </Badge>
          </div>
          <h1 className="text-7xl font-black tracking-tight sm:text-8xl leading-[1.1] text-white">
            Hire smarter with <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-indigo-400">
              AI-driven screening.
            </span>
          </h1>
          <p className="text-2xl text-surface-400 max-w-3xl mx-auto leading-relaxed font-medium">
            The intelligent ATS that parses resumes, detects bias, and ranks
            candidates using deep learning. Built for modern recruiting teams.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <Link to="/upload" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto h-16 px-12 text-xl shadow-2xl shadow-brand-500/20"
              >
                Start Screening <ArrowRight className="ml-3" size={24} />
              </Button>
            </Link>
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto h-16 px-12 text-xl"
              >
                View Dashboard
              </Button>
            </Link>
          </div>
          <div className="pt-12 flex items-center justify-center gap-8 text-surface-500 text-sm font-bold uppercase tracking-widest">
            <span>Trusted by</span>
            <div className="h-px w-12 bg-surface-800" />
            <span className="text-surface-300">Leading Tech Teams</span>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        <Card
          hover
          className="p-10 space-y-6 bg-surface-900/40 border-surface-800/50"
        >
          <div className="w-16 h-16 bg-brand-500/10 rounded-2xl flex items-center justify-center text-brand-500">
            <Brain size={32} />
          </div>
          <h3 className="text-2xl font-bold text-white">Deep Parsing</h3>
          <p className="text-surface-400 text-lg leading-relaxed">
            Automatically extract skills, experience, and education from any PDF
            or DOCX with 99.2% accuracy.
          </p>
        </Card>
        <Card
          hover
          className="p-10 space-y-6 bg-surface-900/40 border-surface-800/50"
        >
          <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-2xl font-bold text-white">Bias Audit</h3>
          <p className="text-surface-400 text-lg leading-relaxed">
            Ensure fairness with automated detection of gendered language and
            institutional bias signals.
          </p>
        </Card>
        <Card
          hover
          className="p-10 space-y-6 bg-surface-900/40 border-surface-800/50"
        >
          <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
            <BarChart size={32} />
          </div>
          <h3 className="text-2xl font-bold text-white">Semantic Match</h3>
          <p className="text-surface-400 text-lg leading-relaxed">
            Go beyond keywords. Rank candidates based on true semantic relevance
            to your job description.
          </p>
        </Card>
      </section>

      {/* Trust Section */}
      <section className="bg-surface-900/20 border-y border-surface-900 py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 text-left">
            <h2 className="text-5xl font-black text-white leading-tight">
              Built for production <br /> at every scale.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Globe,
                  title: "Global Scale",
                  desc: "Process thousands of resumes daily.",
                },
                {
                  icon: Lock,
                  title: "Enterprise Security",
                  desc: "Your data is encrypted and secure.",
                },
                {
                  icon: Zap,
                  title: "Instant API",
                  desc: "Seamlessly integrate with your workflow.",
                },
                {
                  icon: Users,
                  title: "Team Collab",
                  desc: "Shared dashboards for hiring managers.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 bg-brand-500/10 rounded-lg flex items-center justify-center text-brand-500">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{item.title}</h4>
                    <p className="text-sm text-surface-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-brand-500/20 blur-3xl rounded-full opacity-30 animate-pulse" />
            <Card className="p-2 border-surface-700 bg-surface-950 shadow-2xl relative overflow-hidden">
              <div className="aspect-video bg-surface-900 rounded-xl flex items-center justify-center text-surface-700 font-bold italic">
                Dashboard Preview
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
