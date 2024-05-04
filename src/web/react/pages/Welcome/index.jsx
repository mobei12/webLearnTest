import { useState, useEffect, useRef } from 'react';
import { FadeInAnimation } from './animation.js';

function Welcome() {
	const ref = useRef(null);
	useEffect(() => {
		const div = ref.current;
		const observer = new IntersectionObserver(entries => {
			const entry = entries[0];
			if (entry.isIntersecting) {
				document.body.style.backgroundColor = 'black';
				document.body.style.color = 'white';
			} else {
				document.body.style.backgroundColor = 'white';
				document.body.style.color = 'black';
			}
		console.log(entry)

		}, {
			threshold: 1.0
		});
		observer.observe(div);
		return () => {
			observer.disconnect();
		}
	}, []);
	useEffect(() => {
		const animation = new FadeInAnimation(ref.current);
		animation.start(2000);
		return () => {
			animation.stop();
		};
	}, []);

	return (
		<h1
			ref={ref}
			style={{
				opacity: 0,
				padding: 50,
				textAlign: 'center',
				fontSize: 50,
				backgroundImage: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)'
			}}
		>
			Welcome
		</h1>
	);
}

export default function Main() {
	const [show, setShow] = useState(false);
	return (
		<>
			<button onClick={() => setShow(!show)}>
				{show ? 'Remove' : 'Show'}
			</button>
			<hr />
			{show && <Welcome />}
		</>
	);
}