import { useState } from "react";
import { Topic } from "../backend";
import { useActor } from "../hooks/useActor";
import { Button } from "./ui/button";

interface Question {
  id: string;
  topic: Topic;
  text: string;
  type: "mcq" | "numerical";
  options?: string[];
  answer: string;
  tolerance?: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: "q1",
    topic: Topic.newtons_first_law,
    text: "A body is moving with constant velocity. The net force on it is:",
    type: "mcq",
    options: ["Equal to ma", "Zero", "Positive", "Negative"],
    answer: "B",
    explanation:
      "Constant velocity means zero acceleration, so by F=ma, net force = 0.",
  },
  {
    id: "q2",
    topic: Topic.newtons_second_law,
    text: "A 5 kg box is pushed with a net force of 20 N. What is the acceleration? (in m/s²)",
    type: "numerical",
    answer: "4",
    tolerance: 0.1,
    explanation: "a = F/m = 20/5 = 4 m/s². Apply Newton's second law directly.",
  },
  {
    id: "q3",
    topic: Topic.newtons_first_law,
    text: "Newton's First Law is also called the Law of:",
    type: "mcq",
    options: ["Gravitation", "Inertia", "Reaction", "Energy"],
    answer: "B",
    explanation:
      "Newton's 1st law defines inertia -- the tendency of objects to resist changes in motion.",
  },
  {
    id: "q4",
    topic: Topic.newtons_second_law,
    text: "If mass doubles and force stays the same, acceleration:",
    type: "mcq",
    options: ["Doubles", "Halves", "Stays same", "Quadruples"],
    answer: "B",
    explanation:
      "a = F/m. Doubling m while keeping F constant halves the acceleration.",
  },
  {
    id: "q5",
    topic: Topic.newtons_third_law,
    text: "For every action force, there is an equal and opposite:",
    type: "mcq",
    options: ["Force", "Reaction force", "Momentum", "Velocity"],
    answer: "B",
    explanation:
      "Newton's 3rd law: action-reaction pairs are equal, opposite, and on different bodies.",
  },
  {
    id: "q6",
    topic: Topic.free_body_diagram,
    text: "In a Free Body Diagram, Normal force always acts:",
    type: "mcq",
    options: [
      "Downward",
      "Horizontal",
      "Perpendicular to surface",
      "Along surface",
    ],
    answer: "C",
    explanation:
      "Normal force is perpendicular (normal) to the contact surface, directed away from it.",
  },
  {
    id: "q7",
    topic: Topic.tension_force,
    text: "A 10 kg mass hangs from a rope (g = 10 m/s²). Tension in rope (N):",
    type: "numerical",
    answer: "100",
    tolerance: 1,
    explanation:
      "T = mg = 10 × 10 = 100 N. Tension equals weight when the mass is at rest.",
  },
  {
    id: "q8",
    topic: Topic.tension_force,
    text: "In an Atwood machine, both masses are equal. The acceleration of the system is: (m/s²)",
    type: "numerical",
    answer: "0",
    tolerance: 0.01,
    explanation:
      "Equal masses mean equal forces on both sides. Net force = 0, so acceleration = 0.",
  },
  {
    id: "q9",
    topic: Topic.newtons_first_law,
    text: "Seatbelts are necessary due to which Newton's Law?",
    type: "mcq",
    options: ["Third Law", "Second Law", "First Law", "Law of Gravitation"],
    answer: "C",
    explanation:
      "First Law (inertia): when the car stops, your body tends to keep moving forward.",
  },
  {
    id: "q10",
    topic: Topic.newtons_second_law,
    text: "A 2 kg block on a frictionless surface has a 6 N force applied. Acceleration (m/s²):",
    type: "numerical",
    answer: "3",
    tolerance: 0.1,
    explanation:
      "a = F/m = 6/2 = 3 m/s². Simple application of Newton's second law.",
  },
];

function checkAnswer(question: Question, ans: string): boolean {
  if (question.type === "mcq") {
    return ans === question.answer;
  }
  const num = Number.parseFloat(ans);
  const correct = Number.parseFloat(question.answer);
  return (
    !Number.isNaN(num) &&
    Math.abs(num - correct) <= (question.tolerance ?? 0.01)
  );
}

export default function Quiz({
  onComplete,
}: { onComplete: (score: number) => void }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);
  const [numInput, setNumInput] = useState("");
  const { actor } = useActor();

  const q = questions[current];
  const isSubmitted = submitted[q?.id];
  const userAnswer = answers[q?.id] ?? "";
  const isCorrect = isSubmitted && checkAnswer(q, userAnswer);

  const submitAnswer = async (ans: string) => {
    if (isSubmitted) return;
    const correct = checkAnswer(q, ans);
    setAnswers((a) => ({ ...a, [q.id]: ans }));
    setSubmitted((s) => ({ ...s, [q.id]: true }));

    if (actor) {
      try {
        await actor.recordQuizAttempt({
          topic: q.topic,
          questionId: q.id,
          selectedAnswer: ans,
          isCorrect: correct,
          timestamp: BigInt(Date.now()),
        });
      } catch {
        /* ignore */
      }
    }
  };

  const finish = async () => {
    const correct = questions.filter((ques) =>
      checkAnswer(ques, answers[ques.id] ?? ""),
    ).length;
    const score = Math.round((correct / questions.length) * 100);
    setFinished(true);
    onComplete(score);

    if (actor) {
      const topicScores: Record<string, { correct: number; total: number }> =
        {};
      for (const ques of questions) {
        if (!topicScores[ques.topic])
          topicScores[ques.topic] = { correct: 0, total: 0 };
        topicScores[ques.topic].total++;
        if (checkAnswer(ques, answers[ques.id] ?? ""))
          topicScores[ques.topic].correct++;
      }
      for (const [topic, data] of Object.entries(topicScores)) {
        try {
          await actor.updateTopicProgress({
            topic: topic as Topic,
            lessonsCompleted: BigInt(data.total),
            quizScore: BigInt(Math.round((data.correct / data.total) * 100)),
          });
        } catch {
          /* ignore */
        }
      }
    }
  };

  if (finished) {
    const correct = questions.filter((ques) =>
      checkAnswer(ques, answers[ques.id] ?? ""),
    ).length;
    const score = Math.round((correct / questions.length) * 100);
    const topicBreakdown: Record<string, { correct: number; total: number }> =
      {};
    for (const ques of questions) {
      if (!topicBreakdown[ques.topic])
        topicBreakdown[ques.topic] = { correct: 0, total: 0 };
      topicBreakdown[ques.topic].total++;
      if (checkAnswer(ques, answers[ques.id] ?? ""))
        topicBreakdown[ques.topic].correct++;
    }

    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8 pb-16">
        <div data-ocid="quiz.success_state" className="text-center space-y-4">
          <div className="text-6xl">
            {score >= 80 ? "🏆" : score >= 60 ? "✨" : "📚"}
          </div>
          <h1 className="text-3xl font-bold text-white">Quiz Complete!</h1>
          <div
            className="text-7xl font-bold font-mono"
            style={{
              background:
                score >= 80
                  ? "linear-gradient(to right, #22d3ee, #3b82f6)"
                  : score >= 60
                    ? "linear-gradient(to right, #f59e0b, #f97316)"
                    : "linear-gradient(to right, #ef4444, #dc2626)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {score}%
          </div>
          <p className="text-white/60">
            {correct} / {questions.length} correct
          </p>
        </div>

        <div className="glass rounded-2xl p-6 border border-white/10 space-y-3">
          <h2 className="text-lg font-semibold text-white">
            Topic-wise Breakdown
          </h2>
          {Object.entries(topicBreakdown).map(([topic, data]) => (
            <div key={topic} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-white/60 capitalize">
                  {topic.replace(/_/g, " ")}
                </span>
                <span className="text-white">
                  {data.correct}/{data.total}
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(data.correct / data.total) * 100}%`,
                    background:
                      data.correct === data.total
                        ? "#22c55e"
                        : data.correct > 0
                          ? "#f59e0b"
                          : "#ef4444",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <Button
          type="button"
          data-ocid="quiz.restart.button"
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3"
          onClick={() => {
            setCurrent(0);
            setAnswers({});
            setSubmitted({});
            setFinished(false);
            setNumInput("");
          }}
        >
          Retry Quiz
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Practice Quiz</h1>
          <p className="text-sm text-white/50">Newton's Laws of Motion</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-cyan-400">
            {current + 1}
            <span className="text-white/30">/{questions.length}</span>
          </div>
          <div className="text-xs text-white/40">
            {Object.values(submitted).filter(Boolean).length} answered
          </div>
        </div>
      </div>

      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          data-ocid="quiz.progress.bar"
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 rounded-full"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div
        key={q.id}
        className="glass rounded-2xl p-6 border border-white/10 space-y-5 animate-slide-in"
      >
        <div className="flex items-start gap-3">
          <span className="text-xs bg-cyan-500/20 text-cyan-400 font-bold px-2 py-1 rounded mt-0.5 flex-shrink-0">
            Q{current + 1}
          </span>
          <p className="text-white text-base leading-relaxed">{q.text}</p>
        </div>

        {q.type === "mcq" ? (
          <div className="space-y-2">
            {q.options?.map((opt, i) => {
              const label = String.fromCharCode(65 + i);
              const sel = userAnswer === label;
              const correct = isSubmitted && label === q.answer;
              const wrong = isSubmitted && sel && !correct;
              return (
                <button
                  type="button"
                  key={label}
                  data-ocid={`quiz.option.${label.toLowerCase()}`}
                  onClick={() => !isSubmitted && submitAnswer(label)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                    !isSubmitted
                      ? "border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 text-white/80"
                      : correct
                        ? "border-green-500/60 bg-green-500/10 text-green-300"
                        : wrong
                          ? "border-red-500/60 bg-red-500/10 text-red-300"
                          : "border-white/5 text-white/30"
                  }`}
                >
                  <span className="font-bold mr-2">{label}.</span>
                  {opt}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex gap-3">
              <input
                data-ocid="quiz.numerical.input"
                type="number"
                step="any"
                value={numInput}
                onChange={(e) => setNumInput(e.target.value)}
                disabled={isSubmitted}
                placeholder="Enter your answer..."
                className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/60"
              />
              {!isSubmitted && (
                <Button
                  type="button"
                  data-ocid="quiz.numerical.submit.button"
                  onClick={() => submitAnswer(numInput)}
                  disabled={!numInput}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        )}

        {isSubmitted && (
          <div
            className={`rounded-xl p-4 text-sm ${
              isCorrect
                ? "bg-green-500/10 border border-green-500/20 text-green-300"
                : "bg-red-500/10 border border-red-500/20 text-red-300"
            }`}
          >
            <div className="font-bold mb-1">
              {isCorrect ? "✓ Correct!" : `✗ Incorrect. Answer: ${q.answer}`}
            </div>
            <div className="text-white/70">{q.explanation}</div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          data-ocid="quiz.prev.button"
          variant="outline"
          onClick={() => {
            setCurrent((c) => Math.max(0, c - 1));
            setNumInput(answers[questions[Math.max(0, current - 1)]?.id] ?? "");
          }}
          disabled={current === 0}
          className="border-white/20 text-white/60"
        >
          ← Prev
        </Button>
        {current < questions.length - 1 ? (
          <Button
            type="button"
            data-ocid="quiz.next.button"
            onClick={() => {
              setCurrent((c) => c + 1);
              setNumInput(answers[questions[current + 1]?.id] ?? "");
            }}
            disabled={!isSubmitted}
            className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
          >
            Next →
          </Button>
        ) : (
          <Button
            type="button"
            data-ocid="quiz.finish.button"
            onClick={finish}
            disabled={!isSubmitted}
            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold"
          >
            Finish Quiz 🏆
          </Button>
        )}
      </div>
    </div>
  );
}
