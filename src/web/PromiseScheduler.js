class PromiseScheduler {
  MaxTask = 3;
  implementation = 0;
  taskQueue = [];
  constructor(maxTask = 3) {
    this.MaxTask = maxTask;
  }
  addTask(fn) {
    return new Promise((res, rej) => {
      const run = () => {
        this.implementation++;
        fn()
          .then(res, rej)
          .finally(() => {
            this.implementation--;
            if (this.taskQueue.length > 0) {
             const next = this.taskQueue.shift();
              next && next();
            }
          });
      };
      if (this.implementation < this.MaxTask) {
        run();
      } else {
        this.taskQueue.push(run);
      }
    });
  }
}

const scheduler = new PromiseScheduler(2);
const timeout = (time = 2000) =>
  new Promise((resolve) => setTimeout(resolve, time));
scheduler.addTask(() => timeout(1000).then(() => console.log(1)));
scheduler.addTask(() => timeout(500).then(() => console.log(2)));
scheduler.addTask(() => timeout(300).then(() => console.log(3)));
scheduler.addTask(() => timeout(400).then(() => console.log(4)));
