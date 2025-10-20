/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

function updateClock() {
	const now = new Date();
	
	// Update clock hands
	const hours = now.getHours();
	const minutes = now.getMinutes();
	const seconds = now.getSeconds();
	
	const hourDegrees = ((hours % 12) * 30) + (minutes * 0.5);
	const minuteDegrees = (minutes * 6) + (seconds * 0.1);
	const secondDegrees = seconds * 6;
	
	const hourHand = document.getElementById('hour-hand');
	const minuteHand = document.getElementById('minute-hand');
	const secondHand = document.getElementById('second-hand');
	
	if (hourHand) hourHand.style.transform = `rotate(${hourDegrees}deg)`;
	if (minuteHand) minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
	if (secondHand) secondHand.style.transform = `rotate(${secondDegrees}deg)`;
	
	// Update countdown to Halloween
	const currentYear = now.getFullYear();
	const halloween = new Date(currentYear, 9, 31, 23, 59, 59); // October is month 9
	
	// If Halloween has passed this year, calculate for next year
	if (now > halloween) {
		halloween.setFullYear(currentYear + 1);
	}
	
	const diff = halloween - now;
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours24 = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	const secs = Math.floor((diff % (1000 * 60)) / 1000);
	
	const daysValue = document.getElementById('days-value');
	const hoursValue = document.getElementById('hours-value');
	const minutesValue = document.getElementById('minutes-value');
	const secondsValue = document.getElementById('seconds-value');
	
	if (daysValue) daysValue.textContent = String(days).padStart(2, '0');
	if (hoursValue) hoursValue.textContent = String(hours24).padStart(2, '0');
	if (minutesValue) minutesValue.textContent = String(mins).padStart(2, '0');
	if (secondsValue) secondsValue.textContent = String(secs).padStart(2, '0');
}

// Update clock immediately and then every second
updateClock();
setInterval(updateClock, 1000);
