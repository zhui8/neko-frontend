import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LogOut } from "react-feather";
import { Link } from "react-router";
// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

export function Topbar() {
  const { publicKey, disconnect } = useWallet();

  return (
    <div className="mt-8 mb-4 flex w-full justify-between px-2">
      <Link to="/">
        <img src="/logo.png" alt="Logo" className="mx-6 h-20" />
      </Link>

      <div className="mr-2 flex items-center">
        <WalletMultiButton />
        {publicKey && <LogOut onClick={()=>{disconnect()}} className="m-2 cursor-pointer text-white" />}
      </div>
    </div>
  );
}
