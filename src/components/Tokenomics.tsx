
import tokenomicsBg from '../assets/tokenomics-bg.png';

export function Tokenomics() {

	return <div 
	 style={{
        backgroundImage: `url(${tokenomicsBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
	className="w-full my-16 flex flex-col items-center justify-center"
	>
		<p className="font-bold text-2xl">Tokenomics</p>

		<p className='font-bold text-2xl my-2'>1,000,000,000</p>
		<p>Token Supply</p>
	</div>

}