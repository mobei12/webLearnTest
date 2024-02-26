import HTTP from '../../httpUtils'
const info =(props)=> {
    const {user_id} = props
  return (
    <div>
    <HTTP.GET url={`http://localhost:8000/123?user_id=${user_id}`}  loading={
                <span>获取数据中！</span>
            } error={
                <span>没得到信息！！</span>
            }>
        {
            (data)=>{
                console.log(data)
            }
        }
    </HTTP.GET>
    </div>
  )
}

export default info