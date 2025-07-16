/** biome-ignore-all lint/style/useConst: <explanation> */
/** biome-ignore-all lint/complexity/useSimplifiedLogicExpression: <explanation> */
/** biome-ignore-all lint/style/noUselessElse: <explanation> */
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
/** biome-ignore-all lint/nursery/noSecrets: <explanation> */
/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
/** biome-ignore-all lint/style/useTemplate: <explanation> */
/** biome-ignore-all lint/style/useNamingConvention: <explanation> */
import Lottie from "lottie-react";
import animationData from "../assets/neko.json" with { type: "json" };
import { Button, Dropdown, Spin, type MenuProps, } from "antd";
import { useEffect, useMemo, useState, } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { nekoActor } from "canister/actor";
import type { LotteryStats, UserInfo } from "canister/service.did";
import { stringToUint8Array } from "utils";
import bs58 from "bs58";
import BackGround from "../assets/nekoweb_bg_header.png";
import mbBackGround from "../assets/mb-back-bg.png";
import dropdown from "../assets/dropdown.png";
import { Link } from "react-router";
import X from "../assets/X.png";
import logo from "../assets/logo.png";
import mbLogo from "../assets/mb-logo.png";
import { LogOut } from "react-feather";
import Marquee from 'react-fast-marquee'
import { GetWhiteList } from "components/WhiteList";
import { About } from "components/About";
import { Tokenomics } from "components/Tokenomics";
import { Footer } from "components/FooterLogo";
import { label } from "happy-dom/lib/PropertySymbol.js";
import { TWITTER } from "constant/media";

export function Home() {

	const { setVisible: setModalVisible } = useWalletModal();
	const { signMessage, publicKey } = useWallet();
	const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
	const [lotteryStats, setLotteryStats] = useState<LotteryStats | undefined>(undefined);

	useEffect(() => {
		if (!publicKey) {
			return;
		}

		nekoActor.get_user_info(
			publicKey.toBase58()
		).then((r) => {
			setUserInfo(r);
		}).catch((error) => {
			console.error("获取用户信息失败：", error);
		});

		nekoActor.get_lottery_stats().then((r) => {
			setLotteryStats(r);
		}).catch((error) => {
			console.error("获取抽奖统计信息失败：", error);
		});
	}, [publicKey])

	const showContent = useMemo(()=> {
		if (!userInfo || !lotteryStats) {
			return null;
		}

		if (lotteryStats.activity_active === false) {
			return "活动结束";
		} else if (userInfo.has_won) {
			return "恭喜你已经获奖！";
		} else if (Number(userInfo.last_draw_time) / 1_000_000 + 24 * 60 * 60 * 1000 > Date.now()) {
			let next_draw_date = new Date(Number(userInfo.last_draw_time) /1_000_000 + 24 * 60 * 60 * 1000);
			return `请等待 ${next_draw_date.toLocaleString()} 再抽奖`;
		} else {
			return "签到抽奖";
		}

	}, [userInfo, lotteryStats]);

	const checkIn = async () => {
		if (!publicKey) {
			setModalVisible(true);
			return;
		}
		if(!signMessage) {
			return 
		}

		try {

		let date = Date.now();
		let raw_msg = date.toString();
		let msg =  stringToUint8Array(raw_msg)
		let signature = await signMessage(msg);
	
		let sig58 = bs58.encode(signature);

		console.log(
			"签名结果：", 
			raw_msg,
			signature,
			sig58,
			// Buffer.from(signature).toString(),
		);

		let checkInResult = await nekoActor.daily_check_in({
			user_address: publicKey.toBase58(),
			signature: sig58,
			public_key: publicKey.toBase58(),
			message: "", // 这里的message不是签名验证的消息，是本来有个每日打卡用户留言功能, 
			timestamp: BigInt(date)
		})

		if ("Ok" in checkInResult) {
			alert("签到成功！" + JSON.stringify(checkInResult.Ok));
		} else {
			alert("签到失败：" + checkInResult.Err);
		}
		// refresh page
	  window.location.reload();

	} catch (error) {
	  	console.error("签到错误：", error);
	  	alert("签到失败，请稍后再试。错误:" + (error instanceof Error ? error.message : String(error)));
		}
	}


	return <div className="flex w-full flex-col items-center text-white">
		<HomeHeader />

	<Marquee className="w-full bg-[#DC790C]" gradient={false} speed={50}>
		  {Array.from({ length: 20 }).map((_, index) => (
			<p key={index} className="text-2xl font-bold text-white-400 mx-4">
				$NKEO
			</p>
		  ))}
	</Marquee>

	<div className="w-4/5 flex flex-col items-center">
		<GetWhiteList />
		<About />
		<Tokenomics />
		<Footer />
	</div>

		{/* <div className="flex w-md flex-col items-center rounded-lg border-2 border-amber-400 p-4">
			<div>
				<Lottie className="w-full" animationData={animationData} />
			</div>
			{
				userInfo 
				? 
					<Button className="m-4" disabled={showContent!=='签到抽奖'} onClick={checkIn}>
						<p className="font-bold text-2xl text-yellow-400">{showContent}</p>
						</Button> 
				:
					<Spin className="mt-4" size="large" /> 
			}
			{
				userInfo && <div className="mt-4 flex flex-col items-center border-1 p-2">
					<p className="mt-4">是否已经获奖: {userInfo.has_won?'是':'否'}</p>
					<p className="mt-4">次数: {userInfo.draw_count}</p>
					<p className="mt-4">上一次抽奖时间: {userInfo.last_draw_time}</p>
					<p className="mt-4">中奖概率: {userInfo.personal_probability}</p>
					</div>
			}
			{
				lotteryStats && <div className="mt-4 flex flex-col items-center border-1 p-2">
					<p>总抽奖次数: {lotteryStats.total_draws}</p>
					<p>活动是否开启: {lotteryStats.activity_active ? "是" : "否"}</p>
					<p>{`已经中奖${lotteryStats.current_winners}/总奖数${lotteryStats.max_winners}`}</p>
				</div>
			}
		</div> */}
	</div>
}

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Link to={TWITTER} target="_blank" >
				Twitter
			</Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link to="/">
				Articles
			</Link>
    )
  },
  {
    key: '3',
    label: (
      <Link to="/">
				Blog
			</Link>
    ),
  },
  
];

export function HomeHeader() {
	// const { publicKey, disconnect } = useWallet();
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

	return <div
	 style={{
				width: "100%",
        height: "800px",
        backgroundImage: `url(${isMobile?mbBackGround:BackGround})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    className="flex flex-col w-full justify-start items-start"
	>
		 <div className="mt-8 mb-4 flex w-full h-auto justify-between px-2 items-start">
        <Link to="/">
				{
					isMobile?
          <img src={mbLogo} alt="Logo" className="" />
					:
          <img src={logo} alt="Logo" className="mx-6 h-20" />
				}
        </Link>

				<Dropdown menu={{ items: items! }} >
					<img src={dropdown} alt="Dropdown Menu" className="h-8 w-8" />
				</Dropdown>

				{!isMobile && <RightMenu />}
      </div>

			<div className="lg:mt-50 lg:ml-50">
        <p className="text-8xl text-white font-bold mb-4">
          $NEKO
        </p>
        <p className="text-2xl text-white ml-2">
          Hold $NEKO, Hold fortune!
        </p>
      </div> 

      {/* <div className="mr-2 flex items-center">
        <WalletMultiButton />
        {publicKey && <LogOut onClick={()=>{disconnect()}} className="m-2 cursor-pointer text-white" />}
      </div> */}
		   

	</div>
}

function WhiteList() {

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
