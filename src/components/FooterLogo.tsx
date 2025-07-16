
import footerLeftCat from "../assets/footer-left-cat.png";
import footerRightCat from "../assets/footer-right-cat.png";
import footerLogo from "../assets/footer-logo.png";
import X from "../assets/X.png";

export function Footer() {

	return <div className="flex items-center justify-between">
		<img src={footerLeftCat} alt="Footer Left Cat" className="w-1/4" />

		<div className="flex flex-col items-center">
			<img src={footerLogo} alt="Footer Logo" className="w-1/4 mb-4" />
			<p className="text-white text-lg">xxxxxxxxxxxxxx</p>

			<img src={X} alt="Twitter Logo" className="h-8 w-8 mt-2" />

		</div>

		<img src={footerRightCat} alt="Footer Right Cat" className="w-1/4" />

	</div>

}