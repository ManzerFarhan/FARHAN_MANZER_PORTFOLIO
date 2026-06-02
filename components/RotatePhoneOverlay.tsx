export default function RotatePhoneOverlay() {
  return (
    <div className="fixed inset-0 z-[10000] bg-[#050505] flex-col items-center justify-center text-white hidden max-md:portrait:flex">
      <div className="flex flex-col items-center gap-6 p-8 text-center">
        <svg
          className="w-16 h-16 animate-[pulse_2s_ease-in-out_infinite] transition-transform duration-1000 rotate-90"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        <h2 className="text-2xl font-black uppercase tracking-widest text-white/90">
          Rotate Your Phone
        </h2>
        <p className="text-white/60 text-sm max-w-xs">
          This portfolio is highly interactive and best experienced in landscape mode.
        </p>
      </div>
    </div>
  );
}
