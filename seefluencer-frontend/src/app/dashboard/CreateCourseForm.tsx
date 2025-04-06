"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function CreateCourseForm({ getCourses }: { getCourses: () => Promise<void> }) {
    const { data: session } = useSession();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) return;

        if (!session.user.id) {
            console.error("User ID is undefined");
            return;
        }
        await fetch("http://localhost:8000/api/courses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Google-Id": session.user.id,
            },
            body: JSON.stringify({ title, description }),
        });

        setIsOpen(false);
        setTitle("");
        setDescription("");
        getCourses();
    };

    if (isOpen) {
        return (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    className="border p-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    className="border p-2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit" className="bg-[#0d65c0] text-white p-2">
                    Create Course
                </button>
            </form>
        );
    }

    return (
        <button onClick={() => setIsOpen(true)} type="button" className="bg-[#0d65c0] text-white p-2 rounded-md font-bold">
            Create Course
        </button>
    );
}
