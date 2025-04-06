"use client";
import { signIn, signOut, useSession } from "next-auth/react"
export function AuthButton() {
    const { data: session } = useSession()

    if (session) {
        return (
            <div className="flex absolute right-8">
                <button className="bg-[#0d65c0] text-white px-4 py-2 rounded font-semibold" onClick={() => {
                    signOut()
                }} type="button">
                    Sign out
                </button>
            </div>
        )
    }
    return (
        <div className="flex absolute right-8">
            <button className="bg-[#0d65c0] text-white px-4 py-2 rounded font-semibold" onClick={() => signIn("google")} type="button">
                Sign in with Google
            </button>
        </div>
    )
}
