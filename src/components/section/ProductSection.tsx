import React from "react";
import {motion} from "framer-motion";
import {FaRegCompass, FaMagic} from "react-icons/fa";
import {useRouter} from "next/router";
import Button from "@/components/common/Button";
import ImageInfiniteSlider from "@/components/common/ImageInfiniteSlider";

const scrollingImages = [
    "/assets/ai/dall-e-alien-creature.webp",
    "/assets/ai/dall-e-cute-alien.webp",
    "/assets/ai/dall-e-cute-dragon.webp",
    "/assets/ai/dall-e-cute-fluffy-creature.webp",
    "/assets/ai/dall-e-drone.webp",
    "/assets/ai/dall-e-fantasy-elf.webp",
    "/assets/ai/dall-e-futuristic-hover-bike.webp",
    "/assets/ai/dall-e-futuristic-humanoid-robot.webp",
    "/assets/ai/dall-e-futuristic-robot-panther.webp",
    "/assets/ai/dall-e-mechanical-insect.webp",
    "/assets/ai/dall-e-medieval-warrior.webp",
];

const ProductionSection = () => {
    const router = useRouter();

    return (
        <motion.section
            id="product"
            className="flex flex-col w-full h-screen overflow-hidden text-white items-center justify-center"
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: false}}
            transition={{duration: 0.8}}
        >
            <div
                className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl min-h-[50vh] text-center mx-auto px-6 py-12 md:px-12 lg:px-18 gap-4">
                <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                    From Concept to Reality.
                </h1>
                <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-accent-400">
                    CypherAI
                </h1>
                <p className="mt-4 text-base md:text-lg lg:text-xl text-secondary-800">
                    Create 3D models, games, music, scripts, NFTs, and metaverse materials only using words that comes
                    through your mind. CypherAI are intended to inspire your creativity and help you produce and invent
                    with ease
                </p>
                <div className="flex flex-row gap-4 w-full justify-center items-center mt-6">
                    <Button
                        label="Discovery"
                        onClick={() => router.push("/discover")}
                        icon={<FaRegCompass/>}
                        iconPosition="left"
                        color="secondary"
                        fullWidth={false}
                    />
                    <Button
                        label="Generate"
                        onClick={() => router.push("/service")}
                        icon={<FaMagic/>}
                        iconPosition="left"
                        color="primary"
                        fullWidth={false}
                    />
                </div>
            </div>

            <div className="w-full h-1/2 z-0 flex justify-center items-center">
                <ImageInfiniteSlider
                    images={scrollingImages}
                    speed={20}
                    direction="right"
                    imageWidth={300}
                    imageHeight={420}
                    gap={16}
                />
            </div>
        </motion.section>
    );
};

export default ProductionSection;
