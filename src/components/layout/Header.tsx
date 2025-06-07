import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import Image from "next/image";
import {FaTimes} from "react-icons/fa";
import Link from "next/link";

const Header: React.FC = () => {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!isNavOpen) {
                setIsScrolled(window.scrollY > 50);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isNavOpen]);

    useEffect(() => {
        document.body.style.overflow = isNavOpen ? "hidden" : "";
    }, [isNavOpen]);

    const navItems = [
        {label: "About", path: "#about"},
        {label: "Product", path: "#product"},
        {label: "Studio", path: "#studio"},
        {label: "Pricing", path: "#pricing"},
        {
            label: "Web3",
            path: "https://docs.cypherai.app/cypher-ai-token/tokenomic",
        },
        {label: "Documentation", path: "https://docs.cypher.ai/"},
    ];

    const handleNavigation = (path: string) => {
        setIsNavOpen(false);
        if (!path.startsWith("#")) {
            router.push(path).then();
        }
    };

    const headerBg = isNavOpen
        ? "bg-primary-900 shadow-lg"
        : isScrolled
            ? "bg-primary-900 shadow-lg"
            : "bg-transparent";

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${headerBg}`}
            >
                <nav className="px-4 lg:px-10 py-3">
                    <div className="flex justify-between items-center max-w-screen-xl mx-auto relative">
                        <button
                            onClick={() => router.push("/")}
                            className="flex items-center space-x-2 w-auto h-8 md:h-10"
                        >
                            <div className="relative w-8 h-8 md:w-10 md:h-10">
                                <Image
                                    src="/icon.png"
                                    alt="CypherAI Logo"
                                    fill
                                    sizes="(max-width: 768px) 32px, (max-width: 1200px) 40px, 48px"
                                    style={{objectFit: "contain"}}
                                    priority
                                />
                            </div>
                            <span className="text-white font-semibold text-xl md:text-2xl">
                                CypherAI
                            </span>
                        </button>

                        <ul className="hidden lg:flex space-x-6">
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    {item.path.startsWith("http") ? (
                                        <a
                                            href={item.path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white font-semibold text-sm hover:text-accent-500 transition-colors"
                                        >
                                            {item.label}
                                        </a>
                                    ) : (
                                        <Link
                                            href={item.path}
                                            className="text-white font-semibold text-sm hover:text-accent-500 transition-colors"
                                            onClick={() => handleNavigation(item.path)}
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => setIsNavOpen(true)}
                            className="lg:hidden text-white focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </nav>
            </header>

            {isNavOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsNavOpen(false)}
                />
            )}

            <div
                className={`fixed top-0 right-0 h-full w-64 bg-primary-900 z-60 transform transition-transform duration-300 ${
                    isNavOpen ? "translate-x-0" : "translate-x-full"
                } lg:hidden`}
            >
                <ul className="flex flex-col h-full p-6 space-y-6">
                    <li className="self-end">
                        <button
                            onClick={() => setIsNavOpen(false)}
                            className="text-white hover:text-primary-500 transition-colors"
                        >
                            <FaTimes size={24}/>
                        </button>
                    </li>
                    {navItems.map((item) => (
                        <li key={item.label}>
                            {item.path.startsWith("http") ? (
                                <a
                                    href={item.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full text-left text-white hover:text-accent-600 transition-colors text-lg"
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <Link
                                    href={item.path}
                                    className="w-full text-left text-white hover:text-accent-600 transition-colors text-lg"
                                    onClick={() => handleNavigation(item.path)}
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Header;
