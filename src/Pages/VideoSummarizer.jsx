import { useState } from "react";
import { Header } from "../components/Header";
import { UrlForm } from "../components/UrlForm";
import { ErrorMessage } from "../components/ErrorMessage";
import { SummaryResult } from "../components/SummaryResult";
import { Features } from "../components/Features";
import ProfileButton from "../components/ProfileButton";
import axios from "axios";

export function VideoSummarizer() {
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
          prompt: `Summarize the following video using transcript of the video and titele. Explain properly by 
          breaking it in paragraphs or more points as much as possible and 
          keep this summary simple and easy to understand in minimum words. 
          Here is the transcript of video: ${transcriptresponse.data.transcript} and here is the title: ${res.data.title}`,
        }
      );
      setResult({
        title: res.data.title,
        summary: aiResponse.data.candidates[0].content.parts[0].text,
        duration: "Unknown",
        thumbnail: res.data.thumbnail,
      });
      console.log(aiResponse.data.candidates[0].content.parts[0].text);
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
        <SummaryResult result={result} />
        <Features />
      </div>
    </div>
  );
}
