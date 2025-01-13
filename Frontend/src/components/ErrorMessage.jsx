import PropTypes from "prop-types";

export function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
      {message}
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
};
