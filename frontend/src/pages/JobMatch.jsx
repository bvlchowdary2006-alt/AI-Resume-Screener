import React, { useState } from "react";
import {
  Briefcase,
  Target,
  UserCheck,
  Star,
  Sparkles,
  Filter,
  ChevronRight,
  Loader2,
  Search,
  Info,
} from "lucide-react";
import { jobService } from "../services/api";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";

const JobMatch = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    required_skills: "",
    min_experience_years: 2,
  });

  const handleMatch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const skills = jobData.required_skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s);
      const response = await jobService.match({
        ...jobData,
        required_skills: skills,
        min_experience_years: Number(jobData.min_experience_years),
      });
      setResults(response);
    } catch (err) {
      console.error("Matching failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold">Candidate Matching</h2>
        <p className="text-surface-400 max-w-2xl mx-auto">
          Input your job requirements and let our BERT-powered engine rank
          candidates based on semantic relevance and skills.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Job Requirements Form */}
        <div className="lg:col-span-4">
          <Card className="p-8 sticky top-24">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-brand-500/10 text-brand-500 rounded-lg">
                <Briefcase size={20} />
              </div>
              <h3 className="text-xl font-bold">Job Profile</h3>
            </div>

            <form onSubmit={handleMatch} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-surface-500 uppercase tracking-widest">
                  Job Title
                </label>
                <input
                  type="text"
                  className="w-full bg-surface-950 border border-surface-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all"
                  placeholder="e.g. Senior Product Designer"
                  value={jobData.title}
                  onChange={(e) =>
                    setJobData({ ...jobData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-surface-500 uppercase tracking-widest">
                  Job Description
                </label>
                <textarea
                  className="w-full bg-surface-950 border border-surface-800 rounded-xl p-4 text-white h-40 focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all resize-none"
                  placeholder="Describe the role and ideal candidate..."
                  value={jobData.description}
                  onChange={(e) =>
                    setJobData({ ...jobData, description: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-surface-500 uppercase tracking-widest">
                  Required Skills
                </label>
                <input
                  type="text"
                  className="w-full bg-surface-950 border border-surface-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all"
                  placeholder="Python, React, SQL..."
                  value={jobData.required_skills}
                  onChange={(e) =>
                    setJobData({ ...jobData, required_skills: e.target.value })
                  }
                  required
                />
                <p className="text-[10px] text-surface-600">
                  Separate skills with commas
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-surface-500 uppercase tracking-widest">
                  Min. Experience (Years)
                </label>
                <input
                  type="number"
                  className="w-full bg-surface-950 border border-surface-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all"
                  min="0"
                  value={jobData.min_experience_years}
                  onChange={(e) =>
                    setJobData({
                      ...jobData,
                      min_experience_years: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                isLoading={loading}
                className="w-full h-14 text-lg font-bold"
                icon={Sparkles}
              >
                Find Best Matches
              </Button>
            </form>
          </Card>
        </div>

        {/* Results Ranking */}
        <div className="lg:col-span-8">
          {results ? (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
              <div className="flex justify-between items-center bg-surface-900/50 p-4 rounded-2xl border border-surface-800 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center">
                    <Target size={20} />
                  </div>
                  <h3 className="text-xl font-bold">
                    Top {results.rankings.length} Candidates
                  </h3>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" icon={Filter}>
                    Filter
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {results.rankings.map((candidate, index) => (
                  <Card
                    key={candidate.candidate_id}
                    hover
                    className="p-0 overflow-hidden group"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Rank Indicator */}
                      <div className="w-full md:w-16 bg-surface-800 flex items-center justify-center font-black text-2xl text-surface-500 group-hover:bg-brand-600 group-hover:text-white transition-colors py-4 md:py-0">
                        {index + 1}
                      </div>

                      <div className="flex-1 p-6 space-y-6">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h4 className="text-2xl font-bold group-hover:text-brand-400 transition-colors">
                              {candidate.candidate_name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="brand">
                                {candidate.overall_score}% Match
                              </Badge>
                              <div className="flex items-center text-surface-500 text-xs gap-1 ml-2">
                                <Info size={12} />
                                {candidate.explanation.split(".")[0]}
                              </div>
                            </div>
                          </div>
                          <div className="text-right hidden sm:block">
                            <p className="text-3xl font-black text-white">
                              {candidate.overall_score}%
                            </p>
                            <p className="text-[10px] font-bold text-surface-500 uppercase tracking-widest">
                              AI Score
                            </p>
                          </div>
                        </div>

                        {/* Progress Bars Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold text-surface-500 uppercase tracking-widest">
                              <span>Skills Match</span>
                              <span>{candidate.skill_match_score}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-surface-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-brand-500 rounded-full"
                                style={{
                                  width: `${candidate.skill_match_score}%`,
                                }}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold text-surface-500 uppercase tracking-widest">
                              <span>Experience</span>
                              <span>{candidate.experience_score}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-surface-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-indigo-500 rounded-full"
                                style={{
                                  width: `${candidate.experience_score}%`,
                                }}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold text-surface-500 uppercase tracking-widest">
                              <span>BERT Semantic</span>
                              <span>
                                {candidate.semantic_similarity_score}%
                              </span>
                            </div>
                            <div className="h-1.5 w-full bg-surface-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-500 rounded-full"
                                style={{
                                  width: `${candidate.semantic_similarity_score}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-surface-900/80 p-4 flex md:flex-col justify-center gap-2 border-t md:border-t-0 md:border-l border-surface-800">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full"
                          icon={UserCheck}
                        >
                          Profile
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="w-full"
                          icon={ChevronRight}
                        >
                          Hire
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-20 bg-surface-900/10 border-2 border-dashed border-surface-800 rounded-3xl opacity-60">
              <div className="p-8 bg-surface-900 rounded-2xl mb-8 ring-1 ring-surface-800">
                <Search className="text-surface-700" size={64} />
              </div>
              <h4 className="text-2xl font-bold text-surface-400">
                Ready to Rank?
              </h4>
              <p className="text-surface-500 max-w-sm mt-4 leading-relaxed">
                Fill in the job profile on the left to start screening and
                ranking candidates in real-time.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobMatch;
