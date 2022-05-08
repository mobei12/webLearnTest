const nodes = {
	name: 'test',
	children: [
		{
			name: 'child1',
			children: [
				{
					name: 'child1.1',
					children: [
						{
							name: 'child1.1.1',
							children: []
						},
						{
							name: 'child1.1.2',
							children: []
						}
					]
				},
				{
					name: 'child1.2',
					children: []
				}
			]
		},
		{
			name: 'child2',
			children: []
		}
	]
};
// 深度优先遍历的非递归写法
function deepTraversal(node) {
	let nodes = [];
	if (node) {
		let stack = [];
		// 同时存放将来要访问的节点
		stack.push(node);
		while (stack.length) {
			let item = stack.pop();
			// 正在访问的节点
			nodes.push(item.name);
			let children = item.children ? item.children : [];
			for (let i = children.length - 1; i >= 0; i--) {
				// 将现在访问的节点的子节点存入 stack，供将来访问
				stack.push(children[i]);
			}
		}
	}
	return nodes.join(',');
}
const nodelist = [];
function wideTraversal(node) {
	if (node) {
		let queue = [];
		queue.unshift(node);
		while (queue && queue.length) {
			let item = queue.shift();
			nodelist.push(item.name);
			let children = item.children;
			if (children) {
				for (i = 0; i < children.length; i++) {
					queue.push(children[i]);
				}
			}
		}
	}
	return nodelist;
}
console.log(wideTraversal(nodes));
console.log(deepTraversal(nodes));
