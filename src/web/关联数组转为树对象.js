var arr = [
	{ id: 1, parent_id: null },
	{ id: 2, parent_id: 1 },
	{ id: 3, parent_id: 1 },
	{ id: 4, parent_id: 2 },
	{ id: 5, parent_id: 4 }
]
;[
	{
		id: 1,
		parent_id: null,
		children: [
			{
				children: [
					{
						children: [{ children: [], id: 5, parent_id: 4 }],
						id: 4,
						parent_id: 2
					}
				],
				id: 2,
				parent_id: 1
			},
			{ children: [], id: 3, parent_id: 1 }
		]
	}
]

/**
 *
 * @param {Array} arr
 * @param {String} parent_id
 * @param {String} key
 *  return {Object}
 */
let returnO = (arr, parent_id = null, key = 'parent_id') =>
	arr
		.filter(item => item[key] === parent_id)
		.map(item => ({
			...item,
			children: returnO(arr, item.id, key)
		}))
function arrayToTree(items) {
	const result = [] // 存放结果集
	const itemMap = {} //
	for (const item of items) {
		const { id, parent_id } = item
		if (!itemMap[id]) {
			itemMap[id] = {
				children: []
			}
		}
		itemMap[id] = {
			...item,
			children: itemMap[id]['children']
		}
		const treeItem = itemMap[id]

		if (parent_id === null) {
			result.push(treeItem) //用引用地址建立链接
		} else {
			if (!itemMap[parent_id]) {
				itemMap[parent_id] = {
					children: []
				}
			}
			itemMap[parent_id].children.push(treeItem)
		}
	}
	return result
}
console.log(JSON.stringify(returnO(arr)))
