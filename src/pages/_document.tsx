import {Head, Html, Main, NextScript} from 'next/document';
import React from "react";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <link rel="mask-icon" href="/apple-touch-icon.png" color="#00C9FF"/>
                <meta name="theme-color" content="#0B0F19"/>

                <meta charSet="UTF-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="author" content="fnrafa"/>
                <meta name="keywords" content="CypherAI, Artificial Intelligence, Automation, Machine Learning, 3D, Music, Program, Data"/>
                <meta name="description"
                      content="CypherAI helps bring your ideas to life. Use artificial intelligence to its fullest to help automate, innovate, and elevate your business to the next level."/>

                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://cypherai.app/"/>
                <meta property="og:title" content="CypherAI - Unlock Your Full Potential With CypherAI"/>
                <meta property="og:description"
                      content="CypherAI helps bring your ideas to life. Use artificial intelligence to its fullest to help automate, innovate, and elevate your business to the next level."/>
                <meta property="og:image" content="/icon.png"/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:url" content="https://cypherai.app/"/>
                <meta name="twitter:title" content="CypherAI - Unlock Your Full Potential With CypherAI"/>
                <meta name="twitter:description"
                      content="CypherAI helps bring your ideas to life. Use artificial intelligence to its fullest to help automate, innovate, and elevate your business to the next level."/>
                <meta name="twitter:image" content="/icon.png"/>

                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>

                <link rel="canonical" href="https://cypherai.app/"/>
            </Head>
            <body className="bg-background-dark text-white antialiased">
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}
