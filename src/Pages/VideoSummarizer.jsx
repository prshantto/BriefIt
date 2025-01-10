import { useState } from "react";
import { Header } from "../components/Header";
import { UrlForm } from "../components/UrlForm";
import { ErrorMessage } from "../components/ErrorMessage";
import { SummaryResult } from "../components/SummaryResult";
import { Features } from "../components/Features";
import { useNavigate } from "react-router-dom";

export function VideoSummarizer() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Placeholder for backend integration
    try {
      // This will be replaced with actual Nhost backend call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setResult({
        title: "Sample Video Title",
        summary: "This is where the AI-generated summary will appear...",
        duration: "10:30",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Header
          title="BriefIt"
          subtitle="Get concise summaries of YouTube videos in seconds"
        />

        <UrlForm
          url={url}
          setUrl={setUrl}
          loading={loading}
          onSubmit={handleSubmit}
        />

        <ErrorMessage message={error} />
        <SummaryResult result={result} />
        <Features />
      </div>
    </div>
  );
}
