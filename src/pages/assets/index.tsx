import React from "react";
import ProtectedPage from "@/components/ProtectedPage";
import SidebarLayout from "@/components/layout/SidebarLayout";
import {useWallet} from "@/context/Wallet";
import MeshAssets from "@/components/mesh/MeshAssets";

const MyAssets: React.FC = () => {
    const {connectedWallet} = useWallet();

    return (
        <SidebarLayout>
            <div className="rounded-lg flex-1 flex flex-col p-4 md:p-6">
                {connectedWallet ? <MeshAssets/> : <ProtectedPage/>}
            </div>
        </SidebarLayout>
    );
};

export default MyAssets;
