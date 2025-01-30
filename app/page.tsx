import LessonPlanner from "./components/lesson-planner"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <h1 className="text-5xl font-bold text-white mb-8 text-center">AI-Driven Lesson Planner</h1>
      <LessonPlanner />
    </main>
  )
}

