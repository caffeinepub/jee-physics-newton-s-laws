import type { LessonId } from "../App";

interface SidebarProps {
  activeLesson: LessonId;
  completedLessons: Set<LessonId>;
  quizScore: number | null;
  onSelect: (id: LessonId) => void;
}

const lessons: {
  id: LessonId;
  icon: string;
  title: string;
  subtitle: string;
}[] = [
  { id: "first", icon: "⚡", title: "1st Law", subtitle: "Law of Inertia" },
  { id: "second", icon: "🎯", title: "2nd Law", subtitle: "F = ma" },
  { id: "third", icon: "↔️", title: "3rd Law", subtitle: "Action-Reaction" },
  {
    id: "fbd",
    icon: "📐",
    title: "Free Body Diagram",
    subtitle: "Force Analysis",
  },
  {
    id: "tension",
    icon: "🔗",
    title: "Tension Force",
    subtitle: "Ropes & Pulleys",
  },
  {
    id: "quiz",
    icon: "🏆",
    title: "Practice Quiz",
    subtitle: "Test Your Knowledge",
  },
];

export default function Sidebar({
  activeLesson,
  completedLessons,
  quizScore,
  onSelect,
}: SidebarProps) {
  return (
    <aside
      className="w-[260px] h-full bg-[#0a1020] border-r border-white/10 flex flex-col"
      data-ocid="nav.sidebar.panel"
    >
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-sm font-bold text-white">
            J
          </div>
          <div>
            <div className="text-sm font-bold text-white">JEE Physics</div>
            <div className="text-xs text-white/40">Newton's Laws</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {lessons.map((lesson) => (
          <button
            type="button"
            key={lesson.id}
            data-ocid={`nav.${lesson.id}.link`}
            onClick={() => onSelect(lesson.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
              activeLesson === lesson.id
                ? "bg-cyan-500/15 border border-cyan-500/30 text-white"
                : "hover:bg-white/5 text-white/60 hover:text-white"
            }`}
          >
            <span className="text-lg leading-none">{lesson.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{lesson.title}</div>
              <div className="text-xs text-white/40 truncate">
                {lesson.subtitle}
              </div>
            </div>
            {lesson.id === "quiz" && quizScore !== null ? (
              <span className="text-xs font-bold text-amber-400">
                {quizScore}%
              </span>
            ) : completedLessons.has(lesson.id) ? (
              <span className="text-green-400 text-sm">✓</span>
            ) : null}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="glass rounded-lg p-3 text-center">
          <div className="text-xs text-white/50">Chapter</div>
          <div className="text-sm font-semibold text-cyan-400 mt-0.5">
            Newton's Laws of Motion
          </div>
          <div className="text-xs text-white/30 mt-1">JEE Physics</div>
        </div>
      </div>
    </aside>
  );
}
