# JEE MOGGER

## Current State
The app has 5 lesson modules (Newton's Laws, FBD, Tension) and a Quiz. Navigation is handled via a sidebar with 6 entries. The app has a dark futuristic theme (#070d1a background, cyan accents).

## Requested Changes (Diff)

### Add
- New `NoteDesigner` page/tool accessible from the sidebar
- A text input where the user types any physics topic (e.g. "Circular Motion", "Work Energy Theorem", "Projectile Motion")
- On submit, the tool generates rich, structured, futuristic in-depth notes for that topic
- Notes layout uses: topic title hero section with gradient, key concepts cards, formula boxes with LaTeX-style rendering, step-by-step derivations, memory tips/mnemonics, JEE exam relevance callouts, visual diagrams using SVG/Canvas
- Notes are generated client-side using a comprehensive pre-built knowledge base for common JEE Physics topics (20+ topics), with a fallback generic structure for unknown topics
- Export/copy notes functionality
- Animated note generation (typewriter effect, staggered card reveals)
- A "note_designer" entry added to LessonId type and sidebar

### Modify
- `App.tsx`: Add `note_designer` to `LessonId` type and `lessons` record
- `Sidebar.tsx`: Add Note Designer entry with a ✏️ or 📝 icon

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/components/NoteDesigner.tsx` - main tool component with topic input, knowledge base, and rendered notes
2. Update `App.tsx` to include `note_designer` in LessonId and lessons
3. Update `Sidebar.tsx` to include the new nav entry
