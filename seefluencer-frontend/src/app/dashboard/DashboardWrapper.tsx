import { AuthButton } from "./AuthButton";
import type { Session } from "next-auth";
export default function DashboardWrapper({ children, session }: { children: React.ReactNode, session: Session | null }) {
    return <div className="flex flex-col gap-4 p-8 shadow-md">
        <AuthButton />
        <div className="bg-white p-6 rounded-lg shadow-md w-[90%]">
            <h1 className="text-2xl font-bold mb-2">Seefluencer Course Dashboard</h1>
            <p className="text-gray-700">Selamat berkarya, {session?.user?.name}!</p>
        </div>
        {children}
    </div>
}

