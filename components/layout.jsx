import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function Layout({ children }) {
    const router = useRouter()

    const [user, setUser] = useState({});
    const pathname = usePathname()
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (!storedUser?.name) {
            router.push("/login");
        }
        setUser(storedUser);
    }, []);

    const getActive = (route) => pathname == route ? "text-white bg-gray-700" : "";

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/login");
    }

    return (
        <div className="flex flex-col min-h-screen">
            <nav className="fixed z-10 w-full bg-gray-800">
                <div className="container px-4 mx-auto">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/">
                                <span className="text-xl font-bold text-white">Logo</span>
                            </Link>
                        </div>
                        <div className="flex gap-2">
                            <Link href="/">
                                <span className={`px-3 py-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white ${getActive("/")}`}>
                                    Home
                                </span>
                            </Link>
                            <Link href="/users">
                                <span className={`px-3 py-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white ${getActive("/users")}`}>
                                    Users
                                </span>
                            </Link>
                            <Link href="/products">
                                <span className={`px-3 py-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white ${getActive("/products")}`}>
                                    Products
                                </span>
                            </Link>
                            <Link href="/profile" className="mx-5">
                                <div className={` w-8 h-8  flex justify-center items-center text-gray-300 rounded-full bg-primary`}>
                                    {user?.name?.slice(0, 1).toUpperCase() || "A"}
                                </div>
                            </Link>
                            <button onClick={handleLogout} className="p-2 text-white rounded-md bg-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                </svg>

                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className={`flex-grow ${pathname == "/login" ? "" : "mt-[64px]"}  bg-gray-600`}>{children}</main>

        </div>
    );
}