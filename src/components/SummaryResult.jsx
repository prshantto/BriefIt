import PropTypes from "prop-types";
import { useAuthenticationStatus } from "@nhost/react";
import { useNavigate } from "react-router-dom";

export function SummaryResult({ result }) {
  const { isAuthenticated } = useAuthenticationStatus();
  const navigate = useNavigate();
  if (!result) return null;

  return (
    <>
      {console.log(isAuthenticated)}
      {!isAuthenticated ? (
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
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ease-in-out">
          <div className="border-b border-gray-100 pb-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {result.title}
            </h2>
            <img
              className="w-full h-auto bg-gray-200 rounded-lg mt-4"
              src={result.thumbnail}
              alt="thumbnain"
            />
          </div>
          <p className="text-gray-500 text-sm">Duration: {result.duration}</p>
          <div className="prose max-w-none">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Summary</h3>
            <p className="text-gray-600 leading-relaxed">{result.summary}</p>
          </div>
        </div>
      )}
    </>
  );
}

SummaryResult.propTypes = {
  result: PropTypes.shape({
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }),
};
