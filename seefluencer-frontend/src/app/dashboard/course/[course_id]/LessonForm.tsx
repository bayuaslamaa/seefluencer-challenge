"use client";

import { API_URL } from "@/lib/constants";
import { useEffect, useState } from "react";
import type { Session } from "next-auth";
import type { Lesson } from "@/types/lesson";
import { toast } from "react-toastify";

type LessonFormProps = {
    courseId: string;
    lesson?: Lesson | null;
    onSuccess: () => void;
    session: Session | null;
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
    setLessonToEdit: (lesson: Lesson | null) => void;
};

export default function LessonForm({ courseId, lesson, onSuccess, session, setLessonToEdit, isOpen, setIsOpen }: LessonFormProps) {
    const [title, setTitle] = useState(lesson?.title || "");
    const [content, setContent] = useState(lesson?.content || "");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) {
            return;
        }
        if (!session.user.id) {
            return;
        }

        const payload = { title, content, course_id: courseId };

        if (lesson) {
            // Update existing lesson
            try {
                await fetch(`${API_URL}/lessons/${lesson.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json", "X-Google-Id": session.user.id },
                    body: JSON.stringify(payload),
                });
                toast.success("Lesson updated successfully");
            } catch (error) {
                toast.error("Error updating lesson " + JSON.stringify(error));
            }
        } else {
            // Create new lesson for this course
            try {
                await fetch(`${API_URL}/courses/${courseId}/lessons`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "X-Google-Id": session.user.id },
                    body: JSON.stringify(payload),
                });
                toast.success("Lesson created successfully");
            } catch (error) {
                toast.error("Error creating lesson " + JSON.stringify(error));
            }
        }
        onSuccess();
        setLessonToEdit(null);
        setTitle("");
        setContent("");
        setIsOpen?.(false);
    };

    useEffect(() => {
        if (lesson) {
            setTitle(lesson.title);
            setContent(lesson.content);
        }
    }, [lesson]);

    if (isOpen) {
        return (
            <form onSubmit={handleSubmit} className="p-4 bg-gray-50 rounded shadow-md space-y-4 mt-4">
                <div>
                    <label htmlFor="title" className="block text-gray-700 font-medium">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-gray-700 font-medium">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="mt-1 block w-full p-2 border rounded"
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => {
                        setIsOpen?.(false)
                        setTitle("")
                        setContent("")
                        setLessonToEdit?.(null)
                    }} className="px-4 py-2 bg-red-600 text-white rounded">
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                        {lesson ? "Update Lesson" : "Create Lesson"}
                    </button>
                </div>
            </form>
        );
    }
    return (
        <button onClick={() => {
            setIsOpen?.(true)

        }} type="button" className="px-4 py-2 bg-[#0d65c0] text-white rounded md:w-1/4 font-semibold">
            Add Lesson
        </button>
    );
}
