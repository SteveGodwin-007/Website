// components/AnimatedSection.jsx
export default function AnimatedSection({ children, className }) {
  return (
    <section className={`relative overflow-hidden min-h-screen flex flex-col items-center justify-center px-4 ${className}`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900 via-purple-900 to-black animate-gradient" />

      {/* Floating shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="shape"></div>
        <div className="shape delay-2000"></div>
        <div className="shape delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}
