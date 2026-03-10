import { useEffect, useRef, useState } from "react";
import ConceptCheck from "../ConceptCheck";
import FormulaBox from "../FormulaBox";
import { Button } from "../ui/button";

export default function TensionLesson({
  onComplete,
}: { onComplete: () => void }) {
  const [atwood, setAtwood] = useState(false);
  const [m1, setM1] = useState(3);
  const [m2, setM2] = useState(5);
  const [running, setRunning] = useState(false);
  const [offset, setOffset] = useState(0);
  const animRef = useRef<number | undefined>(undefined);
  const g = 10;

  const aAccel = ((m2 - m1) * g) / (m1 + m2);
  const tension = (2 * m1 * m2 * g) / (m1 + m2);

  const runAtwood = () => {
    setRunning(true);
    setOffset(0);
    let off = 0;
    const step = () => {
      off = Math.min(off + 0.8, 40);
      setOffset(off);
      if (off < 40) {
        animRef.current = requestAnimationFrame(step);
      } else {
        setRunning(false);
      }
    };
    animRef.current = requestAnimationFrame(step);
  };

  useEffect(
    () => () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    },
    [],
  );

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8 pb-16">
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
          Chapter 5
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Tension Force
        </h1>
        <p className="text-lg text-white/60">Ropes, Strings & Pulleys</p>
      </div>

      <div className="glass rounded-2xl p-6 border border-white/10 space-y-4">
        <h2 className="text-xl font-semibold text-white">What is Tension?</h2>
        <p className="text-white/70 leading-relaxed">
          Tension is the pulling force transmitted through a rope, string, or
          cable when pulled taut by forces at either end. For an{" "}
          <strong className="text-white">ideal string</strong> (massless,
          inextensible), tension is the same throughout.
        </p>
        <ul className="space-y-2 text-white/70 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span> Always acts along the
            string, pulling away from object
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span> Massless rope: tension is
            same at all points
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span> For hanging mass: T = mg
            (at rest) or T = m(g+a) / m(g-a)
          </li>
        </ul>
      </div>

      <FormulaBox
        formula="T = m(g ± a)"
        label="Tension Formula"
        description="+ when accelerating upward, − when accelerating downward"
      />

      <div className="flex gap-3">
        <Button
          type="button"
          data-ocid="tension.scenario.hanging.button"
          variant={!atwood ? "default" : "outline"}
          onClick={() => {
            setAtwood(false);
            setOffset(0);
          }}
          className={
            !atwood
              ? "bg-purple-600 text-white"
              : "border-purple-500/50 text-purple-400"
          }
        >
          Hanging Mass
        </Button>
        <Button
          type="button"
          data-ocid="tension.scenario.atwood.button"
          variant={atwood ? "default" : "outline"}
          onClick={() => {
            setAtwood(true);
            setOffset(0);
          }}
          className={
            atwood
              ? "bg-purple-600 text-white"
              : "border-purple-500/50 text-purple-400"
          }
        >
          Atwood Machine
        </Button>
      </div>

      {!atwood ? (
        <div className="glass rounded-2xl p-6 border border-white/10 space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Single Hanging Mass
          </h2>
          <svg
            width="100%"
            viewBox="0 0 380 200"
            className="bg-[#0a1628] rounded-xl"
            role="img"
            aria-label="Hanging mass with tension and weight force arrows"
          >
            <defs>
              <marker
                id="arr-up-t"
                markerWidth="8"
                markerHeight="6"
                refX="8"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#a855f7" />
              </marker>
              <marker
                id="arr-down-t"
                markerWidth="8"
                markerHeight="6"
                refX="8"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#ef4444" />
              </marker>
            </defs>
            <rect x="140" y="0" width="100" height="12" rx="2" fill="#334155" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line
                key={`ceil-${i}`}
                x1={150 + i * 16}
                y1="0"
                x2={145 + i * 16}
                y2="12"
                stroke="#475569"
                strokeWidth="1.5"
              />
            ))}
            <line
              x1="190"
              y1="12"
              x2="190"
              y2="110"
              stroke="#94a3b8"
              strokeWidth="2.5"
            />
            <rect
              x="162"
              y="110"
              width="56"
              height="50"
              rx="6"
              fill="#4c1d95"
              stroke="#7c3aed"
              strokeWidth="2"
            />
            <text
              x="190"
              y="140"
              fill="white"
              fontSize="12"
              textAnchor="middle"
              fontFamily="monospace"
            >
              5 kg
            </text>
            <line
              x1="190"
              y1="108"
              x2="190"
              y2="60"
              stroke="#a855f7"
              strokeWidth="3"
              markerEnd="url(#arr-up-t)"
            />
            <text
              x="205"
              y="85"
              fill="#a855f7"
              fontSize="10"
              fontFamily="monospace"
            >
              T = 50N
            </text>
            <line
              x1="190"
              y1="162"
              x2="190"
              y2="190"
              stroke="#ef4444"
              strokeWidth="3"
              markerEnd="url(#arr-down-t)"
            />
            <text
              x="205"
              y="182"
              fill="#ef4444"
              fontSize="10"
              fontFamily="monospace"
            >
              W = mg
            </text>
          </svg>
          <p className="text-sm text-white/50">
            At rest: T = mg = 5 × 10 ={" "}
            <strong className="text-purple-400">50 N</strong>. The tension
            exactly balances gravity.
          </p>
        </div>
      ) : (
        <div className="glass rounded-2xl p-6 border border-white/10 space-y-4">
          <h2 className="text-xl font-semibold text-white">Atwood Machine</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-xs text-white/50">Mass 1 (m₁)</span>
              <div className="flex items-center gap-2">
                <input
                  id="m1-slider"
                  data-ocid="tension.m1.input"
                  type="range"
                  min="1"
                  max="10"
                  value={m1}
                  onChange={(e) => {
                    setM1(Number(e.target.value));
                    setOffset(0);
                  }}
                  className="flex-1 accent-purple-500"
                />
                <span className="text-purple-400 font-mono text-sm w-10">
                  {m1} kg
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-xs text-white/50">Mass 2 (m₂)</span>
              <div className="flex items-center gap-2">
                <input
                  id="m2-slider"
                  data-ocid="tension.m2.input"
                  type="range"
                  min="1"
                  max="10"
                  value={m2}
                  onChange={(e) => {
                    setM2(Number(e.target.value));
                    setOffset(0);
                  }}
                  className="flex-1 accent-orange-500"
                />
                <span className="text-orange-400 font-mono text-sm w-10">
                  {m2} kg
                </span>
              </div>
            </div>
          </div>

          <svg
            width="100%"
            viewBox="0 0 380 180"
            className="bg-[#0a1628] rounded-xl"
            role="img"
            aria-label="Atwood machine with two masses over a pulley"
          >
            <rect x="40" y="5" width="300" height="10" rx="2" fill="#334155" />
            <circle
              cx="190"
              cy="35"
              r="18"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="3"
            />
            <circle cx="190" cy="35" r="5" fill="#94a3b8" />
            <line
              x1="120"
              y1="10"
              x2="175"
              y2="25"
              stroke="#94a3b8"
              strokeWidth="2"
            />
            <line
              x1="260"
              y1="10"
              x2="205"
              y2="25"
              stroke="#94a3b8"
              strokeWidth="2"
            />
            <line
              x1="120"
              y1="35"
              x2="120"
              y2={90 - offset}
              stroke="#94a3b8"
              strokeWidth="2"
            />
            <line
              x1="260"
              y1="35"
              x2="260"
              y2={90 + offset}
              stroke="#94a3b8"
              strokeWidth="2"
            />
            <rect
              x="95"
              y={90 - offset}
              width="50"
              height="45"
              rx="4"
              fill="#1d4ed8"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <text
              x="120"
              y={115 - offset}
              fill="white"
              fontSize="11"
              textAnchor="middle"
              fontFamily="monospace"
            >
              {m1}kg
            </text>
            <rect
              x="235"
              y={90 + offset}
              width="50"
              height="45"
              rx="4"
              fill="#7c2d12"
              stroke="#ea580c"
              strokeWidth="2"
            />
            <text
              x="260"
              y={115 + offset}
              fill="white"
              fontSize="11"
              textAnchor="middle"
              fontFamily="monospace"
            >
              {m2}kg
            </text>
          </svg>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-xs text-white/50 mb-1">Acceleration</div>
              <div className="text-2xl font-bold text-cyan-400 font-mono">
                {Math.abs(aAccel).toFixed(2)}
              </div>
              <div className="text-xs text-white/40">m/s²</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-xs text-white/50 mb-1">Tension</div>
              <div className="text-2xl font-bold text-purple-400 font-mono">
                {tension.toFixed(1)}
              </div>
              <div className="text-xs text-white/40">N</div>
            </div>
          </div>

          <Button
            type="button"
            data-ocid="tension.atwood.run.button"
            onClick={runAtwood}
            disabled={running}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold"
          >
            {running ? "Running..." : "▶ Run Atwood Machine"}
          </Button>

          {m1 === m2 && (
            <div className="bg-emerald-500/10 rounded-lg p-3 text-sm text-emerald-300 border border-emerald-500/20">
              Equal masses → acceleration = 0, system in equilibrium!
            </div>
          )}
        </div>
      )}

      <ConceptCheck
        question="A 10 kg mass hangs from a rope (g = 10 m/s²). What is the tension in the rope (at rest)?"
        options={[
          { label: "A", text: "10 N" },
          { label: "B", text: "50 N" },
          { label: "C", text: "100 N" },
          { label: "D", text: "0 N" },
        ]}
        correctAnswer="C"
        explanation="T = mg = 10 × 10 = 100 N. At rest, tension equals the weight of the hanging mass."
      />

      <Button
        type="button"
        data-ocid="tension.complete.button"
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3"
        onClick={onComplete}
      >
        Mark Complete & Go to Quiz →
      </Button>
    </div>
  );
}
