type RoofDividerProps = {
  fill?: string;
  flip?: boolean;
  className?: string;
};

// The recurring "roofline" motif pulled from the Hospital@Ekhaya logo's
// house shape. Used between sections instead of a plain straight edge.
export default function RoofDivider({
  fill = "var(--bone-2)",
  flip = false,
  className = "",
}: RoofDividerProps) {
  return (
    <svg
      className={`block w-full h-10 sm:h-14 ${flip ? "rotate-180" : ""} ${className}`}
      viewBox="0 0 1200 60"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,60 L0,40 L200,0 L400,40 L600,10 L800,40 L1000,0 L1200,40 L1200,60 Z"
        fill={fill}
      />
    </svg>
  );
}
