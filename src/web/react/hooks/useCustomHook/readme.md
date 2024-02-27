# useCounterHook
## API
```typescript
const [current, {increment, decrement,set, reset}] = useCounterHook(initialValue, { min, max });
```
### Result

| 参数    | 说明         | 类型                                                   |
| ------- | ------------ | ------------------------------------------------------ |
| current | 当前值       | `number`                                               |
| increment     | 加，默认加 1 | `(delta?: number) => void`                             |
| decrement     | 减，默认减 1 | `(delta?: number) => void`                             |
| set     | 设置 current | `(value: number` \| `((c: number) => number)) => void` |
| reset   | 重置为默认值 | `() => void`                                           |

### Params

| 参数         | 说明   | 类型     | 默认值 |
| ------------ | ------ | -------- | ------ |
| initialValue | 默认值 | `number` | `0`    |
| min          | 最小值 | `number` | -      |
| max          | 最大值 | `number` | -      |
