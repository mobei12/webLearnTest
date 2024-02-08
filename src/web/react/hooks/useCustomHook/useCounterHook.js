import { useState,useEffect } from 'react';
import store from '../../store';
export default function getCounter(defaultCount = 0) {
    const [count, setCount] = useState(defaultCount);
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setCount(store.getState().counter.count)
        })
        return () => {
            unsubscribe()
        }
    }, [])
    return count
}