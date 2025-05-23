// A simple example in a client component:
"use client";

import type { Course } from "@/types/course";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ConfirmationModal from "@/components/ConfirmationModal";

export default function CoursesList({ getCourses, courses, setCourses, setCourseToEdit, setIsOpen }: { getCourses: () => Promise<void>, courses: Course[], setCourses: (courses: Course[]) => void, setCourseToEdit: (course: Course | null) => void, setIsOpen: (isOpen: boolean) => void }) {
    const { data: session } = useSession();
    const API_URL = "http://localhost:8000/api";
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState<number | null>(null);

    const router = useRouter();
    useEffect(() => {
        const fetchCourses = async () => {
            if (!session?.user?.id) {
                console.error("User ID is undefined");
                return;
            }
            try {
                const res = await fetch(`${API_URL}/courses`, {
                    headers: {
                        "X-Google-Id": session?.user.id,
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();
                setCourses(data);
            } catch (error) {
                toast.error("Error fetching courses " + JSON.stringify(error));
            }
        };
        if (!session) return;
        fetchCourses();
    }, [session, setCourses]);

    const handleDeleteClick = (id: number) => {
        setCourseToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const deleteCourse = async (id: number) => {
        if (!session?.user?.id) {
            console.error("User ID is undefined");
            return;
        }
        try {
            await fetch(`${API_URL}/courses/${id}`, {
                method: "DELETE",
                headers: {
                    "X-Google-Id": session?.user.id,
                },
            });
            getCourses();
            toast.success("Course deleted successfully");
        } catch (error) {
            console.error("Error deleting course:", error);
            toast.error("Error deleting course");
        }
    };

    if (!session) {
        return <div>Please log in</div>;
    }
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Courses</h2>
            <div className="space-y-4">
                {courses.length > 0 && courses?.map((course) => (
                    <div
                        key={course.id} className="p-4 bg-white shadow rounded flex justify-between items-center"
                    >
                        <div>
                            <h3 className="text-xl font-bold">{course.title}</h3>
                            <p className="text-gray-600">{course.description}</p>
                        </div>
                        <div className="space-x-2">
                            <button
                                type="button"
                                className="px-3 py-1 bg-gray-500 text-white rounded"
                                onClick={() => {
                                    router.push(`/dashboard/course/${course.id}`);
                                }}
                            >
                                View
                            </button>
                            <button
                                type="button"
                                className="px-3 py-1 bg-[#0d65c0] text-white rounded"
                                onClick={() => {
                                    setCourseToEdit?.(course)
                                    setIsOpen?.(true)
                                }}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="px-3 py-1 bg-red-500 text-white rounded"
                                onClick={() => handleDeleteClick(course.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setCourseToDelete(null);
                }}
                onConfirm={() => {
                    if (courseToDelete) {
                        deleteCourse(courseToDelete);
                    }
                }}
                title="Delete Course"
                message="Are you sure you want to delete this course? This action cannot be undone."
                confirmText="Delete"
            />
        </div>
    );
}