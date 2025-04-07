"use client";

import type { Session } from "next-auth";
import { useState } from "react";
import { API_URL } from "@/lib/constants";
import LessonsList from "./LessonList";
import { useParams, useRouter } from "next/navigation";
import LessonForm from "./LessonForm";
import type { Lesson } from "@/types/lesson";
import DashboardWrapper from "../../DashboardWrapper";
import { AuthButton } from "../../AuthButton";
import { toast } from "react-toastify";
type LessonClientProps = {
    session: Session | null;
};

export default function LessonClient({ session }: LessonClientProps) {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [lessonToEdit, setLessonToEdit] = useState<Lesson | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { course_id } = useParams();
    if (!session) {
        return <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold">Seefluencer Course Dashboard</h1>
            <p className="text-gray-700">Please log in to access the Dashboard.</p>
            <AuthButton />
        </div>;
    }
    const getLessons = async () => {
        if (!session?.user?.id) {
            console.error("User ID is undefined");
            return;
        }
        try {
            const res = await fetch(`${API_URL}/courses/${course_id}/lessons`, {
                headers: {
                    "X-Google-Id": session?.user?.id,
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            setLessons(data);
        } catch (error) {
            toast.error("Error fetching lessons " + JSON.stringify(error));
        }
    };
    return (
        <DashboardWrapper session={session}>
            <div className="flex gap-3 items-center">

                <button
                    type="button"
                    className="px-3 py-1 bg-gray-500 text-white rounded"
                    onClick={() => router.back()}
                >
                    Back
                </button>
                <h1 className="text-2xl font-bold">Course Lessons</h1>
            </div>
            <LessonForm courseId={course_id as string} onSuccess={getLessons} session={session} lesson={lessonToEdit} setLessonToEdit={setLessonToEdit} isOpen={isOpen} setIsOpen={setIsOpen} />
            <LessonsList courseId={course_id as string} session={session} setIsOpen={setIsOpen} setLessons={setLessons} lessons={lessons} setLessonToEdit={setLessonToEdit} />
        </DashboardWrapper>
    );
}
