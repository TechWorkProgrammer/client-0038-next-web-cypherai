import React from "react";
import {
    FaMediumM,
    FaTelegram,
    FaHome,
    FaMagic,
    FaRegCompass,
    FaFolderOpen,
    FaMusic,
    FaCode,
    FaGlobeAsia,
    FaGamepad
} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";
import {Md3dRotation} from "react-icons/md";
import {RiNftLine} from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";

const quickLinks = [
    {label: "About", path: "#about"},
    {label: "Product", path: "#product"},
    {label: "Studio", path: "#studio"},
    {label: "Pricing", path: "#pricing"},
    {label: "Web3", path: "https://docs.logicai.technology/logic-ai-token/tokenomic"},
    {label: "Documentation", path: "https://docs.logicai.technology/"},
];

const featureLinks = [
    {label: "Home", path: "/", icon: <FaHome/>},
    {label: "Feature", path: "/feature", icon: <FaMagic/>},
    {label: "Discovery", path: "/discovery", icon: <FaRegCompass/>},
    {label: "My Assets", path: "/assets", icon: <FaFolderOpen/>},
    {label: "Text to 3D", path: "/3d", icon: <Md3dRotation/>},
    {label: "Text to Music", path: "/music", icon: <FaMusic/>},
    {label: "Text to Program", path: "/program", icon: <FaCode/>},
    {label: "Text to NFT", path: "/nft", icon: <RiNftLine/>},
    {label: "Text to Metaverse", path: "/metaverse", icon: <FaGlobeAsia/>},
    {label: "Text to Game", path: "/game", icon: <FaGamepad/>},
];

const half = Math.ceil(featureLinks.length / 2);
const firstHalf = featureLinks.slice(0, half);
const secondHalf = featureLinks.slice(half);

const Footer: React.FC = () => {
    const router = useRouter();
    return (
        <footer className="relative w-full text-secondary py-10">
            <div className="container mx-auto px-6 lg:px-20 z-2">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">
                    <div className="text-left">
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
                        <p className="text-sm lg:text-base text-secondary-400 max-w-sm mt-2">
                            CypherAI helps bring your ideas to life. Use artificial intelligence to its fullest to help
                            automate, innovate, and elevate your business to the next level.
                        </p>
                    </div>
                    <div className="text-left">
                        <ul className="space-y-2">
                            {quickLinks.map((item, index) => (
                                <li key={index}>
                                    <Link href={item.path} target={item.path.startsWith("http") ? "_blank" : "_self"}>
                                        <span
                                            className="text-secondary-400 hover:text-accent-500 transition cursor-pointer">
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-8 text-left">
                        {[firstHalf, secondHalf].map((half, colIndex) => (
                            <ul key={colIndex} className="space-y-2">
                                {half.map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        {item.icon}
                                        <Link href={item.path}>
                                            <span
                                                className="text-secondary-400 hover:text-accent-500 transition cursor-pointer">
                                                {item.label}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
                <div className="mt-8 border-t border-secondary-700 pt-4 text-center flex flex-row justify-between">
                    <p className="text-md text-secondary-500">
                        © 2025 CypherAI. All Rights Reserved.
                    </p>
                    <div className="flex space-x-4">
                        <a href="https://t.me/LogicAIETH" target="_blank" rel="noopener noreferrer"
                           className="text-secondary-400 hover:text-accent-500 transition">
                            <FaTelegram size={24}/>
                        </a>
                        <a href="https://x.com/logicaiofficial" target="_blank" rel="noopener noreferrer"
                           className="text-secondary-400 hover:text-accent-500 transition">
                            <FaXTwitter size={24}/>
                        </a>
                        <a href="https://medium.com/@logicagentai" target="_blank" rel="noopener noreferrer"
                           className="text-secondary-400 hover:text-accent-500 transition">
                            <FaMediumM size={24}/>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;