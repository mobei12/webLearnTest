import { InputNumber, Button } from 'antd'
import { useEffect,useState } from 'react'
import Info from './info'
import { useCounterHook } from '../../hooks/useCustomHook'
import store from '../../store'
const intermittentTimer = () => {
    const [time, { set:setTime, reset:resetTime }] = useCounterHook(10,{min:1})
    const [restTime, { set:setRestTime, reset:resetRest }] = useCounterHook(10,{min:0})
    const {dispatch,getState} = store
    const [status, setStatus] = useState(getState().intermittentTimer.status);
    const confirm = () => {
        dispatch({type:'START',payload:{timerNumber:time,restNumber:restTime}})
    }
    const cancel = () => {
        dispatch({ type: 'STOP' })
    }
    const isDisable = () => {
        return status === 'ING';
    }
    useEffect(()=>{
        const unsubscribe = store.subscribe(() => {
            const { status } = store.getState().intermittentTimer;
            setStatus(status);
        });

        return () => {
            unsubscribe();
        };
    },[])
    return (
        <div>
            {/* <Info user_id={123}/> */}
            <div className="count-down">当前状态：{status}</div>
            <div className="set-time" style={{marginTop:'10px',display:"flex",gap:'10px'}}>
                <span>时间设置(分)：</span>
                <InputNumber disabled={isDisable()} value={time} onChange={e => { setTime(e) }} />
                <Button disabled={isDisable()} onClick={resetTime} >重置</Button>
            </div>
            <div className="rest-time" style={{marginTop:'10px',display:"flex",gap:'10px'}}>
            <span>间隔时间设置(秒)：</span>
                <InputNumber disabled={isDisable()} value={restTime} onChange={e => { setRestTime(e) }} />
                <Button disabled={isDisable()} onClick={resetRest} >重置</Button>
            </div>
            <div style={{marginTop:'10px',display:"flex",gap:'10px'}}>
                <Button disabled={isDisable()} type="primary" onClick={confirm}>确定</Button>
                <Button disabled={status === 'OFF'} onClick={cancel}>取消</Button>
            </div>
        </div>
    )
}
export default intermittentTimer