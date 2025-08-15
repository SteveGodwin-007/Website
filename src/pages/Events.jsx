import AnimatedSection from "@/components/AnimatedSection";

export default function Events() {
  return (
    <AnimatedSection>
      <h2 className="text-5xl font-bold text-center mb-12 text-pink-400 drop-shadow-[0_0_20px_rgba(255,0,85,0.9)]">
        Our Events
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Example Event Card */}
        <div className="p-6 bg-black/40 rounded-xl shadow-lg border border-pink-500/30 hover:scale-105 transition-transform">
          <h3 className="text-xl font-bold text-green-400 mb-2">Hackathon</h3>
          <p className="text-white/80">Showcase your coding skills and problem-solving abilities in our overnight hackathon.</p>
        </div>

        <div className="p-6 bg-black/40 rounded-xl shadow-lg border border-green-500/30 hover:scale-105 transition-transform">
          <h3 className="text-xl font-bold text-red-400 mb-2">Circuit Challenge</h3>
          <p className="text-white/80">Test your electronics and circuit design skills in this competitive event.</p>
        </div>

        <div className="p-6 bg-black/40 rounded-xl shadow-lg border border-purple-500/30 hover:scale-105 transition-transform">
          <h3 className="text-xl font-bold text-pink-400 mb-2">Quiz Mania</h3>
          <p className="text-white/80">Prove your technical knowledge in a fast-paced quiz contest.</p>
        </div>
      </div>
    </AnimatedSection>
  );
}