import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import LessonClient from "./LessonClient";

export default async function CoursePage() {
    const session = await getServerSession(authOptions);

    return <LessonClient session={session} />;
}
