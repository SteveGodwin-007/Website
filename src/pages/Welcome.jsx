import AnimatedSection from "@/components/AnimatedSection";

export default function Welcome() {
  return (
    <AnimatedSection>
      <div className="flex gap-6 items-center mb-8">
        <img src="/licet-logo.png" alt="LICET Logo" className="h-24 drop-shadow-[0_0_20px_rgba(0,255,0,0.7)]" />
        <img src="/strom-logo.png" alt="STROM Logo" className="h-24 drop-shadow-[0_0_20px_rgba(255,0,0,0.7)]" />
      </div>

      <h1 className="text-6xl font-bold text-pink-400 drop-shadow-[0_0_20px_rgba(255,0,85,0.9)]">
        Welcome <span className="text-green-400">to</span> <span className="text-red-500">STROM 2K25</span>
      </h1>

      <p className="mt-4 text-lg text-white/80 max-w-2xl text-center">
        Loyola-ICAM College of Engineering and Technology presents its flagship technical symposium —
        a celebration of innovation, teamwork, and technical excellence.
      </p>

      <button className="mt-8 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-400 transition-all duration-300 shadow-[0_0_15px_rgba(255,0,85,0.7)] hover:shadow-[0_0_25px_rgba(255,0,85,1)]">
        Explore Events
      </button>
    </AnimatedSection>
  );
}