// components/LessonsList.tsx
"use client";

import { API_URL } from "@/lib/constants";
import type { Lesson } from "@/types/lesson";
import type { Session } from "next-auth";
import { useEffect } from "react";


type LessonsListProps = {
    courseId: string;
    session: Session | null;
    setLessons: (lessons: Lesson[]) => void;
    lessons: Lesson[];
    setLessonToEdit: (lesson: Lesson | null) => void;
    setIsOpen: (isOpen: boolean) => void;
};

export default function LessonsList({ courseId, session, setLessons, lessons, setLessonToEdit, setIsOpen }: LessonsListProps) {
    const fetchLessons = async () => {
        if (!session) {
            return;
        }
        if (!session.user.id) {
            return;
        }
        const res = await fetch(`${API_URL}/courses/${courseId}/lessons`, {
            headers: {
                "Content-Type": "application/json",
                "X-Google-Id": session.user.id,
            },
        });
        const data = await res.json();
        setLessons(data);
    };

    useEffect(() => {
        const fetchLessons = async () => {
            if (!session) {
                return;
            }
            if (!session.user.id) {
                return;
            }
            const res = await fetch(`${API_URL}/courses/${courseId}/lessons`, {
                headers: {
                    "Content-Type": "application/json",
                    "X-Google-Id": session.user.id,
                },
            });
            const data = await res.json();
            setLessons(data);
        };

        if (courseId) {
            fetchLessons();
        }
    }, [courseId, session, setLessons]);

    const deleteLesson = async (id: number) => {
        if (!session) {
            return;
        }
        if (!session.user.id) {
            return;
        }
        await fetch(`${API_URL}/lessons/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-Google-Id": session.user.id,
            },
        });
        fetchLessons();
    };

    return (
        <div className="mt-4">
            <div className="space-y-4">
                {lessons?.map((lesson) => (
                    <div key={lesson.id} className="p-4 bg-white shadow rounded flex justify-between items-center"

                    >
                        <div>
                            <h3 className="text-xl font-bold">{lesson.title}</h3>
                            <p className="text-gray-600">{lesson.content}</p>
                        </div>
                        <div className="space-x-2">
                            <button
                                type="button"
                                className="px-3 py-1 bg-[#0d65c0] text-white rounded"
                                onClick={() => {
                                    setLessonToEdit(lesson);
                                    setIsOpen(true);
                                }}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="px-3 py-1 bg-red-500 text-white rounded"
                                onClick={() => deleteLesson(lesson.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
