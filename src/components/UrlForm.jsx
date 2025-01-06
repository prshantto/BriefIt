import PropTypes from "prop-types";
import { Loader2 } from "lucide-react";

export function UrlForm({ url, setUrl, loading, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube URL here..."
          className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              Summarizing...
            </>
          ) : (
            "Summarize"
          )}
        </button>
      </div>
    </form>
  );
}

UrlForm.propTypes = {
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
