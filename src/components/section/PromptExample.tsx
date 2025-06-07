import React from "react";
import Image from "next/image";

const promptText = "Futuristic 3D female character with glowing cyan elements in a cyber world.";
const imageSrc = "/assets/images/prompt-example.png";

const PromptExample: React.FC = () => {
    return (
        <div className="w-full flex justify-center">
            <div className="relative w-full flex justify-center items-center py-4">
                <div className="absolute left-0 top-0 bottom-0 w-[100vw]">
                    <Image
                        src="/assets/images/prompt-splash-left.png"
                        alt="Left Light Decoration"
                        fill
                        style={{objectFit: "contain", objectPosition: "left"}}
                        priority
                    />
                </div>

                <div className="absolute right-0 top-0 bottom-0 w-[100vw]">
                    <Image
                        src="/assets/images/prompt-splash-right.png"
                        alt="Right Decoration"
                        fill
                        style={{objectFit: "contain", objectPosition: "right"}}
                        priority
                    />
                </div>

                <div
                    className="relative w-[90vw] aspect-[20/9] border-2 border-accent-400 rounded-xl overflow-hidden shadow-lg">
                    <Image
                        src={imageSrc}
                        alt="Generated Example"
                        fill
                        sizes="(max-width: 768px) 80vw, (max-width: 1280px) 70vw, (max-width: 1920px) 60vw, 50vw"
                        style={{objectFit: "cover", objectPosition: "center"}}
                        priority
                    />

                    <div
                        className="absolute bottom-0 w-full mx-auto px-4 py-3 rounded-lg shadow-xl text-center"
                    >
                        <p className="font-bold mb-1 text-md md:text-lg lg:text-xl">
                            Prompt
                        </p>
                        <p className="font-semibold text-xs md:text-sm lg:text-md">
                            {promptText}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromptExample;
