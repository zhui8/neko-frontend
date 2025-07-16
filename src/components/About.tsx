import aboutCat from "../assets/about-cat.png";

export function About() {
  return (
    <div className="my-16 flex flex-col lg:flex-row items-center justify-center w-full text-white p-8">
      <h1 className="text-4xl font-bold mb-2 lg:hidden">About $NEKO</h1>
      <img className="w-[200px]" src={aboutCat} />

      <div className="w-4/5 flex flex-col items-start ml-8">
        <h1 className="text-2xl font-bold mb-2 hidden lg:block">About $NEKO</h1>
        <p className="my-2">
          $NEKO is not just a meme coin — it’s your blockchain lucky
          charm.Inspired by the iconic (Makeni Neko), $NEKO brings fortune, fun,
          and meme culture to Solana.  
        </p>
				<p className="my-2">
					It’s not you who found NEKO.
				</p>
				<p className="my-2">
					It’s luck… that found you.
				</p>
      </div>
    </div>
  );
}
