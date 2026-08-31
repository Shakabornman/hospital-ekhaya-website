export default function LogoMark({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 4 L44 20 L44 44 L4 44 L4 20 Z" fill="var(--bone)" opacity="0.12" />
      <path d="M24 4 L44 20 L4 20 Z" fill="var(--sage)" />
      <rect x="20" y="24" width="8" height="20" fill="var(--maroon)" />
      <rect x="12" y="30" width="6" height="14" fill="var(--maroon)" opacity="0.6" />
      <rect x="30" y="30" width="6" height="14" fill="var(--maroon)" opacity="0.6" />
    </svg>
  );
}
