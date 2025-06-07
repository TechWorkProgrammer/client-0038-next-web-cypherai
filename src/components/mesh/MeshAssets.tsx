import React, {useCallback, useEffect, useState} from "react";
import {useAlert} from "@/context/Alert";
import {MeshData} from "@/types/mesh";
import MeshCard from "@/components/mesh/MeshCard";
import Pagination from "@/components/common/Pagination";
import {useRouter} from "next/router";
import {AiOutlineArrowLeft} from "react-icons/ai";
import Loader from "@/components/common/Loader";
import api from "@/utils/axios";

const MeshAssets: React.FC = () => {
    const [meshList, setMeshList] = useState<MeshData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [isLoading, setIsLoading] = useState(true);
    const alert = useAlert();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const router = useRouter();

    const fetchUserMeshes = useCallback(async () => {
        try {
            const response = await api.get(`${API_BASE_URL}/mesh/user`);
            setMeshList(response.data.data);
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to fetch mesh data.", "error");
        } finally {
            setIsLoading(false);
        }
    }, [alert, API_BASE_URL]);

    useEffect(() => {
        fetchUserMeshes().then();
    }, [fetchUserMeshes]);

    const sortedMeshList = [...meshList].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMeshes = sortedMeshList.slice(indexOfFirstItem, indexOfLastItem);

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center">
                <Loader size="large"/>
            </div>
        );
    }

    if (!sortedMeshList.length) {
        return (
            <p className="text-white text-center">No mesh assets found. Start generating!</p>
        );
    }

    return (
        <div className="w-full h-full flex flex-col gap-4 relative justify-between">
            <div className="flex flex-col gap-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-secondary-700 bg-primary-800 transition p-2 rounded-md w-fit mt-10 md:mt-0"
                >
                    <AiOutlineArrowLeft className="w-5 h-5"/>
                    Back
                </button>

                <h2 className="text-2xl font-bold text-center text-white">My Mesh Assets</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentMeshes.map((mesh) => (
                        <MeshCard key={mesh.id} mesh={mesh}/>
                    ))}
                </div>
            </div>

            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={sortedMeshList.length}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
            />
        </div>
    );
};

export default MeshAssets;
