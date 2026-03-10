import { useState } from "react";
import ConceptCheck from "../ConceptCheck";
import FormulaBox from "../FormulaBox";
import { Button } from "../ui/button";

export default function ThirdLaw({ onComplete }: { onComplete: () => void }) {
  const [pushed, setPushed] = useState(false);

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8 pb-16">
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
          Chapter 3
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Newton's Third Law
        </h1>
        <p className="text-lg text-white/60">Action & Reaction</p>
      </div>

      <div className="glass rounded-2xl p-6 border border-white/10 space-y-4">
        <h2 className="text-xl font-semibold text-white">The Core Idea</h2>
        <p className="text-white/70 leading-relaxed">
          For every action force, there is an equal and opposite reaction force.
          These forces always act on{" "}
          <strong className="text-white">two different objects</strong> -- never
          on the same object.
        </p>
        <ul className="space-y-2 text-white/70 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">•</span> Forces always come in
            pairs
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">•</span> Action and reaction
            are equal in magnitude
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">•</span> They are opposite in
            direction
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">•</span> They act on different
            bodies (so they don't cancel!)
          </li>
        </ul>
      </div>

      <FormulaBox
        formula="F₁₂ = −F₂₁"
        label="Third Law"
        description="Force of object 1 on 2 equals negative of force of 2 on 1"
      />

      <div className="glass rounded-2xl p-6 border border-white/10 space-y-4">
        <h2 className="text-xl font-semibold text-white">
          Interactive: Action-Reaction Pair
        </h2>

        <svg
          width="100%"
          viewBox="0 0 380 100"
          className="bg-[#0a1628] rounded-xl"
          role="img"
          aria-label="Two blocks showing action and reaction forces"
        >
          <defs>
            <marker
              id="arr-red"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#ef4444" />
            </marker>
            <marker
              id="arr-blue"
              markerWidth="8"
              markerHeight="6"
              refX="0"
              refY="3"
              orient="auto"
            >
              <polygon points="8 0, 0 3, 8 6" fill="#3b82f6" />
            </marker>
          </defs>

          <rect
            x="30"
            y="30"
            width="60"
            height="40"
            rx="6"
            fill={pushed ? "#1d4ed8" : "#1e3a5f"}
            stroke={pushed ? "#3b82f6" : "#2d5a8e"}
            strokeWidth="2"
            style={{
              transition: "all 0.4s",
              transform: pushed ? "translateX(-10px)" : "translateX(0)",
            }}
          />
          <text
            x="60"
            y="55"
            fill="white"
            fontSize="12"
            textAnchor="middle"
            fontFamily="monospace"
          >
            A
          </text>

          <rect
            x="290"
            y="30"
            width="60"
            height="40"
            rx="6"
            fill={pushed ? "#991b1b" : "#3b1f1f"}
            stroke={pushed ? "#ef4444" : "#7f1d1d"}
            strokeWidth="2"
            style={{
              transition: "all 0.4s",
              transform: pushed ? "translateX(10px)" : "translateX(0)",
            }}
          />
          <text
            x="320"
            y="55"
            fill="white"
            fontSize="12"
            textAnchor="middle"
            fontFamily="monospace"
          >
            B
          </text>

          {pushed && (
            <>
              <line
                x1="95"
                y1="50"
                x2="285"
                y2="50"
                stroke="#ef4444"
                strokeWidth="2.5"
                markerEnd="url(#arr-red)"
              />
              <text
                x="190"
                y="40"
                fill="#ef4444"
                fontSize="9"
                textAnchor="middle"
                fontFamily="monospace"
              >
                Action →
              </text>
              <line
                x1="285"
                y1="62"
                x2="95"
                y2="62"
                stroke="#3b82f6"
                strokeWidth="2.5"
                markerEnd="url(#arr-blue)"
              />
              <text
                x="190"
                y="78"
                fill="#3b82f6"
                fontSize="9"
                textAnchor="middle"
                fontFamily="monospace"
              >
                ← Reaction
              </text>
            </>
          )}
          {!pushed && (
            <text
              x="190"
              y="55"
              fill="#ffffff30"
              fontSize="11"
              textAnchor="middle"
              fontFamily="monospace"
            >
              Press button to apply force
            </text>
          )}
        </svg>

        <Button
          type="button"
          data-ocid="third.law.push.button"
          onClick={() => setPushed(!pushed)}
          className={
            pushed
              ? "bg-red-600 hover:bg-red-500 text-white font-bold"
              : "bg-blue-600 hover:bg-blue-500 text-white font-bold"
          }
        >
          {pushed ? "Reset" : "Apply Force →"}
        </Button>
      </div>

      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-amber-500/20 space-y-2">
        <h3 className="text-lg font-semibold text-amber-300">
          🚀 Real World Examples
        </h3>
        <ul className="space-y-1 text-white/70 text-sm">
          <li>
            • Rocket propulsion: exhaust gases pushed backward → rocket pushed
            forward
          </li>
          <li>
            • Walking: foot pushes ground back → ground pushes foot forward
          </li>
          <li>• Swimming: hands push water back → water pushes body forward</li>
        </ul>
      </div>

      <ConceptCheck
        question="You push a wall with 30 N. The wall pushes back on you with:"
        options={[
          { label: "A", text: "0 N (wall doesn't move)" },
          { label: "B", text: "30 N" },
          { label: "C", text: "More than 30 N" },
          { label: "D", text: "Less than 30 N" },
        ]}
        correctAnswer="B"
        explanation="By Newton's 3rd law, the reaction force is equal and opposite: exactly 30 N back on you."
      />

      <Button
        type="button"
        data-ocid="third.law.complete.button"
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3"
        onClick={onComplete}
      >
        Mark Complete & Continue →
      </Button>
    </div>
  );
}
