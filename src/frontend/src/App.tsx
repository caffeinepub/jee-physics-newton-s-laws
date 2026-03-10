import { useState } from "react";
import Quiz from "./components/Quiz";
import Sidebar from "./components/Sidebar";
import FBDLesson from "./components/lessons/FBDLesson";
import FirstLaw from "./components/lessons/FirstLaw";
import SecondLaw from "./components/lessons/SecondLaw";
import TensionLesson from "./components/lessons/TensionLesson";
import ThirdLaw from "./components/lessons/ThirdLaw";
import { Button } from "./components/ui/button";
import { useInternetIdentity } from "./hooks/useInternetIdentity";

export type LessonId =
  | "first"
  | "second"
  | "third"
  | "fbd"
  | "tension"
  | "quiz";

export interface Progress {
  completedLessons: Set<LessonId>;
  quizScore: number | null;
}

export default function App() {
  const [activeLesson, setActiveLesson] = useState<LessonId>("first");
  const [progress, setProgress] = useState<Progress>({
    completedLessons: new Set(),
    quizScore: null,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { identity, login } = useInternetIdentity();

  const markComplete = (id: LessonId) => {
    setProgress((p) => ({
      ...p,
      completedLessons: new Set([...p.completedLessons, id]),
    }));
  };

  const lessons: Record<LessonId, React.ReactNode> = {
    first: <FirstLaw onComplete={() => markComplete("first")} />,
    second: <SecondLaw onComplete={() => markComplete("second")} />,
    third: <ThirdLaw onComplete={() => markComplete("third")} />,
    fbd: <FBDLesson onComplete={() => markComplete("fbd")} />,
    tension: <TensionLesson onComplete={() => markComplete("tension")} />,
    quiz: (
      <Quiz
        onComplete={(score) => setProgress((p) => ({ ...p, quizScore: score }))}
      />
    ),
  };

  const totalLessons = 5;
  const completedCount = progress.completedLessons.size;
  const completionPct = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-[#070d1a] flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
        />
      )}

      <div
        className={`fixed md:sticky top-0 h-screen z-30 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <Sidebar
          activeLesson={activeLesson}
          completedLessons={progress.completedLessons}
          quizScore={progress.quizScore}
          onSelect={(id) => {
            setActiveLesson(id);
            setSidebarOpen(false);
          }}
        />
      </div>

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#070d1a]/90 backdrop-blur">
          <button
            type="button"
            data-ocid="nav.sidebar.toggle"
            className="md:hidden p-2 rounded-lg hover:bg-white/10 text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
              role="img"
              aria-label="Open navigation menu"
            >
              <rect y="2" width="20" height="2" rx="1" />
              <rect y="9" width="20" height="2" rx="1" />
              <rect y="16" width="20" height="2" rx="1" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/50 hidden sm:block">
              Course Progress
            </span>
            <div className="h-2 w-32 bg-white/10 rounded-full overflow-hidden">
              <div
                data-ocid="progress.bar"
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 rounded-full"
                style={{ width: `${completionPct}%` }}
              />
            </div>
            <span className="text-xs text-cyan-400 font-semibold">
              {completionPct}%
            </span>
          </div>
          {!identity ? (
            <Button
              type="button"
              data-ocid="auth.login.button"
              size="sm"
              variant="outline"
              className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 text-xs"
              onClick={() => login()}
            >
              Login to Save
            </Button>
          ) : (
            <div className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Saving progress
            </div>
          )}
        </header>

        <main className="flex-1 overflow-y-auto">
          <div key={activeLesson} className="animate-slide-in">
            {lessons[activeLesson]}
          </div>
        </main>

        <footer className="text-center py-3 text-xs text-white/25 border-t border-white/5">
          Developed by Aditya .B
        </footer>
      </div>
    </div>
  );
}
