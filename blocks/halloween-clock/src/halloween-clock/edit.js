/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { useState, useEffect } from '@wordpress/element';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {
	const [currentTime, setCurrentTime] = useState(new Date());
	const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

	useEffect(() => {
		const timer = setInterval(() => {
			const now = new Date();
			setCurrentTime(now);

			// Calculate countdown to Halloween (October 31)
			const currentYear = now.getFullYear();
			const halloween = new Date(currentYear, 9, 31, 23, 59, 59); // October is month 9
			
			// If Halloween has passed this year, calculate for next year
			if (now > halloween) {
				halloween.setFullYear(currentYear + 1);
			}

			const diff = halloween - now;
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));
			const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((diff % (1000 * 60)) / 1000);

			setCountdown({ days, hours, minutes, seconds });
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const hours = currentTime.getHours();
	const minutes = currentTime.getMinutes();
	const seconds = currentTime.getSeconds();

	const hourDegrees = ((hours % 12) * 30) + (minutes * 0.5);
	const minuteDegrees = (minutes * 6) + (seconds * 0.1);
	const secondDegrees = seconds * 6;

	const markers = ['🎃', '👻', '🦇', '🕸️', '🕷️', '🧟‍♂️', '🧛‍♂️', '🧙‍♀️', '💀', '☠️', '🍬', '🍭'];

	return (
		<div { ...useBlockProps() }>
			<time className="halloween-clock">
				<section className="stage">
					<figure className="clock">
						<svg fill="#000000" width="100%" height="100%" viewBox="0 0 14 14" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
							<path d="m 8.0382,2.785973 c -6e-4,0 -8e-4,-2e-4 -0.0012,-4e-4 -0.305,-0.0834 -0.18,-0.5158 0.319,-1.023 l -0.0018,-10e-4 c 0.0782,-0.0966 -0.1008,-0.3068 -0.4374,-0.498 -0.3708,-0.2106 -0.7894,-0.31680002 -0.9344,-0.237 -0.0072,0.0042 -0.01,0.0102 -0.0154,0.0144 l -0.003,-0.0014 c -0.7486,0.6312 -0.886,1.5444 -0.9088,1.7672 C 3.3886,2.393373 1,4.407773 1,8.113173 c 0,3.2148 4.1868,4.8868 6,4.8868 1.8132,0 6,-1.672 6,-4.8868 0,-3.6468 -2.1214,-5.7854 -4.9618,-5.3272 m 1.0586,3.7282 c 0.2258,-0.0726 2.448,-1.0888 2.448,-0.7904 0,0.351 -1.2172,2.1728 -2.1234,2.4552 -0.2872,0.0894 -1.3774,-0.7804 -1.1632,-1.8376 0.0544,-0.267 0.529,0.2728 0.8386,0.1728 m -1.4222,-4.8246 c 0.1304,0.0532 0.2562,0.0902 0.3652,0.11 -0.2622,0.3606 -0.4438,0.8748 -0.2926,1.013 0.186,0.1698 0.575,0.3882 0.6914,0.4788 0.116,0.0904 -0.5472,0.1128 -0.8188,0.3958 2e-4,2e-4 -0.6714,-1.1174 0.0548,-1.9976 M 7,7.246373 c 0.2344,0 1.1426,0.409 1.1426,1.0864 0,0.6776 -0.5114,0.0686 -1.1426,0.0686 -0.6308,0 -1.1422,0.609 -1.1422,-0.0686 0,-0.6774 0.9078,-1.0864 1.1422,-1.0864 m -0.9476,-4.3204 c 0.0598,0.417 -0.352,0.773 -0.352,0.773 -0.007,-0.2728 -0.2722,-0.4366 -0.2722,-0.4366 0.1846,-0.1964 0.6242,-0.3364 0.6242,-0.3364 m -1.1488,3.5882 c 0.3098,0.1 0.7844,-0.4398 0.8382,-0.1728 0.214,1.0572 -0.8762,1.9272 -1.1628,1.8376 -0.9064,-0.2824 -2.1232,-2.1042 -2.1232,-2.4552 0,-0.2984 2.222,0.7178 2.4478,0.7904 m 6.1664,3.8782 -0.6984,-0.3958 -0.4442,1.1374 -0.73,-0.7166 -0.5714,1.3594 -1.4918,-1.063 -0.7618,0.915 -0.825,-0.964 -1.2696,0.4694 -0.739,-1.3026 -0.9532,0.4224 -0.6246,-2.556 0.9582,1.5996 0.9332,-0.4942 0.584,1.1192 1.05,-0.6082 0.8566,1.1538 0.807,-1.1044 0.9878,0.7418 0.6032,-0.8668 0.9286,0.4986 0.5512,-1.0326 0.6504,0.6758 1.4684,-1.6824 -1.2696,2.6942" />
						</svg>

						<ul className="clock-face">
							<li className="hand hour" style={{ transform: `rotate(${hourDegrees}deg)` }}></li>
							<li className="hand minute" style={{ transform: `rotate(${minuteDegrees}deg)` }}></li>
							<li className="hand second" style={{ transform: `rotate(${secondDegrees}deg)` }}></li>
							<li className="pivot"></li>
							{markers.map((marker, index) => (
								<li key={index} className="marker" data-index={index + 1}>{marker}</li>
							))}
						</ul>
					</figure>

					<ul className="countdown-container">
						<li className="countdown-item">
							<figure className="circle" id="days-ring">
								<figcaption className="inner">
									<time className="number">{String(countdown.days).padStart(2, '0')}</time>
									<em className="label">D<span>AYS</span></em>
								</figcaption>
							</figure>
						</li>

						<li className="countdown-item">
							<figure className="circle" id="hours-ring">
								<figcaption className="inner">
									<time className="number">{String(countdown.hours).padStart(2, '0')}</time>
									<em className="label">H<span>OURS</span></em>
								</figcaption>
							</figure>
						</li>

						<li className="countdown-item">
							<figure className="circle" id="minutes-ring">
								<figcaption className="inner">
									<time className="number">{String(countdown.minutes).padStart(2, '0')}</time>
									<em className="label">M<span>INUTES</span></em>
								</figcaption>
							</figure>
						</li>

						<li className="countdown-item">
							<figure className="circle" id="seconds-ring">
								<figcaption className="inner">
									<time className="number">{String(countdown.seconds).padStart(2, '0')}</time>
									<em className="label">S<span>ECONDS</span></em>
								</figcaption>
							</figure>
						</li>
					</ul>
				</section>
			</time>
		</div>
	);
}
