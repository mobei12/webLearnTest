# useCounterHook


## 使用方式

```jsx
import { useCounterHook } from './hooks/useCustomHook';

function MyComponent() {
  const count = useCounterHook(0);

  // Your component logic here

  return (
    // Your JSX here
  );
}
