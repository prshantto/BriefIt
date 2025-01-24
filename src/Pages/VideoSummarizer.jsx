import { useState } from "react";
import { Header } from "../components/Header";
import { UrlForm } from "../components/UrlForm";
import { ErrorMessage } from "../components/ErrorMessage";
import { SummaryResult } from "../components/SummaryResult";
import { Features } from "../components/Features";
import ProfileButton from "../components/ProfileButton";
import axios from "axios";
import { useAuthenticationStatus } from "@nhost/react";
import { useNavigate } from "react-router-dom";

export function VideoSummarizer() {
  const { isAuthenticated } = useAuthenticationStatus();
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/getvideo`, {
        url: url,
      });

      const transcriptresponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/gettranscript`,
        {
          url: url,
        }
      );

      const aiResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/airesponse`,
        {
          prompt: `Summarize the following video using transcript of the video and titele. 
          Make sure to Explain properly by breaking it in paragraphs or more points as much as possible 
          and keep this summary simple and easy to understand in minimum words. 
          Here is the transcript of video: ${transcriptresponse.data} and here is the title: ${res.data.title}`,
        }
      );
      setResult({
        title: res.data.title,
        summary: aiResponse.data.candidates[0].content.parts[0].text,
        duration: "Unknown",
        thumbnail: res.data.thumbnail,
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
      <ProfileButton />
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

        {!isAuthenticated && (
          <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ease-in-out">
            <div className="mb-4 flex flex-col items-center gap-4">
              <h1>You are not logged in, login to get the summary</h1>
              <button
                onClick={() => navigate("/auth")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px]"
              >
                login
              </button>
            </div>
          </div>
        )}

        <SummaryResult result={result} />
        <Features />
      </div>
    </div>
  );
}
