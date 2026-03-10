import { useState } from "react";
import ConceptCheck from "../ConceptCheck";
import { Button } from "../ui/button";

interface ForceToggle {
  label: string;
  color: string;
  direction: string;
  enabled: boolean;
}

export default function FBDLesson({ onComplete }: { onComplete: () => void }) {
  const [forces, setForces] = useState<ForceToggle[]>([
    {
      label: "Weight (W=mg)",
      color: "#ef4444",
      direction: "down",
      enabled: true,
    },
    { label: "Normal (N)", color: "#22c55e", direction: "up", enabled: true },
    {
      label: "Friction (f)",
      color: "#f97316",
      direction: "left",
      enabled: false,
    },
    {
      label: "Applied (F)",
      color: "#3b82f6",
      direction: "right",
      enabled: false,
    },
  ]);

  const toggle = (i: number) => {
    setForces((f) =>
      f.map((item, idx) =>
        idx === i ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  const enabledForces = forces.filter((f) => f.enabled);

  const arrowCoords: Record<
    string,
    { x1: number; y1: number; x2: number; y2: number }
  > = {
    up: { x1: 190, y1: 55, x2: 190, y2: 10 },
    down: { x1: 190, y1: 85, x2: 190, y2: 130 },
    left: { x1: 155, y1: 70, x2: 110, y2: 70 },
    right: { x1: 225, y1: 70, x2: 270, y2: 70 },
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8 pb-16">
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
          Chapter 4
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Free Body Diagrams
        </h1>
        <p className="text-lg text-white/60">
          Visualizing All Forces on an Object
        </p>
      </div>

      <div className="glass rounded-2xl p-6 border border-white/10 space-y-4">
        <h2 className="text-xl font-semibold text-white">
          What is a Free Body Diagram?
        </h2>
        <p className="text-white/70 leading-relaxed">
          A Free Body Diagram (FBD) is a simplified diagram showing an isolated
          object and all forces acting on it. Each force is represented as an
          arrow pointing in the direction the force acts. FBDs are the{" "}
          <strong className="text-white">essential first step</strong> in
          solving any mechanics problem.
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            { color: "#ef4444", name: "Weight", desc: "mg, always downward" },
            {
              color: "#22c55e",
              name: "Normal",
              desc: "⊥ to surface, away from it",
            },
            {
              color: "#f97316",
              name: "Friction",
              desc: "Opposes motion/tendency",
            },
            {
              color: "#3b82f6",
              name: "Applied",
              desc: "External push or pull",
            },
          ].map((f) => (
            <div
              key={f.name}
              className="flex items-center gap-2 bg-white/5 rounded-lg p-2"
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ background: f.color }}
              />
              <div>
                <div className="font-semibold text-white text-xs">{f.name}</div>
                <div className="text-white/50 text-xs">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 border border-white/10 space-y-4">
        <h2 className="text-xl font-semibold text-white">
          Interactive Free Body Diagram
        </h2>
        <p className="text-sm text-white/50">
          Toggle forces on/off to build the diagram
        </p>

        <svg
          width="100%"
          viewBox="0 0 380 145"
          className="bg-[#0a1628] rounded-xl"
          role="img"
          aria-label="Interactive free body diagram showing forces on a box"
        >
          <rect x="0" y="140" width="380" height="5" fill="#1e293b" />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <line
              key={`surface-hatch-${i}`}
              x1={10 + i * 36}
              y1="140"
              x2={i * 36}
              y2="145"
              stroke="#334155"
              strokeWidth="1.5"
            />
          ))}
          <rect
            x="160"
            y="55"
            width="60"
            height="55"
            rx="4"
            fill="#1d4ed8"
            stroke="#3b82f6"
            strokeWidth="2"
          />
          <text
            x="190"
            y="87"
            fill="white"
            fontSize="11"
            textAnchor="middle"
            fontFamily="monospace"
          >
            BOX
          </text>

          {enabledForces.map((force) => {
            const coords = arrowCoords[force.direction];
            const markerId = `arr-fbd-${force.direction}`;
            return (
              <g key={force.label}>
                <defs>
                  <marker
                    id={markerId}
                    markerWidth="8"
                    markerHeight="6"
                    refX="8"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 8 3, 0 6" fill={force.color} />
                  </marker>
                </defs>
                <line
                  {...coords}
                  stroke={force.color}
                  strokeWidth="3"
                  markerEnd={`url(#${markerId})`}
                  style={{ transition: "all 0.3s" }}
                />
                <text
                  x={
                    (coords.x1 + coords.x2) / 2 +
                    (force.direction === "left"
                      ? -10
                      : force.direction === "right"
                        ? 10
                        : 15)
                  }
                  y={
                    (coords.y1 + coords.y2) / 2 +
                    (force.direction === "up"
                      ? -5
                      : force.direction === "down"
                        ? 12
                        : -5)
                  }
                  fill={force.color}
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {force.label.split(" ")[0]}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="grid grid-cols-2 gap-2">
          {forces.map((force, i) => (
            <button
              type="button"
              key={force.label}
              data-ocid={`fbd.force.toggle.${i + 1}`}
              onClick={() => toggle(i)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-all ${
                force.enabled
                  ? "border-white/20 text-white bg-white/10"
                  : "border-white/5 text-white/40 bg-transparent"
              }`}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: force.enabled ? force.color : "#374151" }}
              />
              {force.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl p-6 border border-emerald-500/20 space-y-2">
        <h3 className="text-lg font-semibold text-emerald-300">
          📐 JEE Strategy: Drawing FBDs
        </h3>
        <ol className="space-y-1 text-white/70 text-sm list-decimal list-inside">
          <li>Isolate the object of interest</li>
          <li>Draw it as a simple box or point</li>
          <li>Add ALL forces acting ON that object (not forces it exerts)</li>
          <li>Label each force with its symbol and direction</li>
          <li>Then apply ΣFₓ = maₓ and ΣFᵧ = maᵧ</li>
        </ol>
      </div>

      <ConceptCheck
        question="In a Free Body Diagram, Normal force always acts:"
        options={[
          { label: "A", text: "Downward" },
          { label: "B", text: "Horizontal" },
          { label: "C", text: "Perpendicular to the surface" },
          { label: "D", text: "Along the surface" },
        ]}
        correctAnswer="C"
        explanation="Normal force is always perpendicular (normal) to the contact surface, pushing away from it."
      />

      <Button
        type="button"
        data-ocid="fbd.complete.button"
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3"
        onClick={onComplete}
      >
        Mark Complete & Continue →
      </Button>
    </div>
  );
}
