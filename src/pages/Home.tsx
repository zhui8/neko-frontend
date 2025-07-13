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
import { Button, Spin, } from "antd";
import { useEffect, useMemo, useState, } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { nekoActor } from "canister/actor";
import type { LotteryStats, UserInfo } from "canister/service.did";
import { stringToUint8Array } from "utils";
import bs58 from "bs58";



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


	return <div className="flex h-screen w-full flex-col items-center text-white">
		<div className="flex w-md flex-col items-center rounded-lg border-2 border-amber-400 p-4">
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
		</div>
	</div>
}