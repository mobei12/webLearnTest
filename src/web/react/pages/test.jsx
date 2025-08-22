import { useState, useCallback } from "react";

const funcAlert = () => {
  const [val, setVal] = useState(0);
  const add = useCallback(() => {
    setTimeout(() => {
      alert(val);
    }, 3000);
  }, [val]);
  return (
    <section>
      <h3>val:{val}</h3>
      <button onClick={() => setVal(val + 1)}>add</button>
      <br />
      <br />
      <button onClick={() => add(val)}>alert</button>
      <br />
      <br />
      <button onClick={() => setVal(0)}>rest</button>
    </section>
  );
};
export default funcAlert;
