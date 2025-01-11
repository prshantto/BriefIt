import { YoutubeIcon, FileText } from "lucide-react";
import PropTypes from "prop-types";

export function Header({ title, subtitle }) {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-2 mb-4">
        <YoutubeIcon className="h-8 w-8 text-red-500" />
        <FileText className="h-8 w-8 text-indigo-800" />
      </div>
      <h1 className="text-4xl italic font-bold text-indigo-600 mb-4">
        {title}
      </h1>
      <p className="text-gray-600 text-lg px-5 lg:px-0">{subtitle}</p>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};
