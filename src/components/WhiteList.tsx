import { Button } from "antd";
import { useEffect, useState } from "react";
import websitCat from "../assets/website-cat.png";
import bubbling from "../assets/bubbling.png";
import hudong from "../assets/hudong.png";
import twitterBg from "../assets/twitter-bg.png";
import nftBg from "../assets/nft-bg.png";
import { set } from "valibot";

export function GetWhiteList() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-4/5 lg:w-3/5 flex flex-col items-center text-white">
      <p className="text-4xl lg:text-4xl font-bold my-12">Get Whitelisted</p>

      {isMobile ? <Mobile /> : <Pc />}
    </div>
  );
}

function Pc() {
  const [selected, setSelected] = useState<"website" | "twitter" | "nft">(
    "website"
  );

  let selectedClass =
    "w-1/6 text-md font-bold text-white-400 bg-[#352F9A] px-4 py-2 rounded-2xl cursor-pointer";
  let unselectedClass =
    "w-1/6 text-md font-bold text-white-400 border-3 border-[#352F9A] px-4 py-2 rounded-2xl cursor-pointer";

  return (
    <div>
      <div className="flex justify-between w-full">
        <button
          className={selected === "website" ? selectedClass : unselectedClass}
          onClick={() => {
            setSelected("website");
          }}
        >
          Website
        </button>

        <button
          className={selected === "twitter" ? selectedClass : unselectedClass}
          onClick={() => {
            setSelected("twitter");
          }}
        >
          Twitter
        </button>

        <button
          className={selected === "nft" ? selectedClass : unselectedClass}
          onClick={() => {
            setSelected("nft");
          }}
        >
          NFT
        </button>
      </div>

      <div className="w-full">
        {selected === "website" && <Website />}
        {selected === "twitter" && <Twitter />}
        {selected === "nft" && <NFT />}
      </div>
    </div>
  );
}

function Mobile() {
  return (
    <div className="w-full flex flex-col items-center text-white">
      <div className="text-center w-3/4 text-md font-bold text-white-400 bg-[#352F9A] px-4 py-2 rounded-2xl">
        Website
      </div>
      <Website />

      <div className="text-center w-3/4 text-md font-bold text-white-400 bg-[#352F9A] px-4 py-2 rounded-2xl mt-16">
        Twitter
      </div>
      <Twitter />

      <div className="text-center w-3/4 text-md font-bold text-white-400 bg-[#352F9A] px-4 py-2 rounded-2xl mt-16">
        NFT
      </div>
      <NFT />
    </div>
  );
}

function Website() {
  return (
    <div className="mt-8 w-full flex flex-col lg:flex-row items-start justify-start rounded-2xl bg-[#352F9A] p-8">

			<div className="flex">
				<img src={websitCat} alt="Website Cat" className="w-1/3 lg:w-1/2" />

      <div
        className="w-[120px] h-[70px] lg:w-[140px] lg:h-[100px]"
        style={{
          backgroundImage: `url(${bubbling})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <p className="px-1 pt-1 text-xs lg:text-[12px] text-black">Current Probability</p>
        <p className="px-1 text-orange-400 font-bold italic text-xl">
          {"0.0001%"}
        </p>
      </div>

			</div>
      

      <div className="flex flex-col justify-center items-center my-4">
        <div className="flex">
          <div className="flex flex-col items-center mr-4">
            <p className="flex text-xs">
              <img src={hudong} className="w-4 h-4" />
              互动人数
            </p>
            <p className="font-bold text-2xl italic">300</p>
          </div>
          <div className="ml-8 flex flex-col items-center mr-4">
            <p className="flex text-xs">
              <img src={hudong} className="w-4 h-4" />
              白名单
            </p>
            <p className="font-bold text-2xl italic">10</p>
          </div>
        </div>

        <p className="w-full lg:w-5/6 my-4">
          Visit our website and tan theNFkO dailv!Fach dav.10 check-in users
          will be randomlv rewardedwith whitelist NFTs.
        </p>

        <button className="p-2 mt-4 lg:text-2xl rounded-4xl w-7/8 lg:w-1/2 bg-[#564BEB]">
          Check-In
        </button>
      </div>
    </div>
  );
}

function Twitter() {
  return (
    <div className="bg-[#352F9A] rounded-4xl flex flex-col items-center w-full mt-8">
      <img
        src={twitterBg}
        alt="Twitter Background"
        className="w-full object-cover rounded-2xl"
      />
      <p className="m-4">
        Like, retweet & comment onour pinned tweet.We'l randomly select 10
        luckycats to receive whitelist NFTs!
      </p>

      <button className="p-2 mb-8 font-bold lg:text-xl rounded-4xl w-5/6 lg:w-1/2 bg-[#564BEB]">
        Follow us on Twitter
      </button>
    </div>
  );
}

function NFT() {
  return (
    <div className="bg-[#352F9A] rounded-4xl flex flex-col items-center w-full mt-8">
      <img
        src={nftBg}
        alt="Twitter Background"
        className="w-full object-cover rounded-2xl"
      />
      <p className="m-4">
        We're dropping 300 whitelistNFTs to the fastest participants during our
        publicclaim window.First come, first purrrved!
      </p>

      <button className="p-2 mb-8 font-bold text-xl rounded-4xl w-5/6 lg:w-1/2 bg-[#564BEB]">
        Mint
      </button>
    </div>
  );
}
