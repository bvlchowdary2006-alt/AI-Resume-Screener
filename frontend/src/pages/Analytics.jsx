import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Activity,
  Target,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const uploadsData = [
  { month: "Nov", count: 0 },
  { month: "Dec", count: 0 },
  { month: "Jan", count: 0 },
  { month: "Feb", count: 0 },
  { month: "Mar", count: 2 },
  { month: "Apr", count: 12 },
];

const skillsData = [
  { name: "React", value: 5, color: "#2563eb" },
  { name: "Python", value: 5, color: "#22c55e" },
  { name: "PostgreSQL", value: 3, color: "#f97316" },
  { name: "AWS", value: 3, color: "#8b5cf6" },
  { name: "TypeScript", value: 2, color: "#ef4444" },
  { name: "SQL", value: 2, color: "#3b82f6" },
];

const qualityData = [
  { month: "Nov", score: 62 },
  { month: "Dec", score: 64 },
  { month: "Jan", score: 67 },
  { month: "Feb", score: 70 },
  { month: "Mar", score: 72 },
  { month: "Apr", score: 96 },
];

const funnelData = [
  { stage: "Applied", count: 12, pct: 100 },
  { stage: "Screened", count: 8, pct: 67 },
  { stage: "Interviewed", count: 4, pct: 33 },
  { stage: "Offered", count: 1, pct: 8 },
  { stage: "Hired", count: 0, pct: 0 },
];

const PIE_COLORS = ["#2563eb", "#22c55e", "#f97316", "#8b5cf6", "#ef4444", "#3b82f6"];

const chartIcons = {
  pipeline: BarChart3,
  demand: PieChart,
  quality: Activity,
  funnel: Users,
};

function ChartCard({ label, title, icon: Icon, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            {label}
          </p>
          <h3 className="text-base font-semibold text-gray-900 mt-1">{title}</h3>
        </div>
        <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-blue-600" />
        </div>
      </div>
      {children}
    </motion.div>
  );
}

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Insights
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
          Hiring analytics
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          A bird&rsquo;s eye view of your pipeline, skills demand and candidate quality.
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Pipeline - Bar Chart */}
        <ChartCard label="Pipeline" title="Resume uploads / month" icon={chartIcons.pipeline}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={uploadsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13 }}
              />
              <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Demand - Donut Chart */}
        <ChartCard label="Demand" title="Top skills distribution" icon={chartIcons.demand}>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={180} height={180}>
              <RechartsPie>
                <Pie
                  data={skillsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {skillsData.map((entry, i) => (
                    <Cell key={entry.name} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13 }}
                />
              </RechartsPie>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2.5">
              {skillsData.map((skill, i) => (
                <div key={skill.name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                  <span className="text-sm text-gray-600 flex-1">{skill.name}</span>
                  <span className="text-sm text-gray-400">{skill.value}</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* Quality - Line Chart */}
        <ChartCard label="Quality" title="Candidate quality trend" icon={chartIcons.quality}>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={qualityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13 }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#22c55e"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#22c55e", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Funnel */}
        <ChartCard label="Funnel" title="Hiring funnel" icon={chartIcons.funnel}>
          <div className="space-y-3">
            {funnelData.map((stage) => (
              <div key={stage.stage} className="flex items-center gap-4">
                <span className="text-sm text-gray-500 w-20 flex-shrink-0">{stage.stage}</span>
                <div className="flex-1 h-9 bg-gray-100 rounded-lg overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stage.pct}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full bg-blue-600 rounded-lg flex items-center px-3"
                  >
                    <span className="text-sm font-semibold text-white">{stage.count}</span>
                  </motion.div>
                </div>
                <span className="text-sm text-gray-400 w-10 text-right flex-shrink-0">
                  {stage.pct}%
                </span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Bias Detection Section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 bg-white rounded-xl border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              Fairness
            </p>
            <h3 className="text-base font-semibold text-gray-900 mt-1">
              Bias detection report
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-lg">
            <Target className="w-3.5 h-3.5" />
            92% Fair
          </span>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Gender Bias Flags</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">3</p>
            <p className="text-xs text-red-500 mt-1">detected in job descriptions</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-400 uppercase tracking-wider">University Bias</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">1</p>
            <p className="text-xs text-orange-500 mt-1">elite school preference</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Avg Fairness Score</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">92%</p>
            <p className="text-xs text-green-600 mt-1">above threshold</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
