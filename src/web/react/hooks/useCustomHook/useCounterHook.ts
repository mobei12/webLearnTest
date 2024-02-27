import { useState } from 'react';
import { isNumber } from '../utils'
type TCounter = number
export type Options = {
    min?: TCounter
    max?: TCounter
}
export interface Actions {
    increment: (delta?: number) => void;
    decrement: (delta?: number) => void;
    set: (value: number | ((c: number) => number)) => void;
    reset: () => void;
}
export type ValueParam = number | ((c: number) => number);
function getTargetValue(val: number, options: Options = {}) {
    const { min, max } = options;
    let target = val;
    if (isNumber(max)) {
        target = Math.min(max, target);
    }
    if (isNumber(min)) {
        target = Math.max(min, target);
    }
    return target;
}
export default function getCounter(defaultCount: TCounter = 0, options: Options = {}) {
    const { min, max } = options
    const [count, setCount] = useState(() => {
        return getTargetValue(defaultCount, {
            min,
            max
        })
    });
    const setValue = (value: ValueParam) => {
        setCount((c) => {
            const target = isNumber(value) ? value : value(c);
            return getTargetValue(target, {
                max,
                min,
            });
        });
    };
    const increment = (val: number = 1) => {
        setValue((c) => c + val);
    }
    const decrement = (val: number = 1) => {
        setValue((c) => c - val);
    }
    const set = (val: ValueParam) => {
        setValue(val)
    }
    const reset = () => {
        setValue(defaultCount)
    }
    return [count, { increment, decrement, set, reset }]
}