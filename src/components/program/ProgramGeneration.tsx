import React, {useState} from "react";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import {useAlert} from "@/context/Alert";
import {useLoader} from "@/context/Loader";
import {
    FaRegPaperPlane,
    FaPlay, FaRegEye,
} from "react-icons/fa";
import JSZip from "jszip";
import {saveAs} from "file-saver";
import {getAccessToken} from "@/utils/user";
import api from "@/utils/axios";
import {IoCodeSharp} from "react-icons/io5";
import {HiOutlineDownload} from "react-icons/hi";

interface GeneratedFile {
    fileName: string;
    content: string;
}

const ProgramGeneration: React.FC = () => {
    const [prompt, setPrompt] = useState("");
    const [files, setFiles] = useState<GeneratedFile[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [previewFile, setPreviewFile] = useState<GeneratedFile | null>(null);
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [reviewSrcDoc, setReviewSrcDoc] = useState<string>("");

    const alert = useAlert();
    const loader = useLoader();

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            alert("We can handle your prompt", "Please enter a prompt first to generate code.", "error");
            return;
        }
        const token = getAccessToken();
        if (!token) {
            alert("Opps...", "You need login to generate code, Please log in.", "error");
            return;
        }

        try {
            setIsLoading(true);
            loader(true);

            const res = await api.post(`/code/generate`, {
                prompt: prompt.trim(),
            });
            const result: Record<string, Record<string, string>> = res.data.data;
            const parsedFiles: GeneratedFile[] = [];

            for (const group of ["html", "css", "js"] as const) {
                if (result[group]) {
                    for (const [name, content] of Object.entries(result[group])) {
                        parsedFiles.push({fileName: name, content});
                    }
                }
            }
            setFiles(parsedFiles);
        } catch (err: any) {
            alert("Opps...", err.response?.data?.message || "Failed to generate code. Try again later", "error");
        } finally {
            setIsLoading(false);
            loader(false);
        }
    };

    const handleDownload = (file: GeneratedFile) => {
        const blob = new Blob([file.content], {
            type: file.fileName.endsWith(".js")
                ? "application/javascript"
                : file.fileName.endsWith(".css")
                    ? "text/css"
                    : "text/html",
        });
        saveAs(blob, file.fileName);
    };

    const handleDownloadAll = async () => {
        if (!files.length) return;
        const zip = new JSZip();
        files.forEach((f) => zip.file(f.fileName, f.content));
        const blob = await zip.generateAsync({type: "blob"});
        saveAs(blob, `code-${Date.now()}.zip`);
    };

    const handlePreview = (file: GeneratedFile) => {
        setPreviewFile(file);
    };

    const handleReview = () => {
        const htmlFiles = files.filter((f) => f.fileName.endsWith(".html"));
        const cssFiles = files.filter((f) => f.fileName.endsWith(".css"));
        const jsFiles = files.filter((f) => f.fileName.endsWith(".js"));

        if (htmlFiles.length === 0) {
            alert("No HTML file to preview.", "error");
            return;
        }

        const main = htmlFiles.find((f) => f.fileName === "index.html") || htmlFiles[0];
        let src = main.content;

        const cssTags = cssFiles
            .map((c) => `<style>\n${c.content}\n</style>`)
            .join("\n");
        src = src.replace("</head>", `${cssTags}\n</head>`);

        const jsTags = jsFiles
            .map((j) => `<script>\n${j.content}\n</script>`)
            .join("\n");
        src = src.replace("</body>", `${jsTags}\n</body>`);

        setReviewSrcDoc(src);
        setIsReviewOpen(true);
    };

    return (
        <div className="text-white w-full">
            <div className="flex w-full">
                <div
                    className="w-[200px] md:w-[280px] lg:w-[320px] flex flex-col bg-background-light h-[calc(100vh-4rem)] md:h-screen border-x border-secondary-200">
                    <div className="w-full h-full flex flex-col justify-between">
                        <div>
                            <h2 className="md:text-xl font-semibold p-4 border-b border-secondary-200">Code
                                Program Generation</h2>
                            <div className="p-4">
                                <h2 className="md:text-xl font-semibold mb-2">Prompt</h2>
                                <textarea
                                    name="prompt"
                                    placeholder="Please describe your creative ideas for the code program"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    className="w-full bg-primary-700 text-white placeholder-secondary-400 border border-secondary-200 rounded p-4 resize-none focus:outline-none focus:ring-1 focus:ring-accent-500"
                                    rows={6}
                                />
                            </div>
                        </div>
                        <div className="p-4">
                            <Button
                                onClick={handleGenerate}
                                color="primary"
                                icon={<FaRegPaperPlane/>}
                                disabled={isLoading || !prompt.trim() || files.length != 0}
                                label="Generate"
                                fullWidth={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col p-4 md:p-6 w-full">
                    <div className="flex justify-start mb-4">
                        <Button
                            onClick={() => alert("Coming soon", "This feature isn't ready yet. Stay tuned.", "info")}
                            color="primary"
                            label="Open My Assets"
                        />
                    </div>

                    {files.length > 0 && (
                        <div className="rounded-lg flex-1 flex flex-col">
                            <h3 className="md:text-xl font-semibold mb-4">Generated Files</h3>
                            <div className="space-y-3 overflow-auto h-fit">
                                {files.map((file) => (
                                    <div
                                        key={file.fileName}
                                        className="bg-primary-700 px-4 py-2 rounded-lg flex items-center justify-between w-full"
                                    >
                                        <span className="text-white">{file.fileName}</span>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handlePreview(file)}
                                                className="bg-accent-400 px-2 rounded-md"
                                            >
                                                <IoCodeSharp className="text-black text-xl"/>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (file.fileName.endsWith(".html")) {
                                                        const url = URL.createObjectURL(
                                                            new Blob([file.content], {type: "text/html"})
                                                        );
                                                        window.open(url, "_blank");
                                                    } else {
                                                        handlePreview(file);
                                                    }
                                                }}
                                                className="bg-primary-600 p-2 rounded-md"
                                            >
                                                <FaRegEye className="text-white text-xl"/>
                                            </button>
                                            <button
                                                onClick={() => handleDownload(file)}
                                                className="bg-primary-600 p-2 rounded-md"
                                            >
                                                <HiOutlineDownload className="text-white text-xl"/>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 flex flex-row gap-3 justify-end">
                                <button
                                    onClick={handleReview}
                                    className="flex items-center justify-center gap-2 bg-primary-600 px-3 py-2 rounded text-lg font-semibold"
                                >
                                    <FaPlay/>
                                    <span>Review Whole App</span>
                                </button>
                                <button
                                    onClick={handleDownloadAll}
                                    className="flex items-center justify-center gap-2 bg-accent-400 px-3 py-2 rounded text-lg text-black font-semibold"
                                >
                                    <HiOutlineDownload/>
                                    <span>Download All as ZIP</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {previewFile && (
                <Modal onClose={() => setPreviewFile(null)} title={previewFile.fileName}>
                    <div className="bg-background-dark rounded p-4 overflow-auto max-h-96">
                        <pre className="whitespace-pre-wrap text-sm">{previewFile.content}</pre>
                    </div>
                </Modal>
            )}

            {isReviewOpen && (
                <Modal onClose={() => setIsReviewOpen(false)} title={"App Preview"}>
                        <iframe
                            title="App Preview"
                            srcDoc={reviewSrcDoc}
                            className="w-full h-full rounded-lg"
                        />
                </Modal>
            )}
        </div>
    );
};

export default ProgramGeneration;
