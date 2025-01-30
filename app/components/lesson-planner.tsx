"use client"

import { useState } from "react"
import { useCompletion } from "ai/react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

export default function LessonPlanner() {
  const [subject, setSubject] = useState("")
  const [gradeLevel, setGradeLevel] = useState("")
  const [duration, setDuration] = useState("")
  const [learningStyle, setLearningStyle] = useState("")
  const [activeTab, setActiveTab] = useState("planner")

  const {
    complete: completePlan,
    completion: plan,
    isLoading: isPlanLoading,
  } = useCompletion({
    api: "/api/generate-lesson-plan",
  })

  const {
    complete: completeFeedback,
    completion: feedback,
    isLoading: isFeedbackLoading,
  } = useCompletion({
    api: "/api/generate-lesson-plan",
  })

  const {
    complete: completeResources,
    completion: resources,
    isLoading: isResourcesLoading,
  } = useCompletion({
    api: "/api/generate-lesson-plan",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    completePlan({
      subject,
      gradeLevel,
      duration,
      learningStyle,
      action: "generatePlan",
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-white rounded-t-lg grid grid-cols-3 p-0 h-12">
            <TabsTrigger
              value="planner"
              className="rounded-none data-[state=active]:bg-transparent text-gray-600 data-[state=active]:text-gray-900"
            >
              Lesson Planner
            </TabsTrigger>
            <TabsTrigger
              value="feedback"
              className="rounded-none data-[state=active]:bg-transparent text-gray-500 data-[state=active]:text-gray-900"
            >
              AI Feedback
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="rounded-none data-[state=active]:bg-transparent text-gray-500 data-[state=active]:text-gray-900"
            >
              Resource Suggestions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="planner" className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400"
              />

              <Select value={gradeLevel} onValueChange={setGradeLevel}>
                <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                  <SelectValue placeholder="Select Grade Level" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="elementary">Elementary School</SelectItem>
                  <SelectItem value="middle">Middle School</SelectItem>
                  <SelectItem value="high">High School</SelectItem>
                  <SelectItem value="higher">Higher Education</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="number"
                placeholder="Lesson Duration (in minutes)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400"
              />

              <Select value={learningStyle} onValueChange={setLearningStyle}>
                <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                  <SelectValue placeholder="Select Learning Style" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="visual">Visual</SelectItem>
                  <SelectItem value="auditory">Auditory</SelectItem>
                  <SelectItem value="kinesthetic">Kinesthetic</SelectItem>
                  <SelectItem value="reading">Reading/Writing</SelectItem>
                  <SelectItem value="multimodal">Multimodal</SelectItem>
                </SelectContent>
              </Select>

              <Button
                type="submit"
                disabled={isPlanLoading}
                className="w-full bg-white hover:bg-gray-100 text-gray-900"
              >
                {isPlanLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Lesson Plan...
                  </>
                ) : (
                  "Generate Lesson Plan"
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="feedback" className="p-6">
            {isFeedbackLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </div>
            ) : feedback ? (
              <div className="prose prose-invert max-w-none">{feedback}</div>
            ) : (
              <div className="text-gray-400 text-center">Generate a lesson plan first to receive AI feedback</div>
            )}
          </TabsContent>

          <TabsContent value="resources" className="p-6">
            {isResourcesLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </div>
            ) : resources ? (
              <div className="prose prose-invert max-w-none">{resources}</div>
            ) : (
              <div className="text-gray-400 text-center">Generate a lesson plan first to get resource suggestions</div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

