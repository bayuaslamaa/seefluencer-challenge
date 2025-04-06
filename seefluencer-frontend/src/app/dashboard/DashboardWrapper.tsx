import { AuthButton } from "./AuthButton";
import type { Session } from "next-auth";
export default function DashboardWrapper({ children, session }: { children: React.ReactNode, session: Session | null }) {
    return <div className="flex flex-col gap-4 p-8">
        <AuthButton />
        <h1 className="text-2xl font-bold">Seefluencer Course Dashboard</h1>
        <p>Selamat berkarya, {session?.user?.name}!</p>
        {children}
    </div>
}

