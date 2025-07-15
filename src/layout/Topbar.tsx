import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LogOut } from "react-feather";
import { Link } from "react-router";
import logo from "../assets/logo.png";
// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import { useEffect, useState } from "react";

export function Topbar() {
  const { publicKey, disconnect } = useWallet();
  // const {  } = useConnection()
  const [isMobile, setIsMobile] = useState(false);
  const { setVisible: setModalVisible } = useWalletModal();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (isMobile) {
        setModalVisible(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className="mt-8 mb-4 flex w-full justify-between px-2">
      <Link to="/">
        <img src={logo} alt="Logo" className="mx-6 h-20" />
      </Link>

      <div hidden={isMobile} className="mr-2 flex items-center">
        <WalletMultiButton className=" bg-amber-600" />
        {publicKey && <LogOut onClick={()=>{disconnect()}} className="m-2 cursor-pointer text-white" />}
      </div>
    </div>
  );
}

