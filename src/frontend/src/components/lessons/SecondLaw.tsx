import { useState } from "react";
import ConceptCheck from "../ConceptCheck";
import FormulaBox from "../FormulaBox";
import { Button } from "../ui/button";

export default function SecondLaw({ onComplete }: { onComplete: () => void }) {
  const [mass, setMass] = useState(5);
  const [force, setForce] = useState(20);
  const acceleration = (force / mass).toFixed(2);
  const blockX = Math.min(Number.parseFloat(acceleration) * 8, 220);

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8 pb-16">
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
          Chapter 2
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Newton's Second Law
        </h1>
        <p className="text-lg text-white/60">Force, Mass & Acceleration</p>
      </div>

      <div className="glass rounded-2xl p-6 border border-white/10 space-y-4">
        <h2 className="text-xl font-semibold text-white">The Core Idea</h2>
        <p className="text-white/70 leading-relaxed">
          The acceleration of an object is directly proportional to the net
          force acting on it and inversely proportional to its mass. The
          direction of acceleration is the same as the net force.
        </p>
      </div>

      <FormulaBox
        formula="F = m × a"
        label="Newton's Second Law"
        description="Force (N) = Mass (kg) × Acceleration (m/s²)"
      />

      <div className="glass rounded-2xl p-6 border border-white/10 space-y-5">
        <h2 className="text-xl font-semibold text-white">
          Interactive F=ma Simulator
        </h2>
        <p className="text-sm text-white/50">
          Adjust force and mass to see real-time acceleration change
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Applied Force</span>
              <span className="text-blue-400 font-bold font-mono">
                {force} N
              </span>
            </div>
            <input
              data-ocid="second.law.force.input"
              type="range"
              min="1"
              max="50"
              value={force}
              onChange={(e) => setForce(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Mass</span>
              <span className="text-orange-400 font-bold font-mono">
                {mass} kg
              </span>
            </div>
            <input
              data-ocid="second.law.mass.input"
              type="range"
              min="1"
              max="20"
              value={mass}
              onChange={(e) => setMass(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
          </div>
        </div>

        <svg
          width="100%"
          viewBox="0 0 380 90"
          className="bg-[#0a1628] rounded-xl"
          role="img"
          aria-label="Block being pushed with force arrow"
        >
          <defs>
            <linearGradient id="blockGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#22d3ee" />
            </marker>
          </defs>
          <line
            x1="10"
            y1="70"
            x2="370"
            y2="70"
            stroke="#334155"
            strokeWidth="2"
          />
          <rect
            x={20 + blockX}
            y="42"
            width="40"
            height="28"
            rx="4"
            fill="url(#blockGrad)"
          />
          <text
            x={40 + blockX}
            y="60"
            fill="white"
            fontSize="9"
            textAnchor="middle"
            fontFamily="monospace"
          >
            {mass}kg
          </text>
          <line
            x1={60 + blockX}
            y1="56"
            x2={60 + blockX + Math.min(force * 2.5, 90)}
            y2="56"
            stroke="#22d3ee"
            strokeWidth="2.5"
            markerEnd="url(#arrowhead)"
          />
          <text
            x={65 + blockX}
            y="48"
            fill="#22d3ee"
            fontSize="9"
            fontFamily="monospace"
          >
            {force}N
          </text>
        </svg>

        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-xl p-4 border border-cyan-500/20">
          <div className="flex items-center justify-between">
            <div className="text-white/60 text-sm">F = m × a</div>
            <div className="text-white/60 text-sm">
              {force} = {mass} ×{" "}
              <strong className="text-cyan-400">{acceleration}</strong>
            </div>
          </div>
          <div className="text-center mt-2">
            <span className="text-4xl font-bold text-cyan-400 font-mono">
              {acceleration}
            </span>
            <span className="text-white/50 ml-2">m/s²</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20 space-y-2">
        <h3 className="text-lg font-semibold text-green-300">
          📝 JEE Tip: Units Matter!
        </h3>
        <p className="text-white/70 text-sm leading-relaxed">
          In JEE problems, always check units. Force in Newtons (N = kg·m/s²),
          mass in kg, acceleration in m/s². 1 N is the force needed to
          accelerate 1 kg at 1 m/s².
        </p>
      </div>

      <ConceptCheck
        question="A 4 kg box accelerates at 3 m/s². What is the net force acting on it?"
        options={[
          { label: "A", text: "1.33 N" },
          { label: "B", text: "7 N" },
          { label: "C", text: "12 N" },
          { label: "D", text: "0.75 N" },
        ]}
        correctAnswer="C"
        explanation="F = ma = 4 × 3 = 12 N. Always multiply mass × acceleration to get force."
      />

      <ConceptCheck
        question="If the mass of an object doubles and the force remains the same, the acceleration:"
        options={[
          { label: "A", text: "Doubles" },
          { label: "B", text: "Halves" },
          { label: "C", text: "Stays the same" },
          { label: "D", text: "Quadruples" },
        ]}
        correctAnswer="B"
        explanation="a = F/m. If m doubles, a = F/(2m) = half the original acceleration. Inverse relationship!"
      />

      <Button
        type="button"
        data-ocid="second.law.complete.button"
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3"
        onClick={onComplete}
      >
        Mark Complete & Continue →
      </Button>
    </div>
  );
}
