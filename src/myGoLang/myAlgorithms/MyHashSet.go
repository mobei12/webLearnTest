package myAlgorithms

/*
	我们定义了一个类型 MyHashSet，里面有一个字段 data。
data 的类型是 map[int]struct{}：
int 代表集合里存的元素（key）。
struct{} 是一个空结构体，占 0 字节，比用 bool 更节省内存。
这样就能模拟 集合 ——只关心某个元素在不在，不需要存具体的值。
*/
type MyHashSet struct {
	data map[int]struct{}
}

/* Constructor 返回一个新的 MyHashSet 实例。
make(map[int]struct{}) 创建一个空的 map。
最后用 {} 初始化结构体。 */
func Constructor() MyHashSet {
	return MyHashSet{data: make(map[int]struct{})}
}

/* 方法接收者是 *MyHashSet，因为要修改集合本身。
this.data[key] = struct{}{}
向 map 里放一个键为 key 的元素。
值是空结构体，不占空间。
如果 key 已经存在，直接覆盖，没关系（集合本来就不能重复）。 */
func (this *MyHashSet) Add(key int) {
	this.data[key] = struct{}{}
}

/* delete(map, key) 是 Go 的内置函数。
如果 key 存在，就删掉。
如果 key 不存在，什么也不会发生（不会报错） */
func (this *MyHashSet) Remove(key int) {
	delete(this.data, key)
}

/* this.data[key] 会返回两个值：
第一个是值（我们用不到，所以 _ 忽略）。
第二个是 ok，布尔值，表示这个键在不在 map 里。
return ok 就是返回是否存在。 */
func (this *MyHashSet) Contains(key int) bool {
	_, ok := this.data[key]
	return ok
}

/**
 * Your MyHashSet object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Add(key);
 * obj.Remove(key);
 * param_3 := obj.Contains(key);
 */
