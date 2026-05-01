import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Users,
  BarChart2,
  TrendingUp,
  UploadCloud,
  Sparkles,
  Plus,
  ArrowRight,
  Target,
  FileText,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const monthlyData = [
  { month: "Nov", count: 0 },
  { month: "Dec", count: 0 },
  { month: "Jan", count: 0 },
  { month: "Feb", count: 0 },
  { month: "Mar", count: 1 },
  { month: "Apr", count: 12 },
];

const topSkills = [
  { name: "React", count: 5 },
  { name: "Python", count: 5 },
  { name: "PostgreSQL", count: 3 },
  { name: "AWS", count: 3 },
  { name: "TypeScript", count: 2 },
  { name: "SQL", count: 2 },
];

const recentCandidates = [
  { initials: "AP", name: "Aisha Patel", role: "Senior Frontend Engineer", skills: ["React", "TypeScript", "Tailwind"], time: "just now" },
  { initials: "MC", name: "Marcus Chen", role: "Full Stack Developer", skills: ["Python", "React", "FastAPI"], time: "just now" },
  { initials: "PN", name: "Priya Natarajan", role: "ML Engineer", skills: ["Python", "PyTorch", "TensorFlow"], time: "2m ago" },
  { initials: "DO", name: "Daniel Okafor", role: "Backend Engineer", skills: ["Go", "Kubernetes", "PostgreSQL"], time: "1d ago" },
  { initials: "SR", name: "Sofia Ramos", role: "Product Designer", skills: ["Figma", "Prototyping", "Design Systems"], time: "2d ago" },
];

const statCards = [
  { label: "Total Resumes", value: "12", icon: Users, color: "bg-blue-50 text-blue-600" },
  { label: "Avg Candidate Score", value: "74", suffix: "/100", icon: BarChart2, color: "bg-green-50 text-green-600" },
  { label: "Hiring Success Rate", value: "72%", icon: TrendingUp, color: "bg-orange-50 text-orange-500" },
  { label: "Uploaded This Month", value: "12", icon: UploadCloud, color: "bg-blue-50 text-blue-600" },
];

const quickActions = [
  { icon: UploadCloud, title: "Upload resume", desc: "Add a new candidate", path: "/upload" },
  { icon: Target, title: "Run job match", desc: "Rank candidates for a role", path: "/jobs" },
  { icon: FileText, title: "Explore analytics", desc: "Hiring funnel & demand", path: "/analytics" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="animate-pulse space-y-8">
          <div className="h-20 bg-gray-200 rounded-xl" />
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 bg-gray-200 rounded-xl" />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-72 bg-gray-200 rounded-xl" />
            <div className="h-72 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Overview
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
            Welcome back, recruiter.
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Your hiring pipeline at a glance.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Sparkles className="w-4 h-4" />
            Seed sample data
          </button>
          <button
            onClick={() => navigate("/upload")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Resume
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl border border-gray-200 p-5"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color} mb-3`}>
              <card.icon className="w-5 h-5" />
            </div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              {card.label}
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {card.value}
              {card.suffix && (
                <span className="text-sm text-gray-400 font-normal">{card.suffix}</span>
              )}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-5 mb-8">
        {/* Monthly Uploads */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Monthly Uploads
              </p>
              <h3 className="text-base font-semibold text-gray-900 mt-1">
                Resume intake trend
              </h3>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg">
              <TrendingUp className="w-3 h-3" />
              6 months
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13 }}
                labelStyle={{ fontWeight: 600 }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#2563eb"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: "#2563eb" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Skills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Top Skills
          </p>
          <h3 className="text-base font-semibold text-gray-900 mt-1">
            In your cohort
          </h3>
          <div className="mt-5 space-y-4">
            {topSkills.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                  <span className="text-sm text-gray-400">{skill.count}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(skill.count / 5) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Recent Uploads */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Recent Uploads
              </p>
              <h3 className="text-base font-semibold text-gray-900 mt-1">
                Latest candidates
              </h3>
            </div>
            <button
              onClick={() => navigate("/upload")}
              className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1"
            >
              Add new
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {recentCandidates.map((c) => (
              <div key={c.initials} className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-500 flex-shrink-0">
                  {c.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.role}</p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 flex-wrap justify-end">
                  {c.skills.map((s) => (
                    <span key={s} className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-lg border border-gray-200">
                      {s}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">{c.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Quick Actions
          </p>
          <h3 className="text-base font-semibold text-gray-900 mt-1">
            Get things done
          </h3>
          <div className="mt-5 space-y-3">
            {quickActions.map((action) => (
              <button
                key={action.title}
                onClick={() => navigate(action.path)}
                className="w-full flex items-center gap-3 p-3.5 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-left group"
              >
                <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                  <action.icon className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{action.title}</p>
                  <p className="text-xs text-gray-400">{action.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
