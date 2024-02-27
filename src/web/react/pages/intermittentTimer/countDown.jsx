
export default function countDown(props) {
    const {status,time,restTime,restNumber} = props
  return (
    <div>{status} {time} {restTime} {restNumber}</div>
  )
}
