import {useState, useEffect, useRef} from 'react';
import {FadeInAnimation} from './animation.js';
// 使用intersectionObserver 观察者，实现背景颜色切换
function useBackGroundToggle(ref) {
  useEffect(() => {
    const div = ref.current;
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      console.log(entry);
      if (entry.isIntersecting) {
        // 使用!important确保样式优先级
        document.body.style.setProperty('background-color', 'yellow', 'important');
        document.body.style.setProperty('color', 'white', 'important');
      } else {
        document.body.style.setProperty('background-color', 'white', 'important');
        document.body.style.setProperty('color', 'black', 'important');
      }
    }, {
      threshold: 1.0
    });
    observer.observe(div);
    return () => {
      observer.disconnect();
      // 恢复默认颜色
      document.body.style.removeProperty('background-color');
      document.body.style.removeProperty('color');
    }
  }, [ref]);
}


function Welcome() {
	const ref = useRef(null);
	useBackGroundToggle(ref);
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
			<hr/>
			{show && <Welcome/>}
		</>
	);
}
