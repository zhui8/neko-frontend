import { useWallet } from "@solana/wallet-adapter-react";
import {
  useWalletModal,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { LogOut } from "react-feather";
import { Link } from "react-router";
import logo from "../assets/logo.png";
import X from "../assets/X.png";
import BackGround from "../assets/nekoweb_bg_header.png";
// Default styles that can be overridden by your app
// import "@solana/wallet-adapter-react-ui/styles.css";
import "./style.css";
import { useEffect, useState } from "react";

export function Topbar() {
  // const { publicKey, disconnect } = useWallet();
  // const {  } = useConnection()
  const [isMobile, setIsMobile] = useState(false);
  const { setVisible: setModalVisible } = useWalletModal();

  useEffect(() => {
    setModalVisible(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (isMobile) {
        setModalVisible(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      // style={{
      //   height: "800px",
      //   backgroundImage: `url(${BackGround})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
      className="flex-col"
    >
      <div className="mt-8 mb-4 flex w-full h-auto justify-between px-2 items-start">
        <Link to="/">
          <img src={logo} alt="Logo" className="mx-6 h-20" />
        </Link>

        <RightMenu />
      </div>

      {/* <div className="mt-50 ml-50">
        <p className="text-8xl text-white font-bold mb-4">
          $NEKO
        </p>
        <p className="text-2xl text-white ml-2">
          Hold $NEKO, Hold fortune!
        </p>
      </div> */}

      {/* <div className="mr-2 flex items-center">
        <WalletMultiButton />
        {publicKey && <LogOut onClick={()=>{disconnect()}} className="m-2 cursor-pointer text-white" />}
      </div> */}
    </div>
  );
}

function RightMenu() {
  const { setVisible: setModalVisible } = useWalletModal();
  const { publicKey } = useWallet();

  return (
    <div className="flex items-center">
      <Link
        target="_blank"
        to="https://x.com/nekobabysol"
        className="mr-8 text-white"
      >
        <img src={X} alt="Logo" className="h-8 w-8" />
      </Link>
      <Link to="/" className="mr-8 text-white text-2xl">
        Home
      </Link>
      <Link to="/about" className="mr-8 text-white text-2xl">
        Articles
      </Link>
      <Link to="/contact" className="mr-8 text-white text-2xl">
        Blog
      </Link>

      <WalletMultiButton />
      {publicKey && (
        <LogOut
          onClick={() => {
            setModalVisible(false);
          }}
          className="m-2 cursor-pointer text-white"
        />
      )}
    </div>
  );
}
