"use client";

import type { Session } from "next-auth";
import { useEffect, useState } from "react";
import { AuthButton } from "./AuthButton";
import CoursesList from "./CourseList";
import type { Course } from "@/types/course";
import { API_URL } from "@/lib/constants";
import CourseForm from "./CourseForm";
import DashboardWrapper from "./DashboardWrapper";
import { toast } from "react-toastify";
type DashboardClientProps = {
    session: Session | null;
};

export default function DashboardClient({ session }: DashboardClientProps) {

    const [courses, setCourses] = useState<Course[]>([]);
    const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (session) {
            try {
                fetch(`${API_URL}/users/sync`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        google_id: session.user.id,
                        name: session.user.name,
                        email: session.user.email,
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => console.log("User synced:", data))
                    .catch((error) => console.log("Error syncing user:", error));
            } catch (error) {
                toast.error("Error sync user")
            }
        }
    }, [session]);

    if (!session) {
        return <div className="flex flex-col gap-4  bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold">Seefluencer Course Dashboard</h1>
            <p>Please log in to access the Dashboard.</p>
            <AuthButton />
        </div>;
    }
    const getCourses = async () => {
        if (!session?.user?.id) {
            console.error("User ID is undefined");
            return;
        }
        try {
            const res = await fetch(`${API_URL}/courses`, {
                headers: {
                    "X-Google-Id": session?.user?.id,
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            setCourses(data);
        } catch (error) {
            toast.error("Error fetching courses");
        }
    };


    return (
        <DashboardWrapper session={session}>
            <CourseForm onSuccess={getCourses} isOpen={isOpen} setIsOpen={setIsOpen} course={courseToEdit} setCourseToEdit={setCourseToEdit} />
            <CoursesList getCourses={getCourses} courses={courses} setCourses={setCourses} setCourseToEdit={setCourseToEdit} setIsOpen={setIsOpen} />
        </DashboardWrapper>
    );
}
