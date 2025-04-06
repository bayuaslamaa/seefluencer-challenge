// components/CourseForm.tsx
"use client";

import { API_URL } from "@/lib/constants";
import { useSession } from "next-auth/react";
import { useEffect, useState, } from "react";
import type { Course } from "@/types/course";
type CourseFormProps = {
    course?: Course | null;
    onSuccess: () => void;
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
    setCourseToEdit?: (course: Course | null) => void;
};


export default function CourseForm({ course, onSuccess, isOpen, setIsOpen, setCourseToEdit }: CourseFormProps) {
    const { data: session } = useSession();

    const [title, setTitle] = useState(course?.title || "");
    const [description, setDescription] = useState(course?.description || "");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) return;

        if (!session.user.id) {
            console.error("User ID is undefined");
            return;
        }
        const payload = { title, description };

        if (course) {
            // Update existing course
            await fetch(`${API_URL}/courses/${course.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", "X-Google-Id": session.user.id },
                body: JSON.stringify(payload),
            });
        } else {
            // Create new course
            await fetch(`${API_URL}/courses`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "X-Google-Id": session.user.id },
                body: JSON.stringify(payload),
            });
        }
        onSuccess();
    };


    useEffect(() => {
        if (isOpen && course) {
            setTitle(course.title);
            setDescription(course.description);
        }
    }, [isOpen, course]);

    if (isOpen) {
        return (
            <form onSubmit={handleSubmit} className="p-4 bg-gray-50 rounded shadow-md space-y-4">
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
                    <label htmlFor="description" className="block text-gray-700 font-medium">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full p-2 border rounded"
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => {
                        setIsOpen?.(false)
                        setTitle("")
                        setDescription("")
                        setCourseToEdit?.(null)
                    }} className="px-4 py-2 bg-red-600 text-white rounded">
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-[#0d65c0] text-white rounded">
                        {course ? "Update Course" : "Create Course"}
                    </button>
                </div>
            </form>
        );
    }

    return (
        <button onClick={() => {
            setIsOpen?.(true)

        }} type="button" className="px-4 py-2 bg-[#0d65c0] text-white rounded md:w-1/4 font-semibold">
            Create Course
        </button>
    );
}
