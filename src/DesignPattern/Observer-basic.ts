/** 观察者接口 */
interface ObserverBasic {
	update: (subject: Subject) => void;
}
interface Subject {
	attach: (observer: ObserverBasic) => void; //附加
	detach: (observer: ObserverBasic) => void; //删除
	notify: () => void; //通知
}

class ConcreteSubject implements Subject {
	private observers: ObserverBasic[] = [];
	public state: number;
	attach(observer: ObserverBasic): void {
		const observerIndex = this.observers.indexOf(observer);
		if (observerIndex !== -1) {
			return console.log('该观察者已经被添加');
		} else {
			console.log('添加观察者');
			this.observers.push(observer);
		}
	}
	detach(observer: ObserverBasic): void {
		const observerIndex = this.observers.indexOf(observer);
		if (observerIndex === -1) {
			return console.log('该观察者没有被添加');
		} else {
			console.log('删除观察者');
			this.observers.splice(observerIndex, 1);
		}
	}
	notify(): void {
		console.log('通知所有观察者');
		for (const observer of this.observers) {
			observer.update(this);
		}
	}
	// 业务逻辑方法，用来在状态改变时调用notify方法
	public someBusinessLogic(state?: number): void {
		this.state = state || Math.floor(Math.random() * (10 + 1));
		console.log(`状态值被改变成了: ${this.state}`);
		this.notify();
	}
}

/**
 * 观察者实现
 */
class ConcreteObserver implements ObserverBasic {
	update(subject: Subject): void {
		console.log('ConcreteObserver 更新');
		if (subject instanceof ConcreteSubject && subject.state < 3) {
			console.log('ConcreteObserver: Reacted to the event.');
		}
	}
}
// 客户端代码
const subject = new ConcreteSubject();
const observer1 = new ConcreteObserver();
subject.attach(observer1); //添加观察者
subject.attach(observer1); //该观察者已经被添加
subject.someBusinessLogic(2);
/*
状态值被改变成了: 2
通知所有观察者
ConcreteObserver 更新
ConcreteObserver: Reacted to the event.
*/
