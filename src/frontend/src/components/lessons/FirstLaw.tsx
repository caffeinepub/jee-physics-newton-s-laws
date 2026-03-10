import { useEffect, useRef, useState } from "react";
import ConceptCheck from "../ConceptCheck";
import FormulaBox from "../FormulaBox";
import { Button } from "../ui/button";

export default function FirstLaw({ onComplete }: { onComplete: () => void }) {
  const [animating, setAnimating] = useState(false);
  const ballRef = useRef<SVGCircleElement>(null);
  const ball2Ref = useRef<SVGCircleElement>(null);
  const [ball1X, setBall1X] = useState(40);
  const [ball2X, setBall2X] = useState(40);
  const animRef = useRef<number | undefined>(undefined);

  // suppress unused ref warnings - used for direct DOM access if needed
  void ballRef;
  void ball2Ref;

  const launch = () => {
    if (animating) return;
    setAnimating(true);
    setBall1X(40);
    setBall2X(40);
    let x1 = 40;
    let x2 = 40;
    const maxX = 340;
    const step = () => {
      x1 = Math.min(x1 + 2.5, maxX);
      x2 = Math.min(x2 + 2.5 * (1 - (x2 - 40) / 500), maxX * 0.55);
      setBall1X(x1);
      setBall2X(x2);
      if (x1 < maxX) {
        animRef.current = requestAnimationFrame(step);
      } else {
        setAnimating(false);
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
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            Chapter 1
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Newton's First Law
        </h1>
        <p className="text-lg text-white/60">The Law of Inertia</p>
      </div>

      <div className="glass rounded-2xl p-6 border border-white/10 space-y-4">
        <h2 className="text-xl font-semibold text-white">The Core Idea</h2>
        <p className="text-white/70 leading-relaxed">
          An object at rest stays at rest, and an object in motion stays in
          motion with the same speed and direction,
          <strong className="text-white">
            {" "}
            unless acted upon by an unbalanced external force.
          </strong>
        </p>
        <p className="text-white/70 leading-relaxed">
          This property of matter -- its tendency to resist changes in motion --
          is called <strong className="text-cyan-400">inertia</strong>. The
          greater the mass, the greater the inertia.
        </p>
      </div>

      <FormulaBox
        formula="ΣF = 0  ⟹  a = 0"
        label="First Law (Equilibrium)"
        description="If net force is zero, acceleration is zero. Velocity remains constant."
      />

      <div className="glass rounded-2xl p-6 border border-white/10 space-y-4">
        <h2 className="text-xl font-semibold text-white">
          Interactive: Friction vs No Friction
        </h2>
        <p className="text-sm text-white/50">
          Watch how a ball moves differently with and without friction
        </p>

        <svg
          width="100%"
          viewBox="0 0 380 140"
          className="bg-[#0a1628] rounded-xl"
          role="img"
          aria-label="Ball animation showing frictionless vs friction surface"
        >
          <defs>
            <radialGradient id="ballGrad1" cx="35%" cy="35%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#0891b2" />
            </radialGradient>
            <radialGradient id="ballGrad2" cx="35%" cy="35%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#c2410c" />
            </radialGradient>
          </defs>
          <text
            x="10"
            y="20"
            fill="#22d3ee"
            fontSize="10"
            fontFamily="monospace"
          >
            FRICTIONLESS SURFACE
          </text>
          <line
            x1="10"
            y1="55"
            x2="370"
            y2="55"
            stroke="#22d3ee"
            strokeWidth="2"
            strokeDasharray="6,3"
          />
          <circle
            ref={ballRef}
            cx={ball1X}
            cy="40"
            r="12"
            fill="url(#ballGrad1)"
          />
          <text
            x="10"
            y="85"
            fill="#f97316"
            fontSize="10"
            fontFamily="monospace"
          >
            WITH FRICTION
          </text>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(
            (i) => (
              <line
                key={`friction-line-${i}`}
                x1={10 + i * 20}
                y1="120"
                x2={20 + i * 20}
                y2="125"
                stroke="#f9731640"
                strokeWidth="1.5"
              />
            ),
          )}
          <line
            x1="10"
            y1="120"
            x2="370"
            y2="120"
            stroke="#f97316"
            strokeWidth="2"
          />
          <circle
            ref={ball2Ref}
            cx={ball2X}
            cy="105"
            r="12"
            fill="url(#ballGrad2)"
          />
        </svg>

        <Button
          type="button"
          data-ocid="first.law.launch.button"
          onClick={launch}
          disabled={animating}
          className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
        >
          {animating ? "Running..." : "Launch Both Balls →"}
        </Button>
        <p className="text-xs text-white/40">
          The blue ball (frictionless) keeps going. The orange ball slows down
          due to friction.
        </p>
      </div>

      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20 space-y-2">
        <h3 className="text-lg font-semibold text-purple-300">
          🚗 JEE Context: Seatbelts & Inertia
        </h3>
        <p className="text-white/70 text-sm leading-relaxed">
          When a car brakes suddenly, passengers lurch forward. This is Newton's
          1st law -- your body was in motion and tends to <em>stay</em> in
          motion. Seatbelts provide the external force needed to change your
          motion with the car.
        </p>
      </div>

      <ConceptCheck
        question="A 5 kg block is moving at 10 m/s on a frictionless surface. No forces act on it. What is its acceleration?"
        options={[
          { label: "A", text: "10 m/s²" },
          { label: "B", text: "5 m/s²" },
          { label: "C", text: "0 m/s²" },
          { label: "D", text: "50 m/s²" },
        ]}
        correctAnswer="C"
        explanation="Since no net force acts, by Newton's 1st law, acceleration = 0. The block moves at constant 10 m/s forever."
      />

      <ConceptCheck
        question="Newton's First Law is also called the Law of:"
        options={[
          { label: "A", text: "Gravitation" },
          { label: "B", text: "Inertia" },
          { label: "C", text: "Reaction" },
          { label: "D", text: "Conservation" },
        ]}
        correctAnswer="B"
        explanation="Newton's 1st law defines inertia -- the resistance of matter to changes in its state of motion."
      />

      <Button
        type="button"
        data-ocid="first.law.complete.button"
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3"
        onClick={onComplete}
      >
        Mark Complete & Continue →
      </Button>
    </div>
  );
}
