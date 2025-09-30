package myAlgorithms

type MyHashSet struct {
	data map[int]struct{}
}

func Constructor() MyHashSet {
	return MyHashSet{data: make(map[int]struct{})}
}

func (this *MyHashSet) Add(key int) {
	this.data[key] = struct{}{}
}

func (this *MyHashSet) Remove(key int) {
	delete(this.data, key)
}

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
