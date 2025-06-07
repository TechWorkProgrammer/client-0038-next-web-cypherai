import React from "react";
import {useWallet} from "@/context/Wallet";
import MusicAssets from "@/components/music/MusicAssets";
import ProtectedPage from "@/components/ProtectedPage";
import SidebarLayout from "@/components/layout/SidebarLayout";

const MusicAssetsPage: React.FC = () => {
    const {connectedWallet} = useWallet();

    return (
        <SidebarLayout>
            <div className="rounded-lg flex-1 flex flex-col p-4 md:p-6">
                {connectedWallet ? <MusicAssets/> : <ProtectedPage/>}
            </div>
        </SidebarLayout>
    );
};

export default MusicAssetsPage;
