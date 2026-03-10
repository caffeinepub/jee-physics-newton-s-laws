interface FormulaBoxProps {
  formula: string;
  label: string;
  description?: string;
}

export default function FormulaBox({
  formula,
  label,
  description,
}: FormulaBoxProps) {
  return (
    <div className="relative glass rounded-xl p-5 border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-blue-600/5">
      <div className="absolute top-0 left-6 -translate-y-1/2 bg-[#070d1a] px-2">
        <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="text-center">
        <span className="text-3xl font-bold text-white tracking-wide font-mono">
          {formula}
        </span>
      </div>
      {description && (
        <p className="text-center text-sm text-white/50 mt-2">{description}</p>
      )}
    </div>
  );
}
