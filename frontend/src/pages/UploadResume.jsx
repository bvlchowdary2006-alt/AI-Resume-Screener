import React, { useState, useCallback } from "react";
import {
  Upload,
  CheckCircle,
  AlertCircle,
  Loader2,
  FileText,
  X,
} from "lucide-react";
import { resumeService } from "../services/api";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setResult(null);
    }
  };

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError(null);
      setResult(null);
    }
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const data = await resumeService.upload(file);
      setResult(data);
    } catch (err) {
      setError(
        err.response?.data?.detail || "Failed to upload and parse resume",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold">Resume Ingestion</h2>
        <p className="text-surface-400 max-w-2xl mx-auto">
          Upload candidate resumes in PDF or DOCX format. Our AI will
          automatically extract and structure the data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Upload Card */}
        <div className="lg:col-span-5">
          <Card className="p-8 space-y-6">
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 ${
                isDragging
                  ? "border-brand-500 bg-brand-500/5"
                  : "border-surface-700 hover:border-surface-600 bg-surface-950/30"
              }`}
            >
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept=".pdf,.docx"
                onChange={handleFileChange}
              />
              <div className="space-y-4">
                <div className="w-16 h-16 bg-surface-800 rounded-full flex items-center justify-center mx-auto text-surface-400 group-hover:text-brand-400 transition-colors">
                  <Upload size={32} />
                </div>
                <div>
                  <p className="text-lg font-bold">
                    {file ? file.name : "Drop resume here"}
                  </p>
                  <p className="text-sm text-surface-500 mt-1">
                    Supports PDF and DOCX (Max 10MB)
                  </p>
                </div>
              </div>
            </div>

            {file && (
              <div className="flex items-center justify-between p-4 bg-surface-800/50 rounded-xl border border-surface-700">
                <div className="flex items-center gap-3">
                  <FileText className="text-brand-500" size={24} />
                  <div className="text-left">
                    <p className="text-sm font-bold truncate max-w-[150px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-surface-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="text-surface-500 hover:text-red-400"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={!file || loading}
              isLoading={loading}
              className="w-full h-12 text-lg"
            >
              Process with AI
            </Button>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 animate-in shake duration-300">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
          </Card>
        </div>

        {/* Result Area */}
        <div className="lg:col-span-7">
          {result ? (
            <Card className="p-8 h-full animate-in fade-in zoom-in-95 duration-500">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-surface-800">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Analysis Complete</h3>
                    <p className="text-sm text-surface-500">
                      Candidate ID: {result.id.slice(0, 8)}
                    </p>
                  </div>
                </div>
                <Badge variant="success">Parsed Successfully</Badge>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-surface-500 uppercase tracking-widest mb-1">
                      Candidate Name
                    </h4>
                    <p className="text-xl font-bold text-white">
                      {result.parsed_data.name || "Unknown"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-surface-500 uppercase tracking-widest mb-1">
                      Experience
                    </h4>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold text-brand-500">
                        {result.parsed_data.total_experience_years}
                      </p>
                      <p className="text-surface-400 text-sm">Years total</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-surface-500 uppercase tracking-widest mb-1">
                      Contact
                    </h4>
                    <div className="space-y-1">
                      <p className="text-surface-300 text-sm">
                        {result.parsed_data.email || "N/A"}
                      </p>
                      <p className="text-surface-300 text-sm">
                        {result.parsed_data.phone || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-surface-500 uppercase tracking-widest mb-3">
                      Extracted Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.parsed_data.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="brand"
                          className="px-3 py-1 text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {result.parsed_data.skills.length === 0 && (
                        <p className="text-surface-500 text-sm italic">
                          No skills detected
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-20 bg-surface-900/20 border-2 border-dashed border-surface-800 rounded-3xl opacity-50">
              <div className="p-6 bg-surface-900 rounded-full mb-6">
                <FileText className="text-surface-700" size={48} />
              </div>
              <h4 className="text-xl font-medium text-surface-500">
                Awaiting Data
              </h4>
              <p className="text-surface-600 max-w-xs mt-2">
                Processed resume details will appear here once the analysis is
                complete.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
