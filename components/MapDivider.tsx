export default function MapDivider() {
  return (
    <svg
      className="w-full h-12 fill-none stroke-light-gray"
      viewBox="0 0 1200 48"
      preserveAspectRatio="none"
    >
      {/* Subtle cadastral grid pattern */}
      <line x1="0" y1="24" x2="1200" y2="24" strokeWidth="0.5" opacity="0.3" />
      <circle cx="100" cy="24" r="2" fill="var(--color-light-gray)" opacity="0.5" />
      <circle cx="300" cy="24" r="2" fill="var(--color-light-gray)" opacity="0.5" />
      <circle cx="500" cy="24" r="2" fill="var(--color-light-gray)" opacity="0.5" />
      <circle cx="700" cy="24" r="2" fill="var(--color-light-gray)" opacity="0.5" />
      <circle cx="900" cy="24" r="2" fill="var(--color-light-gray)" opacity="0.5" />
      <circle cx="1100" cy="24" r="2" fill="var(--color-light-gray)" opacity="0.5" />
    </svg>
  );
}
