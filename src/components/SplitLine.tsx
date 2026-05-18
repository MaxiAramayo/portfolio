interface SplitLineProps {
  text: string;
  delay?: number;
  className?: string;
}

export default function SplitLine({ text, delay = 0, className = "" }: SplitLineProps) {
  return (
    <span className={`split ${className}`} aria-label={text}>
      {Array.from(text).map((c, i) => (
        <span
          key={i}
          className="char"
          style={{ animationDelay: `${delay + i * 22}ms` }}
        >
          {c === " " ? " " : c}
        </span>
      ))}
    </span>
  );
}
