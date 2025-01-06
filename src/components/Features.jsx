import { FileText, YoutubeIcon, Loader2 } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: FileText,
      title: "Concise Summaries",
      description: "Get the key points without watching the entire video",
    },
    {
      icon: YoutubeIcon,
      title: "Any YouTube Video",
      description: "Works with any public YouTube video URL",
    },
    {
      icon: Loader2,
      title: "Fast Processing",
      description: "Get your summary in seconds using AI",
    },
  ];

  return (
    <div className="mt-8 grid md:grid-cols-3 gap-8">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-indigo-600 mb-4">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
}
