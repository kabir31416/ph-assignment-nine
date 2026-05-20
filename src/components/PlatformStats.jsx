import { Lightbulb, Users, Handshake, TrendingUp } from "lucide-react";

export default function PlatformImpact() {
  const stats = [
    {
      icon: <Lightbulb size={32} />,
      number: "1,200+",
      label: "Ideas Shared",
      desc: "Innovative startup concepts submitted by creators worldwide.",
    },
    {
      icon: <Users size={32} />,
      number: "850+",
      label: "Innovators Joined",
      desc: "Entrepreneurs, developers, and thinkers building together.",
    },
    {
      icon: <Handshake size={32} />,
      number: "350+",
      label: "Collaborations Made",
      desc: "Successful partnerships formed through IdeaVault.",
    },
    {
      icon: <TrendingUp size={32} />,
      number: "95%",
      label: "Growth Rate",
      desc: "Rapid platform growth driven by community innovation.",
    },
  ];

  return (
    <section className="py-10 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-yellow-300/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-orange-300/20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-sm font-medium">
            Platform Impact
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold bg-linear-to-r from-yellow-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
            Growing Innovation Together
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our community is helping transform startup ideas into real-world
            opportunities through collaboration and shared creativity.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/30 dark:border-gray-700 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition duration-300"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-linear-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 flex items-center justify-center text-yellow-600 group-hover:scale-110 transition">
                {stat.icon}
              </div>

              {/* Number */}
              <h3 className="mt-6 text-4xl font-bold text-gray-800 dark:text-white">
                {stat.number}
              </h3>

              {/* Label */}
              <p className="mt-2 font-semibold text-yellow-600">
                {stat.label}
              </p>

              {/* Description */}
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}