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
    console.log(url);

    // Placeholder for backend integration
    try {
      axios
        .post(
          `${import.meta.env.VITE_REQUEST_URL}?key=${
            import.meta.env.VITE_GEMINI_API_KEY
          }`,
          {
            contents: [
              {
                parts: [
                  {
                    text: `Get summary of video from youtube url ${url} with video titel and duration in object format`,
                  },
                ],
              },
            ],
          }
        )
        .then((response) => {
          const jsonData = response.data.candidates[0].content.parts[0].text;
          const cleanedData = jsonData.replace(/```/g, ""); // Parse JSON data
          console.log(cleanedData);
          console.log(response.data.candidates[0].content.parts[0].text.title);
          console.log(
            response.data.candidates[0].content.parts[0].text.summary
          );
          console.log(
            response.data.candidates[0].content.parts[0].text.duration
          );
          setResult({
            title:
              response.data.candidates[0].content.parts[0].text.title ||
              "undefined",
            summary: response.data.candidates[0].content.parts[0].text,
            duration:
              response.data.candidates[0].content.parts[0].text.duration ||
              "undefined",
          });
        })
        .catch((error) => {
          console.error(error);
          setError("Failed to generate summary. Please try again.");
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
        <SummaryResult result={result} />
        <Features />
      </div>
    </div>
  );
}
