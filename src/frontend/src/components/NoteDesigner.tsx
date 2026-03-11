import { useEffect, useRef, useState } from "react";

interface TopicNotes {
  title: string;
  jeeRelevance: "High" | "Medium" | "Very High";
  definition: string;
  concepts: { icon: string; title: string; explanation: string }[];
  formulas: { name: string; formula: string; variables: string[] }[];
  derivation: { step: number; title: string; content: string }[];
  jeeProblem: { question: string; solution: string[] };
  memoryTricks: string[];
  summary: string[];
}

const knowledgeBase: Record<string, TopicNotes> = {
  "newton's laws": {
    title: "Newton's Laws of Motion",
    jeeRelevance: "Very High",
    definition:
      "Newton's three laws form the foundation of classical mechanics — governing how objects move, rest, and interact through forces.",
    concepts: [
      {
        icon: "⚡",
        title: "Law of Inertia",
        explanation:
          "An object remains at rest or in uniform motion unless acted upon by a net external force. Inertia is the property of resistance to change in motion.",
      },
      {
        icon: "🎯",
        title: "F = ma",
        explanation:
          "The net force acting on a body equals its mass multiplied by its acceleration. Direction of acceleration = direction of net force.",
      },
      {
        icon: "↔️",
        title: "Action-Reaction Pairs",
        explanation:
          "Every action has an equal and opposite reaction. Forces always appear in pairs but act on DIFFERENT objects.",
      },
      {
        icon: "⚖️",
        title: "Pseudo Force",
        explanation:
          "In a non-inertial (accelerating) reference frame, a fictitious pseudo force = -ma is introduced to apply Newton's laws.",
      },
    ],
    formulas: [
      {
        name: "Second Law",
        formula: "F = ma",
        variables: [
          "F = Net force (N)",
          "m = Mass (kg)",
          "a = Acceleration (m/s²)",
        ],
      },
      {
        name: "Impulse-Momentum",
        formula: "J = F·Δt = Δp = m·Δv",
        variables: [
          "J = Impulse (N·s)",
          "Δp = Change in momentum",
          "Δt = Time interval",
        ],
      },
      {
        name: "Friction Force",
        formula: "f = μN",
        variables: [
          "f = Friction force",
          "μ = Coefficient of friction",
          "N = Normal force",
        ],
      },
    ],
    derivation: [
      {
        step: 1,
        title: "Define the System",
        content:
          "Identify all objects and draw a free body diagram showing every force acting on each object.",
      },
      {
        step: 2,
        title: "Choose Coordinate Axes",
        content:
          "Pick x-y axes aligned with motion. Resolve all forces into components along these axes.",
      },
      {
        step: 3,
        title: "Apply F_net = ma",
        content:
          "Sum all force components: ΣFx = max, ΣFy = may. Set acceleration = 0 for equilibrium.",
      },
      {
        step: 4,
        title: "Solve Equations",
        content:
          "Solve the resulting system of equations for unknown forces or accelerations. Check units!",
      },
    ],
    jeeProblem: {
      question:
        "A block of mass 5 kg on a smooth surface is connected via string over a frictionless pulley to a hanging mass of 3 kg. Find the acceleration of the system.",
      solution: [
        "Step 1: Net force = weight of hanging mass = 3 × 10 = 30 N",
        "Step 2: Total mass in system = 5 + 3 = 8 kg",
        "Step 3: a = F_net / m_total = 30 / 8 = 3.75 m/s²",
        "Step 4: Tension T = m1 × a = 5 × 3.75 = 18.75 N",
        "Answer: a = 3.75 m/s², T = 18.75 N",
      ],
    },
    memoryTricks: [
      "'NFL' — Newton First Law: Nothing moves without Force; Second: F=ma (Football = Mass × Acceleration); Third: Lockdown (equal-opposite)",
      "Inertia: think of a sleeping person — they resist getting up (changing state)",
      "Action-Reaction: Always on DIFFERENT bodies — never cancel each other!",
    ],
    summary: [
      "1st Law: No net force → no change in motion",
      "2nd Law: F = ma — force causes acceleration proportional to mass",
      "3rd Law: Forces always come in equal-opposite pairs on different bodies",
      "Pseudo force in non-inertial frames = -ma (away from acceleration direction)",
      "Always draw FBD before applying Newton's laws",
    ],
  },
  "circular motion": {
    title: "Circular Motion",
    jeeRelevance: "Very High",
    definition:
      "Motion of an object along a circular path. Even at constant speed, velocity changes direction → centripetal acceleration always directed toward the center.",
    concepts: [
      {
        icon: "🔄",
        title: "Centripetal Acceleration",
        explanation:
          "Always directed toward the center. a_c = v²/r = ω²r. This is NOT a force — it's the acceleration produced by the net inward force.",
      },
      {
        icon: "🌀",
        title: "Angular Quantities",
        explanation:
          "ω = angular velocity (rad/s), α = angular acceleration (rad/s²). Linear-angular relations: v = ωr, a_t = αr.",
      },
      {
        icon: "🎡",
        title: "Vertical Circular Motion",
        explanation:
          "Speed varies with height. At top: min speed = √(gr). At bottom: N - mg = mv²/r. Energy conservation links top and bottom speeds.",
      },
      {
        icon: "🛣️",
        title: "Banking of Roads",
        explanation:
          "Banked roads provide centripetal force without friction. Optimal angle: tan θ = v²/rg.",
      },
    ],
    formulas: [
      {
        name: "Centripetal Force",
        formula: "F_c = mv²/r = mω²r",
        variables: [
          "m = mass",
          "v = speed",
          "r = radius",
          "ω = angular velocity",
        ],
      },
      {
        name: "Time Period",
        formula: "T = 2πr/v = 2π/ω",
        variables: ["T = Time for one revolution", "r = radius", "v = speed"],
      },
      {
        name: "Banking Angle",
        formula: "tan θ = v²/rg",
        variables: [
          "θ = banking angle",
          "v = vehicle speed",
          "r = radius of curve",
          "g = 10 m/s²",
        ],
      },
    ],
    derivation: [
      {
        step: 1,
        title: "Position Vector",
        content:
          "r(t) = r(cos ωt î + sin ωt ĵ) — object traces a circle of radius r.",
      },
      {
        step: 2,
        title: "Velocity",
        content:
          "v = dr/dt = rω(-sin ωt î + cos ωt ĵ) — always perpendicular to r (tangential).",
      },
      {
        step: 3,
        title: "Acceleration",
        content:
          "a = dv/dt = -rω²(cos ωt î + sin ωt ĵ) = -ω²r — directed inward (centripetal).",
      },
      {
        step: 4,
        title: "Magnitude",
        content:
          "|a_c| = ω²r = v²/r. Net inward force required = mv²/r (centripetal force).",
      },
    ],
    jeeProblem: {
      question:
        "A car of mass 1000 kg moves on a circular track of radius 50 m at 20 m/s on a banked road (θ = 30°, μ = 0.3). Find the normal force.",
      solution: [
        "Ideal banking speed: v₀ = √(rg tan θ) = √(50×10×tan30°) = √(288.7) ≈ 17 m/s",
        "Since v > v₀, friction acts inward (down the bank)",
        "N(sin θ + μcos θ) = mv²/r",
        "N = mv²/[r(sin θ + μcos θ)] = 1000×400/[50(0.5 + 0.3×0.866)]",
        "N = 400000/[50×0.76] = 400000/38 ≈ 10526 N",
      ],
    },
    memoryTricks: [
      "'CIVIC' — Centripetal Is Velocity In Curve",
      "At the top of vertical circle: gravity + Normal provide centripetal (both inward at top)",
      "Centrifugal force is FAKE (pseudo force in rotating frame) — in ground frame, only centripetal exists",
    ],
    summary: [
      "Centripetal acceleration = v²/r directed toward center",
      "Net inward force = mv²/r (not a separate force — it's the resultant)",
      "Vertical circle: min speed at top = √(gR), max tension at bottom",
      "Banking: tan θ = v²/rg for ideal (no friction) condition",
      "ω = 2π/T, v = ωr — always relate angular and linear quantities",
    ],
  },
  "projectile motion": {
    title: "Projectile Motion",
    jeeRelevance: "Very High",
    definition:
      "Motion under gravity alone after initial launch. Horizontal motion is uniform (no force); vertical motion has constant downward acceleration g.",
    concepts: [
      {
        icon: "🚀",
        title: "Independence of Motion",
        explanation:
          "Horizontal: constant velocity (no air resistance). Vertical: free fall with g = 10 m/s². Treat them completely separately.",
      },
      {
        icon: "📐",
        title: "Range & Angle",
        explanation:
          "Maximum range at θ = 45°. Range is symmetric: θ and (90°-θ) give the same range. R = u²sin2θ/g.",
      },
      {
        icon: "⬆️",
        title: "At Maximum Height",
        explanation:
          "Vertical velocity = 0. Horizontal velocity = u cosθ (unchanged). Speed is minimum at peak.",
      },
      {
        icon: "🎯",
        title: "Equation of Trajectory",
        explanation:
          "Parabolic path: y = x tanθ - gx²/(2u²cos²θ). Substituting gives the parabola equation.",
      },
    ],
    formulas: [
      {
        name: "Range",
        formula: "R = u²sin(2θ)/g",
        variables: ["u = initial speed", "θ = launch angle", "g = 10 m/s²"],
      },
      {
        name: "Max Height",
        formula: "H = u²sin²θ/(2g)",
        variables: ["u = initial speed", "θ = launch angle"],
      },
      {
        name: "Time of Flight",
        formula: "T = 2u sinθ/g",
        variables: ["T = total air time", "u sinθ = vertical component"],
      },
    ],
    derivation: [
      {
        step: 1,
        title: "Decompose Velocity",
        content:
          "ux = u cosθ (horizontal, constant), uy = u sinθ (vertical, decreasing at rate g).",
      },
      {
        step: 2,
        title: "Position Equations",
        content: "x = u cosθ · t, y = u sinθ · t - ½gt².",
      },
      {
        step: 3,
        title: "Eliminate Time",
        content:
          "t = x/(u cosθ). Substitute into y equation → parabola y = x tanθ - gx²/(2u²cos²θ).",
      },
      {
        step: 4,
        title: "Find R and H",
        content:
          "At landing y=0: R = u²sin2θ/g. At peak vy=0: H = u²sin²θ/(2g).",
      },
    ],
    jeeProblem: {
      question:
        "A ball is projected at 30 m/s at 60° to horizontal. Find: (a) max height, (b) range, (c) speed at highest point.",
      solution: [
        "ux = 30cos60° = 15 m/s, uy = 30sin60° = 15√3 m/s",
        "(a) H = uy²/(2g) = (15√3)²/20 = 675/20 = 33.75 m",
        "(b) R = u²sin120°/g = 900×(√3/2)/10 = 77.9 m",
        "(c) At highest point: only horizontal velocity remains = 15 m/s",
      ],
    },
    memoryTricks: [
      "'HURT' — Horizontal Uniform, Recall Trajectory is parabola",
      "At max height: vy = 0, vx = u cosθ — horizontal speed NEVER changes",
      "R is same for θ and (90°-θ): 30° and 60° give identical ranges!",
    ],
    summary: [
      "Horizontal: uniform motion, x = u cosθ · t",
      "Vertical: uniformly decelerated, vy = uy - gt",
      "Max range at 45°, max height at 90°",
      "Trajectory is a parabola",
      "Time of flight T = 2u sinθ/g",
    ],
  },
  "work energy theorem": {
    title: "Work-Energy Theorem",
    jeeRelevance: "Very High",
    definition:
      "The net work done by all forces on an object equals the change in its kinetic energy. W_net = ΔKE. This bridges force/displacement with energy.",
    concepts: [
      {
        icon: "⚡",
        title: "Work Done",
        explanation:
          "W = F·d·cosθ where θ is angle between force and displacement. Work is a scalar. Perpendicular force does zero work.",
      },
      {
        icon: "🔋",
        title: "Kinetic Energy",
        explanation:
          "KE = ½mv². Always positive. Depends on speed, not velocity direction. Work-energy theorem: W = ΔKE = ½mv² - ½mu².",
      },
      {
        icon: "⛰️",
        title: "Potential Energy",
        explanation:
          "Stored energy due to position. Gravitational PE = mgh (taking ground as reference). Spring PE = ½kx².",
      },
      {
        icon: "🔄",
        title: "Conservation of Energy",
        explanation:
          "In absence of non-conservative forces: KE + PE = constant. With friction: W_friction = -ΔE_mechanical.",
      },
    ],
    formulas: [
      {
        name: "Work Done",
        formula: "W = F·d·cosθ",
        variables: [
          "F = force magnitude",
          "d = displacement",
          "θ = angle between F and d",
        ],
      },
      {
        name: "Work-Energy Theorem",
        formula: "W_net = ΔKE = ½mv² - ½mu²",
        variables: [
          "W_net = total work done",
          "m = mass",
          "v = final speed",
          "u = initial speed",
        ],
      },
      {
        name: "Power",
        formula: "P = W/t = F·v",
        variables: [
          "P = power (Watts)",
          "W = work done",
          "t = time",
          "v = instantaneous velocity",
        ],
      },
    ],
    derivation: [
      {
        step: 1,
        title: "Start with F = ma",
        content: "Newton's 2nd law: F_net = ma",
      },
      {
        step: 2,
        title: "Use kinematics",
        content: "v² = u² + 2as → as = (v²-u²)/2",
      },
      {
        step: 3,
        title: "Multiply by m",
        content: "mas = m(v²-u²)/2 → F·s = ½mv² - ½mu²",
      },
      {
        step: 4,
        title: "Work = Force × displacement",
        content: "W_net = F·s = ΔKE ✓  This is the Work-Energy Theorem.",
      },
    ],
    jeeProblem: {
      question:
        "A 2 kg block slides down a 5 m rough incline (θ=30°, μk=0.2). Find its speed at the bottom (start from rest).",
      solution: [
        "Normal force N = mg cosθ = 2×10×cos30° = 17.32 N",
        "Friction force f = μN = 0.2×17.32 = 3.46 N",
        "Work by gravity = mgh = mg·L sinθ = 2×10×5×0.5 = 50 J",
        "Work by friction = -f×L = -3.46×5 = -17.32 J",
        "W_net = 50 - 17.32 = 32.68 J = ½mv²",
        "v = √(2×32.68/2) = √32.68 ≈ 5.72 m/s",
      ],
    },
    memoryTricks: [
      "'WET' — Work = Energy Transfer",
      "Conservative forces: path doesn't matter (gravity, spring)",
      "Non-conservative forces: path matters, energy is 'lost' to heat (friction)",
    ],
    summary: [
      "W_net = ΔKE — work equals change in kinetic energy",
      "Conservative forces conserve mechanical energy",
      "Friction converts mechanical energy to heat",
      "Power = rate of doing work = F·v",
      "Spring PE = ½kx², Gravitational PE = mgh",
    ],
  },
  "simple harmonic motion": {
    title: "Simple Harmonic Motion (SHM)",
    jeeRelevance: "Very High",
    definition:
      "Periodic motion where restoring force is proportional to displacement and directed toward equilibrium. F = -kx. Results in sinusoidal oscillations.",
    concepts: [
      {
        icon: "🌊",
        title: "Restoring Force",
        explanation:
          "F = -kx. Negative sign means force opposes displacement. The harder you pull a spring, the more strongly it pulls back.",
      },
      {
        icon: "📈",
        title: "Equations of SHM",
        explanation:
          "x = A sin(ωt + φ), v = Aω cos(ωt + φ), a = -Aω²sin(ωt + φ). Acceleration always opposes displacement.",
      },
      {
        icon: "⚡",
        title: "Energy in SHM",
        explanation:
          "KE + PE = constant = ½kA². KE = ½mω²(A²-x²), PE = ½kx². Maximum KE at equilibrium, max PE at extremes.",
      },
      {
        icon: "🕰️",
        title: "Time Period",
        explanation:
          "T = 2π√(m/k) for spring-mass, T = 2π√(L/g) for simple pendulum. Independent of amplitude (small oscillations).",
      },
    ],
    formulas: [
      {
        name: "Angular frequency",
        formula: "ω = √(k/m) = 2π/T",
        variables: ["k = spring constant", "m = mass", "T = time period"],
      },
      {
        name: "Velocity at position x",
        formula: "v = ω√(A²-x²)",
        variables: [
          "A = amplitude",
          "x = displacement",
          "ω = angular frequency",
        ],
      },
      {
        name: "Simple Pendulum",
        formula: "T = 2π√(L/g)",
        variables: ["L = length of pendulum", "g = gravitational acceleration"],
      },
    ],
    derivation: [
      {
        step: 1,
        title: "Newton's 2nd Law",
        content: "For spring: F = -kx = ma → a = -(k/m)x = -ω²x",
      },
      {
        step: 2,
        title: "Differential Equation",
        content: "d²x/dt² + ω²x = 0. This is the SHM equation.",
      },
      {
        step: 3,
        title: "General Solution",
        content:
          "x(t) = A sin(ωt + φ) where A = amplitude, φ = phase constant.",
      },
      {
        step: 4,
        title: "Energy",
        content:
          "Total E = ½kA² = ½mω²A² (constant). Energy depends on amplitude, not position.",
      },
    ],
    jeeProblem: {
      question:
        "A spring (k=100 N/m) with a 0.25 kg mass has amplitude 0.1 m. Find: (a) period, (b) max speed, (c) speed at x=0.06 m.",
      solution: [
        "ω = √(k/m) = √(100/0.25) = √400 = 20 rad/s",
        "(a) T = 2π/ω = 2π/20 = 0.314 s",
        "(b) v_max = Aω = 0.1×20 = 2 m/s",
        "(c) v = ω√(A²-x²) = 20√(0.01-0.0036) = 20√0.0064 = 20×0.08 = 1.6 m/s",
      ],
    },
    memoryTricks: [
      "'SHM CAVE' — Sin/Cos, Harmonic, Max speed at center, At extremes velocity = 0, Period independent of amplitude, Energy = ½kA²",
      "SHM is like a pendulum clock — bigger swing doesn't make it faster!",
      "x, v, a are all sinusoidal but phase-shifted by 90° each time",
    ],
    summary: [
      "Restoring force: F = -kx (linear, opposing displacement)",
      "x = A sin(ωt+φ), v = Aω cos(ωt+φ), a = -Aω² sin(ωt+φ)",
      "Max speed = Aω at equilibrium, zero at extremes",
      "T = 2π/ω = 2π√(m/k) — independent of amplitude",
      "Total energy = ½kA² = constant",
    ],
  },
  gravitation: {
    title: "Gravitation",
    jeeRelevance: "High",
    definition:
      "Universal force of attraction between masses. Governs planetary motion, satellite orbits, and tidal forces. Newton's Law: F = Gm₁m₂/r².",
    concepts: [
      {
        icon: "🌍",
        title: "Universal Gravitation",
        explanation:
          "Every mass attracts every other mass. Force ∝ product of masses, inversely ∝ square of distance. G = 6.674×10⁻¹¹ N·m²/kg².",
      },
      {
        icon: "🛸",
        title: "Orbital Mechanics",
        explanation:
          "For circular orbit: centripetal force = gravitational force. v_orbital = √(GM/r). Higher orbit → slower orbital speed.",
      },
      {
        icon: "🚀",
        title: "Escape Velocity",
        explanation:
          "Minimum speed to escape gravitational field: v_esc = √(2GM/R) = √(2gR). For Earth ≈ 11.2 km/s.",
      },
      {
        icon: "⚡",
        title: "Gravitational PE",
        explanation:
          "U = -GMm/r (negative, bound system). Zero at infinity. Binding energy = GMm/r (energy needed to escape).",
      },
    ],
    formulas: [
      {
        name: "Newton's Law",
        formula: "F = Gm₁m₂/r²",
        variables: ["G = 6.674×10⁻¹¹", "m₁,m₂ = masses", "r = separation"],
      },
      {
        name: "Orbital Speed",
        formula: "v = √(GM/r)",
        variables: [
          "G = gravitational constant",
          "M = central mass",
          "r = orbital radius",
        ],
      },
      {
        name: "Escape Velocity",
        formula: "v_esc = √(2gR)",
        variables: ["g = surface gravity", "R = planet radius"],
      },
    ],
    derivation: [
      {
        step: 1,
        title: "Orbital Condition",
        content: "For circular orbit: F_gravity = F_centripetal",
      },
      {
        step: 2,
        title: "Equate Forces",
        content: "GMm/r² = mv²/r → v² = GM/r → v = √(GM/r)",
      },
      {
        step: 3,
        title: "Time Period",
        content:
          "T = 2πr/v = 2πr/√(GM/r) = 2π√(r³/GM) — Kepler's 3rd Law: T² ∝ r³",
      },
      {
        step: 4,
        title: "Energy",
        content:
          "KE = ½mv² = GMm/2r, PE = -GMm/r, Total E = -GMm/2r (negative for bound orbit)",
      },
    ],
    jeeProblem: {
      question:
        "A satellite orbits Earth at height h = R (R = 6400 km, g = 10 m/s²). Find its orbital speed and time period.",
      solution: [
        "Orbital radius r = R + h = R + R = 2R = 12800 km = 1.28×10⁷ m",
        "g at surface: g = GM/R² → GM = gR² = 10×(6.4×10⁶)² = 4.096×10¹⁴",
        "v = √(GM/r) = √(4.096×10¹⁴/1.28×10⁷) = √(3.2×10⁷) ≈ 5657 m/s ≈ 5.66 km/s",
        "T = 2πr/v = 2π×1.28×10⁷/5657 ≈ 14218 s ≈ 3.95 hours",
      ],
    },
    memoryTricks: [
      "'GONE' — Gravity Obeys Newton's equation",
      "Escape velocity = √2 × orbital velocity at same radius",
      "Geostationary orbit T = 24h, always above same point on equator",
    ],
    summary: [
      "F = Gm₁m₂/r² — always attractive, inverse square law",
      "g decreases with height: g' = g(R/R+h)²",
      "Orbital speed v = √(GM/r) — higher orbit, slower speed",
      "Escape velocity = √(2gR) ≈ 11.2 km/s for Earth",
      "Kepler's 3rd: T² ∝ r³",
    ],
  },
  electrostatics: {
    title: "Electrostatics",
    jeeRelevance: "Very High",
    definition:
      "Study of stationary electric charges and the forces, fields, and potentials they create. Foundation of all electromagnetic theory.",
    concepts: [
      {
        icon: "⚡",
        title: "Coulomb's Law",
        explanation:
          "Force between two point charges: F = kq₁q₂/r². Like charges repel, unlike attract. k = 9×10⁹ N·m²/C².",
      },
      {
        icon: "🌐",
        title: "Electric Field",
        explanation:
          "E = F/q₀ = kQ/r² (due to point charge). Field lines go from + to -. E is a vector field.",
      },
      {
        icon: "🔋",
        title: "Electric Potential",
        explanation:
          "V = kQ/r (scalar). Work done W = q·ΔV. Equipotential surfaces are ⊥ to field lines.",
      },
      {
        icon: "📦",
        title: "Gauss's Law",
        explanation:
          "Total electric flux through closed surface = Q_enclosed/ε₀. Powerful for symmetric charge distributions.",
      },
    ],
    formulas: [
      {
        name: "Coulomb's Law",
        formula: "F = kq₁q₂/r²",
        variables: [
          "k = 9×10⁹ N·m²/C²",
          "q₁,q₂ = charges (C)",
          "r = separation (m)",
        ],
      },
      {
        name: "Electric Field",
        formula: "E = kQ/r² = F/q₀",
        variables: ["Q = source charge", "r = distance", "q₀ = test charge"],
      },
      {
        name: "Gauss's Law",
        formula: "Φ = Q_enc/ε₀",
        variables: [
          "Φ = electric flux",
          "Q_enc = enclosed charge",
          "ε₀ = 8.85×10⁻¹² C²/N·m²",
        ],
      },
    ],
    derivation: [
      {
        step: 1,
        title: "Coulomb's Law",
        content:
          "F = kq₁q₂/r² (experimental fact). Direction: along line joining charges.",
      },
      {
        step: 2,
        title: "Electric Field",
        content:
          "E = lim(q₀→0) F/q₀ — force per unit positive test charge. For point charge: E = kQ/r².",
      },
      {
        step: 3,
        title: "Superposition",
        content:
          "Net field = vector sum of all individual fields. Net force = vector sum of all Coulomb forces.",
      },
      {
        step: 4,
        title: "Potential",
        content:
          "V = -∫E·dr. For point charge V = kQ/r. W = q(V₁-V₂) to move charge between potentials.",
      },
    ],
    jeeProblem: {
      question:
        "Three charges +2μC, -4μC, +2μC are placed at vertices of equilateral triangle (side 0.1 m). Find net force on +2μC at top vertex.",
      solution: [
        "F₁ = k×2×4/0.01 = 9×10⁹×8×10⁻¹²/0.01 = 7.2 N (attractive, toward -4μC)",
        "F₂ = k×2×2/0.01 = 3.6 N (repulsive, away from other +2μC)",
        "By symmetry, horizontal components cancel",
        "Vertical: F_net = F₁ sin60° + F₁ sin60° - F₂... (detailed vector analysis)",
        "Net force ≈ 10.8 N directed toward the -4μC charge",
      ],
    },
    memoryTricks: [
      "'FEVER' — Field lines Exit Valuable positive charges, Enter negative charges, Repel/attract based on sign",
      "Potential is like height in gravitational field — charge flows from high to low potential",
      "Inside conductor: E = 0, V = constant (equipotential)",
    ],
    summary: [
      "Coulomb's Law: F = kq₁q₂/r² (inverse square, like gravity)",
      "Electric field is force per unit positive charge",
      "V = kQ/r for point charge (scalar, add algebraically)",
      "Gauss's Law: flux = Q_enc/ε₀ for any closed surface",
      "Field lines ⊥ to equipotential surfaces",
    ],
  },
  thermodynamics: {
    title: "Thermodynamics",
    jeeRelevance: "High",
    definition:
      "Study of heat, work, and internal energy. The four laws govern energy transformations in physical and chemical processes.",
    concepts: [
      {
        icon: "🌡️",
        title: "Zeroth Law",
        explanation:
          "If A is in thermal equilibrium with C, and B is with C, then A and B are in equilibrium. Defines temperature.",
      },
      {
        icon: "⚡",
        title: "First Law",
        explanation:
          "ΔU = Q - W. Energy is conserved. Heat added increases internal energy; work done by system decreases it.",
      },
      {
        icon: "🔄",
        title: "Second Law",
        explanation:
          "Heat flows spontaneously from hot to cold. Entropy of universe always increases. No 100% efficient heat engine.",
      },
      {
        icon: "🧊",
        title: "Thermodynamic Processes",
        explanation:
          "Isothermal (T=const), Adiabatic (Q=0), Isochoric (V=const), Isobaric (P=const). Each has unique work formula.",
      },
    ],
    formulas: [
      {
        name: "First Law",
        formula: "ΔU = Q - W",
        variables: [
          "ΔU = change in internal energy",
          "Q = heat added to system",
          "W = work done by system",
        ],
      },
      {
        name: "Ideal Gas",
        formula: "PV = nRT",
        variables: [
          "P = pressure",
          "V = volume",
          "n = moles",
          "R = 8.314 J/mol·K",
          "T = temperature (K)",
        ],
      },
      {
        name: "Carnot Efficiency",
        formula: "η = 1 - T_cold/T_hot",
        variables: [
          "T_cold = temperature of cold reservoir (K)",
          "T_hot = temperature of hot reservoir (K)",
        ],
      },
    ],
    derivation: [
      {
        step: 1,
        title: "Internal Energy",
        content:
          "For ideal gas: U depends only on T. ΔU = nCᵥΔT for any process.",
      },
      {
        step: 2,
        title: "Work in Processes",
        content:
          "W = PΔV (isobaric), W = 0 (isochoric), W = nRT ln(V₂/V₁) (isothermal), W = -ΔU (adiabatic).",
      },
      {
        step: 3,
        title: "Apply First Law",
        content:
          "Q = ΔU + W for each process. Adiabatic: Q=0 → W = -ΔU = -nCᵥΔT.",
      },
      {
        step: 4,
        title: "Carnot Cycle",
        content:
          "Two isothermal + two adiabatic processes. Efficiency η = 1-T₂/T₁ is maximum possible for given temperatures.",
      },
    ],
    jeeProblem: {
      question:
        "1 mol ideal gas expands isothermally at 300 K from V₁=1L to V₂=4L. Find Q, W, and ΔU.",
      solution: [
        "Isothermal: T = constant → ΔU = 0 (for ideal gas)",
        "W = nRT ln(V₂/V₁) = 1×8.314×300×ln(4)",
        "W = 2494.2 × 1.386 = 3458 J",
        "First Law: Q = ΔU + W = 0 + 3458 = 3458 J",
        "System absorbs 3458 J of heat and does 3458 J of work",
      ],
    },
    memoryTricks: [
      "'QUIT' — Q = ΔU + W (rearranged: ΔU = Q - W In Thermodynamics)",
      "Adiabatic is 'insulated box' — no heat exchange, just work",
      "Carnot efficiency only depends on temperatures (absolute scale!)",
    ],
    summary: [
      "1st Law: ΔU = Q - W (energy conservation)",
      "Ideal gas: PV = nRT, ΔU = nCᵥΔT",
      "Isothermal: ΔU=0, Q=W; Adiabatic: Q=0, W=-ΔU",
      "Carnot: maximum theoretical efficiency = 1 - T_c/T_h",
      "Entropy of universe always increases (2nd law)",
    ],
  },
};

function getGenericNotes(topic: string): TopicNotes {
  return {
    title: topic,
    jeeRelevance: "High",
    definition: `${topic} is a fundamental concept in physics that plays a crucial role in understanding natural phenomena and solving JEE problems.`,
    concepts: [
      {
        icon: "🔬",
        title: "Core Principle",
        explanation: `The fundamental law governing ${topic} relates measurable quantities through a precise mathematical relationship.`,
      },
      {
        icon: "📐",
        title: "Mathematical Framework",
        explanation: `${topic} can be analyzed using differential equations, vector algebra, and conservation principles.`,
      },
      {
        icon: "⚡",
        title: "Physical Insight",
        explanation: `Understanding ${topic} requires visualizing the physical situation and identifying all relevant forces and fields.`,
      },
      {
        icon: "🎯",
        title: "JEE Application",
        explanation: `In JEE, ${topic} problems typically involve combining this concept with energy conservation, Newton's laws, or kinematics.`,
      },
    ],
    formulas: [
      {
        name: "Primary Relationship",
        formula: "F = f(variables)",
        variables: [
          "Identify all physical quantities",
          "Check SI units carefully",
          "Look for conservation laws",
        ],
      },
      {
        name: "Derived Quantity",
        formula: "E = g(variables)",
        variables: [
          "Energy-based formulation",
          "Often simplifies complex problems",
        ],
      },
    ],
    derivation: [
      {
        step: 1,
        title: "Define the System",
        content: `Clearly identify the physical system for ${topic}. Draw a diagram. List all given quantities and what is asked.`,
      },
      {
        step: 2,
        title: "Apply Fundamental Laws",
        content:
          "Use Newton's laws, energy conservation, or field equations as appropriate. Write the governing equation.",
      },
      {
        step: 3,
        title: "Mathematical Solution",
        content:
          "Solve the equations systematically. Use dimensional analysis to verify your answer.",
      },
      {
        step: 4,
        title: "Physical Interpretation",
        content:
          "Interpret the mathematical result physically. Check limiting cases and special conditions.",
      },
    ],
    jeeProblem: {
      question: `A standard JEE problem on ${topic} typically involves combining multiple concepts. Practice by looking up PYQs (Previous Year Questions) for this topic.`,
      solution: [
        "Step 1: Identify the relevant formula",
        "Step 2: Draw a diagram and define coordinate system",
        "Step 3: Apply the formula carefully",
        "Step 4: Check units and verify answer makes physical sense",
      ],
    },
    memoryTricks: [
      `For ${topic}: always start with a diagram",`,
      "Check conservation laws first — they often provide the fastest route",
      "Dimensional analysis catches most calculation errors",
    ],
    summary: [
      `${topic} involves understanding both mathematical formulation and physical intuition`,
      "Master the key formulas and their derivations",
      "Practice applying the concept in different physical scenarios",
      "Link with other topics: energy, force, kinematics",
      "Review PYQs to understand JEE problem patterns for this topic",
    ],
  };
}

function findTopic(input: string): TopicNotes {
  const key = input.toLowerCase().trim();
  const exact = knowledgeBase[key];
  if (exact) return exact;
  for (const k of Object.keys(knowledgeBase)) {
    if (key.includes(k) || k.includes(key)) return knowledgeBase[k];
  }
  return getGenericNotes(input);
}

const SAMPLE_TOPICS = [
  "Newton's Laws",
  "Circular Motion",
  "Projectile Motion",
  "Work Energy Theorem",
  "Simple Harmonic Motion",
  "Gravitation",
  "Electrostatics",
  "Thermodynamics",
];

const relevanceBadge = {
  "Very High": "bg-red-500/20 text-red-300 border-red-500/30",
  High: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Medium: "bg-blue-500/20 text-blue-300 border-blue-500/30",
};

export default function NoteDesigner() {
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState<TopicNotes | null>(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % SAMPLE_TOPICS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setNotes(null);
    setVisible(false);
    await new Promise((r) => setTimeout(r, 900));
    const result = findTopic(topic);
    setNotes(result);
    setLoading(false);
    setTimeout(() => setVisible(true), 50);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") generate();
  };

  const copyNotes = () => {
    if (!notes) return;
    const text = [
      `📚 ${notes.title}`,
      `JEE Relevance: ${notes.jeeRelevance}`,
      "",
      `DEFINITION: ${notes.definition}`,
      "",
      "KEY CONCEPTS:",
      ...notes.concepts.map((c) => `• ${c.title}: ${c.explanation}`),
      "",
      "FORMULAS:",
      ...notes.formulas.map((f) => `• ${f.name}: ${f.formula}`),
      "",
      "MEMORY TRICKS:",
      ...notes.memoryTricks.map((m) => `• ${m}`),
      "",
      "QUICK SUMMARY:",
      ...notes.summary.map((s) => `• ${s}`),
    ].join("\n");
    navigator.clipboard.writeText(text);
  };

  const reset = () => {
    setNotes(null);
    setTopic("");
    setVisible(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div className="min-h-screen bg-[#070d1a] relative overflow-hidden">
      {/* Circuit grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            AI-Powered Note Generator
          </div>
          <h1 className="text-4xl font-black text-white mb-3">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Note Designer
            </span>
          </h1>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Type any JEE Physics topic and get comprehensive, structured notes
            instantly
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur">
          <label
            htmlFor="topic-input"
            className="block text-sm font-medium text-white/70 mb-3"
          >
            Enter Physics Topic
          </label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                data-ocid="note_designer.topic.input"
                id="topic-input"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={handleKey}
                placeholder={`e.g. ${SAMPLE_TOPICS[placeholderIdx]}`}
                className="w-full bg-[#0d1b2a] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 text-xs">
                Enter ↵
              </div>
            </div>
            <button
              type="button"
              data-ocid="note_designer.generate.button"
              onClick={generate}
              disabled={loading || !topic.trim()}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm hover:from-cyan-400 hover:to-blue-500 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap shadow-lg shadow-cyan-500/20"
            >
              <span>✨</span>
              Generate Notes
            </button>
          </div>
          {/* Quick topic chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            {SAMPLE_TOPICS.slice(0, 6).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTopic(t)}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div
            data-ocid="note_designer.loading_state"
            className="flex flex-col items-center justify-center py-20 gap-6"
          >
            <div className="relative w-20 h-20">
              <svg
                viewBox="0 0 100 100"
                className="w-20 h-20 animate-spin"
                style={{ animationDuration: "2s" }}
                aria-hidden="true"
              >
                <title>Loading spinner</title>
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgba(34,211,238,0.15)"
                  strokeWidth="4"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="60 190"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-2xl">
                ⚛️
              </div>
            </div>
            <div className="text-center">
              <div className="text-cyan-400 font-semibold mb-1">
                Generating Your Notes...
              </div>
              <div className="text-white/40 text-sm">
                Analyzing topic and structuring content
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        {notes && !loading && (
          <div
            data-ocid="note_designer.notes.section"
            className={`space-y-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            {/* Topic Hero */}
            <div className="rounded-2xl overflow-hidden border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-violet-500/10">
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="text-2xl font-black bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent leading-tight">
                    {notes.title}
                  </h2>
                  <span
                    className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold border ${relevanceBadge[notes.jeeRelevance]}`}
                  >
                    JEE Relevance: {notes.jeeRelevance}
                  </span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  {notes.definition}
                </p>
              </div>
            </div>

            {/* Core Concepts */}
            <section
              style={{ animationDelay: "0.1s" }}
              className="animate-fade-up"
            >
              <h3 className="text-xs font-bold text-cyan-400/70 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-4 h-px bg-cyan-400/40" /> Core Concepts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {notes.concepts.map((c) => (
                  <div
                    key={c.title}
                    className="bg-white/[0.03] border border-white/8 rounded-xl p-4 hover:border-cyan-500/20 transition-all backdrop-blur"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{c.icon}</span>
                      <div>
                        <div className="text-sm font-bold text-white mb-1">
                          {c.title}
                        </div>
                        <div className="text-xs text-white/55 leading-relaxed">
                          {c.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Formulas */}
            <section
              style={{ animationDelay: "0.2s" }}
              className="animate-fade-up"
            >
              <h3 className="text-xs font-bold text-cyan-400/70 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-4 h-px bg-cyan-400/40" /> Essential Formulas
              </h3>
              <div className="space-y-3">
                {notes.formulas.map((f) => (
                  <div
                    key={f.name}
                    className="bg-[#0d1b2a] border-l-2 border-cyan-500 rounded-r-xl p-4"
                  >
                    <div className="text-xs text-cyan-400/60 mb-2 font-medium">
                      {f.name}
                    </div>
                    <div className="font-mono text-xl font-bold text-cyan-300 mb-3">
                      {f.formula}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {f.variables.map((v) => (
                        <span
                          key={v}
                          className="text-xs text-white/45 font-mono"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Derivation */}
            <section
              style={{ animationDelay: "0.3s" }}
              className="animate-fade-up"
            >
              <h3 className="text-xs font-bold text-cyan-400/70 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-4 h-px bg-cyan-400/40" /> Step-by-Step
                Derivation
              </h3>
              <div className="bg-[#080f1c] rounded-xl border border-white/8 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border-b border-white/8">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  <span className="ml-2 text-xs text-white/30 font-mono">
                    derivation.physics
                  </span>
                </div>
                <div className="p-4 space-y-3">
                  {notes.derivation.map((d) => (
                    <div key={d.step} className="flex gap-4">
                      <div className="shrink-0 w-6 h-6 rounded bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-xs font-mono text-cyan-400">
                        {d.step}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white/80 mb-0.5">
                          {d.title}
                        </div>
                        <div className="text-xs text-white/50 font-mono leading-relaxed">
                          {d.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* JEE Problem */}
            <section
              style={{ animationDelay: "0.4s" }}
              className="animate-fade-up"
            >
              <h3 className="text-xs font-bold text-amber-400/70 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-4 h-px bg-amber-400/40" /> JEE Problem
                Pattern
              </h3>
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5">
                <div className="flex items-start gap-2 mb-4">
                  <span className="text-amber-400 text-lg">🏆</span>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {notes.jeeProblem.question}
                  </p>
                </div>
                <div className="bg-[#0d1b2a] rounded-lg p-4 space-y-2">
                  {notes.jeeProblem.solution.map((s) => (
                    <div
                      key={s.slice(0, 20)}
                      className="text-xs font-mono text-amber-300/80 flex gap-2"
                    >
                      <span className="text-amber-500/50">▶</span>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Memory Tricks */}
            <section
              style={{ animationDelay: "0.5s" }}
              className="animate-fade-up"
            >
              <h3 className="text-xs font-bold text-violet-400/70 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-4 h-px bg-violet-400/40" /> Memory Tricks
              </h3>
              <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-4 space-y-3">
                {notes.memoryTricks.map((m) => (
                  <div key={m.slice(0, 20)} className="flex items-start gap-3">
                    <span className="text-violet-400 text-sm mt-0.5">💡</span>
                    <p className="text-sm text-white/65 leading-relaxed">{m}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Summary */}
            <section
              style={{ animationDelay: "0.6s" }}
              className="animate-fade-up"
            >
              <h3 className="text-xs font-bold text-green-400/70 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-4 h-px bg-green-400/40" /> Quick Revision
                Summary
              </h3>
              <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
                <ul className="space-y-2">
                  {notes.summary.map((s) => (
                    <li key={s.slice(0, 20)} className="flex items-start gap-3">
                      <span className="text-green-400 text-xs mt-1 shrink-0">
                        ✓
                      </span>
                      <span className="text-sm text-white/70">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2 pb-6">
              <button
                type="button"
                data-ocid="note_designer.copy.button"
                onClick={copyNotes}
                className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                📋 Copy Notes
              </button>
              <button
                type="button"
                data-ocid="note_designer.reset.button"
                onClick={reset}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 text-sm font-medium hover:from-cyan-500/30 hover:to-blue-500/30 transition-all flex items-center justify-center gap-2"
              >
                ✨ New Topic
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fade-up 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}
