import React from "react";
import {motion} from "framer-motion";
import Image from "next/image";

const Banner: React.FC = () => {

    return (
        <section id="about"
                 className="relative pt-24 lg:pt-44 flex flex-col items-center justify-start overflow-hidden bg-transparent"
        >
            <motion.div
                className="relative z-10 flex flex-col items-center mx-auto"
                initial={{opacity: 0, y: -50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1, ease: "easeOut"}}
            >
                <div className="w-full lg:w-1/2 text-left md:text-center space-y-6">
                    <h1 className="text-5xl font-extrabold text-white text-center drop-shadow-lg mb-2">
                        Unlock Your Full Potential
                    </h1>
                    <h1 className="text-5xl font-extrabold text-white text-center drop-shadow-lg mb-10">
                        with{" "}
                        <span className="bg-gradient-to-r from-accent-600 to-accent-400 bg-clip-text text-transparent">
                            CypherAI
                        </span>
                    </h1>
                    <p className="text-lg lg:text-xl text-secondary-900 px-4 md:px-8">
                        CypherAI helps bring your ideas to life. Use artificial intelligence to its fullest to help
                        automate, innovate, and elevate your business to the next level.
                    </p>
                </div>
                <div className="relative flex justify-center items-center w-full h-auto z-10">
                    <motion.div
                        className="relative w-full max-w-4xl aspect-[20/9] overflow-hidden transform rotate-3"
                        initial={{opacity: 0, scale: 0.9}}
                        whileInView={{opacity: 1, scale: 1}}
                        viewport={{once: false}}
                        transition={{duration: 0.8}}
                    >
                        <Image
                            src="/assets/images/cypher-splash.png"
                            alt="Cypher Splash"
                            fill
                            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 60vw, 50vw"
                            style={{objectFit: "contain"}}
                            priority
                        />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Banner;
