import { useState } from "react";

interface Option {
  label: string;
  text: string;
}
interface ConceptCheckProps {
  question: string;
  options: Option[];
  correctAnswer: string;
  explanation: string;
}

export default function ConceptCheck({
  question,
  options,
  correctAnswer,
  explanation,
}: ConceptCheckProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const isCorrect = selected === correctAnswer;

  return (
    <div className="glass rounded-xl p-5 border border-white/10 space-y-3">
      <div className="flex items-start gap-2">
        <span className="text-cyan-400 text-xs font-bold bg-cyan-500/10 rounded px-2 py-0.5 mt-0.5">
          QUICK CHECK
        </span>
        <p className="text-sm text-white/90">{question}</p>
      </div>
      <div className="space-y-2">
        {options.map((opt) => (
          <button
            type="button"
            key={opt.label}
            data-ocid={`concept.check.option.${opt.label.toLowerCase()}`}
            onClick={() => !selected && setSelected(opt.label)}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all border ${
              !selected
                ? "border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 text-white/70"
                : selected === opt.label
                  ? isCorrect
                    ? "border-green-500/60 bg-green-500/10 text-green-300"
                    : "border-red-500/60 bg-red-500/10 text-red-300"
                  : opt.label === correctAnswer
                    ? "border-green-500/40 bg-green-500/5 text-green-400/70"
                    : "border-white/5 text-white/30"
            }`}
          >
            <span className="font-bold mr-2">{opt.label}.</span>
            {opt.text}
          </button>
        ))}
      </div>
      {selected && (
        <div
          className={`rounded-lg p-3 text-sm ${
            isCorrect
              ? "bg-green-500/10 text-green-300 border border-green-500/20"
              : "bg-red-500/10 text-red-300 border border-red-500/20"
          }`}
        >
          <span className="font-bold">
            {isCorrect ? "✓ Correct! " : "✗ Incorrect. "}
          </span>
          {explanation}
        </div>
      )}
    </div>
  );
}
