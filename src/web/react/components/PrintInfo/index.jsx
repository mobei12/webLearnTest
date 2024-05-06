
const PrintInfo = ({ info }) => {
	const [displayText, setDisplayText] = useState('');
	useEffect(() => {
		let currentIndex = 0;
		let animationFrameId=null;
		const printStr = () => {
			if (currentIndex < info.length) {
				setDisplayText(info.substr(0, currentIndex + 1));
				currentIndex += 1;
				animationFrameId = requestAnimationFrame(printStr);
			} else {
				cancelAnimationFrame(animationFrameId);
			}
		};
		animationFrameId = requestAnimationFrame(printStr);
		printStr();
		return () => {
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
			}
		}
	}, [info]);
	return (
		<span >{displayText}</span>
	)
}