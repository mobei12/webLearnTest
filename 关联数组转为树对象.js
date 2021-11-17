var arr = [
	{ id: 1, parent_id: null },
	{ id: 2, parent_id: 1 },
	{ id: 3, parent_id: 1 },
	{ id: 4, parent_id: 2 },
	{ id: 5, parent_id: 4 }
];
[
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
];

/**
 *
 * @param {Array} arr
 *  return {Object}
 */
let returnO = (arr, parent_id = null, key = "parent_id") =>
	arr
		.filter(item => item[key] === parent_id)
		.map(item => ({
			...item,
			children: returnO(arr, item.id, key)
		}));

console.log(JSON.stringify(returnO(arr)));
