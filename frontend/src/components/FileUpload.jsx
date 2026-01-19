import { useState, useCallback, useEffect } from "react";
import {
  Upload,
  FileSpreadsheet,
  X,
  Loader2,
  Database,
  TrendingUp,
  Brain,
  Sparkles,
} from "lucide-react";
import { Target, Info } from "lucide-react"; // Assuming Lucide is installed

//hiiii

export default function FileUpload({ onUpload, isUploading }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [targetColumn, setTargetColumn] = useState("");
  /* ================= SCROLL TO BOTTOM ================= */
  useEffect(() => {
    if (isUploading) {
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [isUploading]);

  /* ================= DRAG HANDLERS ================= */
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files?.[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        setSelectedFile(file);
      }
    }
  }, []);
  const handleUploadClick = async () => {
  if (!selectedFile || isUploading) return;
  
  // 1. Send both file and target column
  const success = await onUpload(selectedFile, targetColumn.trim());
  
  // 2. Only reset the UI if the backend accepted the input
  if (success) {
    setSelectedFile(null);
    setTargetColumn("");
  }
};



  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <section className="pb-24">
      {/* ================= HERO ================= */}
      <div className="max-w-7xl mx-auto px-6 pt-5 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
          <Sparkles className="h-4 w-4" />
          AI-Powered Dataset Analysis
        </div>

        <h1 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900">
          Transform Data into{" "}
          <span className="text-indigo-600">Intelligent Insights</span>
        </h1>

        <p className="mt-5 max-w-3xl mx-auto text-lg text-gray-600">
          Upload your CSV dataset and let AI automatically detect problem types,
          recommend the best ML models, and answer your questions.
        </p>

        {/* ================= FEATURES ================= */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={<Database className="h-6 w-6 text-indigo-600" />}
            title="Smart Analysis"
            text="Automatic problem type detection, data quality checks, and feature importance analysis."
            bg="bg-indigo-50"
          />
          <FeatureCard
            icon={<TrendingUp className="h-6 w-6 text-emerald-600" />}
            title="Model Selection"
            text="Get recommendations for the best ML models with expected metrics and implementation tips."
            bg="bg-emerald-50"
          />
          <FeatureCard
            icon={<Brain className="h-6 w-6 text-green-600" />}
            title="AI Chat"
            text="Ask questions about your data and get intelligent, context-aware answers instantly."
            bg="bg-green-50"
          />
        </div>
      </div>

      {/* ================= UPLOAD BOX ================= */}
      <div className="max-w-5xl mx-auto px-6 mt-16">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input")?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-14 text-center transition
            ${
              dragActive
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-300 bg-gray-50 hover:border-gray-400"
            }`}
        >
          <input
            id="file-input"
            type="file"
            accept=".csv"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="hidden"
          />
        
          {selectedFile ? (
            <div className="flex flex-col items-center gap-5">
              <div className="h-16 w-16 rounded-2xl bg-indigo-100 flex items-center justify-center">
                <FileSpreadsheet className="h-8 w-8 text-indigo-600" />
              </div>

              <div>
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                  }}
                  className="rounded-md border px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <X className="h-4 w-4 inline mr-1" />
                  Remove
                </button>

                <button
  onClick={(e) => {
    e.stopPropagation();
    handleUploadClick();
  }}
  disabled={isUploading || !selectedFile}
  className="
    group relative inline-flex items-center justify-center gap-2
    rounded-lg px-6 py-2.5 text-sm font-semibold
    text-white
    bg-gradient-to-r from-black to-gray-900
    shadow-md
    transition-all duration-200 ease-out

    hover:shadow-lg hover:scale-[1.02]
    active:scale-[0.98]

    focus:outline-none focus:ring-2 focus:ring-black/40

    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:scale-100 disabled:shadow-none
  "
>
  {/* Glow */}
  <span
    className="
      absolute inset-0 rounded-lg
      bg-gradient-to-r from-indigo-500/30 to-purple-500/30
      opacity-0 blur-md transition
      group-hover:opacity-100
      disabled:hidden
    "
  />

  {/* Content */}
  <span className="relative flex items-center gap-2">
    {isUploading ? (
      <>
        <Loader2 size={16} className="animate-spin" />
        Analyzing…
      </>
    ) : (
      <>
        <Upload size={16} />
        Analyze Dataset
      </>
    )}
  </span>
</button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center">
                <Upload className="h-10 w-10 text-indigo-600" />
              </div>

              <div>
                <p className="text-lg font-semibold">
                  Upload your CSV dataset
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Drag & drop your file here, or click to browse
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm text-gray-600">
                <FileSpreadsheet className="h-4 w-4" />
                CSV files up to 20MB
              </div>
            </div>
          )}
        </div>
<div className="mt-8 max-w-md mx-auto">
  {/* Label */}
  <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-gray-800">
    <Target size={16} className="text-indigo-600" />
    Target Column
  </label>

  {/* Input wrapper */}
  <div className="relative group">
    {/* Glow */}
    <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 blur transition group-focus-within:opacity-100" />

    <input
      type="text"
      placeholder="price, label, outcome…"
      value={targetColumn}
      onChange={(e) => setTargetColumn(e.target.value)}
      className="
        relative w-full rounded-lg border border-gray-300 bg-white
        px-4 py-3 text-sm text-gray-900
        shadow-sm outline-none
        transition-all duration-200
        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30
        placeholder:text-gray-400
      "
    />

    {/* Info icon */}
    <div className="absolute inset-y-0 right-3 flex items-center">
      <Info
        size={15}
        className="text-gray-400 hover:text-indigo-500 transition-colors cursor-help"
        title="Column used as output/label for training"
      />
    </div>
  </div>

  {/* Helper text */}
  <div className="mt-2 flex items-start gap-2 rounded-md bg-indigo-50 px-3 py-2 text-[12px] text-indigo-700">
    <span className="font-semibold">Tip</span>
    <span className="leading-snug">
      Auto-detection works best when your dataset has a clearly labeled output
      column (e.g., <code className="font-mono">label</code> or{" "}
      <code className="font-mono">target</code>).
    </span>
  </div>
</div>
      </div>
    </section>
  );
}

/* ================= FEATURE CARD ================= */
function FeatureCard({ icon, title, text, bg }) {
  return (
    <div className="rounded-2xl border bg-white p-8 text-center shadow-sm hover:shadow-md transition">
      <div
        className={`mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${bg}`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}