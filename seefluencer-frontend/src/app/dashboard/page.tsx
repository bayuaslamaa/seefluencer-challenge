// app/dashboard/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
    // This is a Server Component, so it's OK to be async
    const session = await getServerSession(authOptions);

    return <DashboardClient session={session} />;
}
