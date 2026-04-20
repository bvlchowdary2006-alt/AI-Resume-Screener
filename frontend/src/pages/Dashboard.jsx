import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  FileText,
  CheckCircle,
  TrendingUp,
  AlertCircle,
  ShieldCheck,
  Users,
  Briefcase,
  Zap,
} from "lucide-react";
import { analyticsService } from "../services/api";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data = await analyticsService.getSummary();
        setAnalytics(data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setError("Failed to load analytics data. Ensure backend is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
        <p className="text-surface-500 font-medium animate-pulse">
          Aggregating system intelligence...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        <div className="p-4 bg-red-500/10 rounded-full text-red-500">
          <AlertCircle size={48} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Analytics Unavailable</h3>
          <p className="text-surface-500 max-w-md">{error}</p>
        </div>
        <Button onClick={() => window.location.reload()}>
          Retry Connection
        </Button>
      </div>
    );

  const skillData = analytics?.skill_distribution
    ? Object.entries(analytics.skill_distribution).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  const COLORS = ["#0e91e9", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef"];

  const stats = [
    {
      label: "Total Resumes",
      value: analytics?.total_resumes || 0,
      icon: FileText,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Avg Match Score",
      value: `${analytics?.avg_score || 0}%`,
      icon: Zap,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      label: "Fairness Index",
      value: `${analytics?.bias_insights?.avg_fairness_score || 100}%`,
      icon: ShieldCheck,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      label: "Active Pipeline",
      value: "Live",
      icon: TrendingUp,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">System Dashboard</h2>
          <p className="text-surface-500">
            Real-time overview of your recruitment intelligence.
          </p>
        </div>
        <div className="flex gap-3">
          <Badge variant="brand" className="px-4 py-2">
            System Status: Operational
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6 relative overflow-hidden group">
            <div
              className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} rounded-bl-full opacity-20 -mr-8 -mt-8 transition-transform group-hover:scale-110`}
            />
            <div className="flex items-start justify-between relative z-10">
              <div className="space-y-1">
                <p className="text-sm font-bold text-surface-500 uppercase tracking-widest">
                  {stat.label}
                </p>
                <p className="text-3xl font-black text-white">{stat.value}</p>
              </div>
              <div className={`p-3 ${stat.bg} ${stat.color} rounded-xl`}>
                <stat.icon size={24} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Skill Distribution Chart */}
        <div className="lg:col-span-8">
          <Card className="p-8 h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Users size={20} className="text-brand-500" />
                Skill Taxonomy Distribution
              </h3>
              <Badge variant="surface">Top 10 Skills</Badge>
            </div>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={skillData}
                  layout="vertical"
                  margin={{ left: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1e293b"
                    horizontal={false}
                  />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    width={100}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #1e293b",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                    {skillData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Bias Insights Card */}
        <div className="lg:col-span-4">
          <Card className="p-8 h-full space-y-8 bg-gradient-to-br from-surface-900 to-surface-950">
            <div className="space-y-2">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck size={20} className="text-emerald-500" />
                Fairness Audit
              </h3>
              <p className="text-sm text-surface-500">
                AI-driven bias detection summary.
              </p>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-surface-800/50 rounded-2xl border border-surface-700 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-surface-300">
                    Gender Bias Flag
                  </span>
                  <Badge
                    variant={
                      analytics?.bias_insights?.gender_bias_detected_count > 0
                        ? "warning"
                        : "success"
                    }
                  >
                    {analytics?.bias_insights?.gender_bias_detected_count || 0}{" "}
                    Flags
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-surface-300">
                    University Bias
                  </span>
                  <Badge
                    variant={
                      analytics?.bias_insights?.university_bias_detected_count >
                      0
                        ? "warning"
                        : "success"
                    }
                  >
                    {analytics?.bias_insights?.university_bias_detected_count ||
                      0}{" "}
                    Flags
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-surface-500 uppercase tracking-widest">
                  Fairness Score
                </h4>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-3 bg-surface-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-1000"
                      style={{
                        width: `${analytics?.bias_insights?.avg_fairness_score || 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-xl font-bold text-emerald-400">
                    {analytics?.bias_insights?.avg_fairness_score || 100}%
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  variant="secondary"
                  className="w-full"
                  icon={TrendingUp}
                >
                  Generate Full Audit
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
