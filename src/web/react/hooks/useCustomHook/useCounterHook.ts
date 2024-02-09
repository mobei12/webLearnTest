import { useState,useEffect } from 'react';
import store from '../../store';
type TCounter =  number
export default function getCounter(defaultCount:TCounter = 0):TCounter {
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