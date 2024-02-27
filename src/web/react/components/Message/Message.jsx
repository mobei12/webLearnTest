
export default function Message() {
    const {close} = props
  return (
    <div>
      <h1>Message</h1>
      <button onClick={close}></button>
    </div>
  )
}
