import HTTP from './httpUtils/index'
const showList = () => {
    const dataOperate = (data) => {
        return data
    }
    return (
        <div className='show-list' >
            <HTTP.GET url='http://localhost:8000/api/user/getUserList' delay={1000} loading={
                <span>loading 一下</span>
            } error={
                <span>出错了！</span>
            }>
                {
                    (data) => {
                        return data.map(item => (<span key={item._id}>{item.username}</span>))
                    }
                }
            </HTTP.GET>
            <hr/>
            <HTTP.POST url='http://localhost:8000/api/rss/getFeedListByURL' dataOperate={dataOperate} condition={{ name: 123 }} delay={1000} loading={
                <span>loading 一下</span>
            } error={
                <span>出错了！</span>
            }>
                {
                    (data) => {
                        return data.map(item => (<span key={item._id}>{item.username}</span>))
                    }
                }
            </HTTP.POST>
        </div>
    )
}
export default showList