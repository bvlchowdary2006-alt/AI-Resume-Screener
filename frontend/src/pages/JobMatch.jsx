import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Target, User, ChevronRight, Check, Loader2 } from "lucide-react";

const experienceLevels = [
  { label: "Junior (0-2 yrs)", value: "junior" },
  { label: "Mid (2-5 yrs)", value: "mid" },
  { label: "Senior (5-8 yrs)", value: "senior" },
  { label: "Lead (8+ yrs)", value: "lead" },
];

const sampleResults = [
  {
    name: "Aisha Patel",
    initials: "AP",
    role: "Senior Frontend Engineer",
    score: 94,
    skillMatch: 92,
    expMatch: 95,
    semanticMatch: 90,
    skills: ["React", "TypeScript", "Tailwind", "Node.js"],
  },
  {
    name: "Marcus Chen",
    initials: "MC",
    role: "Full Stack Developer",
    score: 87,
    skillMatch: 88,
    expMatch: 85,
    semanticMatch: 86,
    skills: ["React", "Python", "FastAPI", "PostgreSQL"],
  },
  {
    name: "Priya Natarajan",
    initials: "PN",
    role: "ML Engineer",
    score: 79,
    skillMatch: 75,
    expMatch: 82,
    semanticMatch: 78,
    skills: ["Python", "PyTorch", "TensorFlow", "AWS"],
  },
];

export default function JobMatch() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    experience: "",
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    if (!formData.title.trim()) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    setResults(sampleResults);
  };

  const handleReset = () => {
    setFormData({ title: "", description: "", skills: "", experience: "" });
    setResults(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Role Matching
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
          Rank candidates for any role
        </h1>
        <p className="text-sm text-gray-500 mt-2 max-w-2xl">
          Define the job, list required skills, and get an instant ranked shortlist with match rationale.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left - Job Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="space-y-4">
              {/* Job Title */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1.5 block">
                  Job title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Senior Frontend Engineer"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1.5 block">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="We're hiring a senior frontend engineer to..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Required Skills */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1.5 block">
                  Required skills{" "}
                  <span className="text-gray-400 font-normal">(comma separated)</span>
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, TypeScript, GraphQL"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Experience Level */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Experience level
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {experienceLevels.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setFormData({ ...formData, experience: level.value })}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                        formData.experience === level.value
                          ? "bg-blue-50 border-blue-300 text-blue-700"
                          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <button
                onClick={handleSearch}
                disabled={loading || !formData.title.trim()}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Finding candidates...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Find best candidates
                  </>
                )}
              </button>
              {results && (
                <button
                  onClick={handleReset}
                  className="w-full px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  New search
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right - Results */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {!results && !loading && (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-white rounded-xl border border-gray-200 p-12 text-center"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-5">
                  <Target className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Define a role to begin
                </h3>
                <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
                  Your ranked candidates will appear here with skill overlap, experience score and explainable match rationale.
                </p>
              </motion.div>
            )}

            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl border border-gray-200 p-12 text-center"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-5">
                  <Loader2 className="w-7 h-7 text-blue-600 animate-spin" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Analyzing candidates...
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Scoring skill match, experience fit, and semantic similarity.
                </p>
              </motion.div>
            )}

            {results && !loading && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {results.length} candidates matched
                  </h3>
                  <span className="text-xs text-gray-400">
                    Sorted by overall score
                  </span>
                </div>

                {results.map((candidate, i) => (
                  <motion.div
                    key={candidate.initials}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Rank */}
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                        {i + 1}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                            {candidate.initials}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {candidate.name}
                            </p>
                            <p className="text-xs text-gray-400">{candidate.role}</p>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {candidate.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 bg-gray-50 text-gray-600 text-xs font-medium rounded border border-gray-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Score */}
                      <div className="text-right flex-shrink-0">
                        <div className="text-2xl font-bold text-gray-900">
                          {candidate.score}
                        </div>
                        <div className="text-xs text-gray-400 mb-3">overall</div>
                        <div className="space-y-2">
                          {[
                            { label: "Skills", value: candidate.skillMatch },
                            { label: "Experience", value: candidate.expMatch },
                            { label: "Semantic", value: candidate.semanticMatch },
                          ].map((metric) => (
                            <div key={metric.label} className="flex items-center gap-2">
                              <span className="text-[10px] text-gray-400 w-16 text-right">
                                {metric.label}
                              </span>
                              <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-blue-600"
                                  style={{ width: `${metric.value}%` }}
                                />
                              </div>
                              <span className="text-[10px] text-gray-500 w-6">
                                {metric.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                        <User className="w-3 h-3" />
                        View Profile
                      </button>
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                        <Check className="w-3 h-3" />
                        Shortlist
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
