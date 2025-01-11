import PropTypes from "prop-types";

export function SummaryResult({ result }) {
  if (!result) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ease-in-out">
      <div className="border-b border-gray-100 pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{result.title}</h2>
        <p className="text-gray-500 text-sm">Duration: {result.duration}</p>
      </div>
      <div className="prose max-w-none">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Summary</h3>
        <p className="text-gray-600 leading-relaxed">{result.summary}</p>
      </div>
    </div>
  );
}

SummaryResult.propTypes = {
  result: PropTypes.shape({
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
  }),
};
