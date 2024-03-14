import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'

export default function Layout({ children }) {
    const [user, setUser] = useState({});
    const pathname = usePathname()
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        setUser(storedUser);
    }, []);

    const getActive = (route) => pathname == route ? "text-white bg-gray-700" : "";

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
                                    {user.name.slice(0, 1).toUpperCase()}
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow mt-[64px] bg-gray-600">{children}</main>

        </div>
    );
}