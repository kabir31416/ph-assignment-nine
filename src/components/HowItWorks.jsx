import { Lightbulb, MessageCircle, Rocket } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Lightbulb size={34} />,
      title: "Share Your Idea",
      desc: "Submit your startup concept and showcase your innovation to the community.",
    },
    {
      icon: <MessageCircle size={34} />,
      title: "Get Valuable Feedback",
      desc: "Receive insights, suggestions, and reactions from fellow innovators.",
    },
    {
      icon: <Rocket size={34} />,
      title: "Build & Launch",
      desc: "Connect with collaborators and transform your vision into reality.",
    },
  ];

  return (
    <section className="py-10 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-300/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-orange-300/20 blur-3xl rounded-full"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-sm font-medium">
            How It Works
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold bg-linear-to-r from-yellow-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
            Turn Ideas Into Reality
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            IdeaVault helps innovators move from inspiration to execution
            through collaboration and community support.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-1/2 -translate-x-1/2 w-[70%] h-0.5 bg-linear-to-r from-yellow-300 to-orange-300"></div>

          {steps.map((step, i) => (
            <div
              key={i}
              className="relative group bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/30 dark:border-gray-700 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition duration-300"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-6 w-9 h-9 rounded-full bg-linear-to-r from-yellow-500 to-orange-500 text-white flex items-center justify-center font-bold shadow-md">
                {i + 1}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-linear-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 flex items-center justify-center text-yellow-600 group-hover:scale-110 transition">
                {step.icon}
              </div>

              {/* Text */}
              <h3 className="mt-6 text-xl font-semibold text-gray-800 dark:text-white">
                {step.title}
              </h3>

              <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}