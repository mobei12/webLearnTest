/**
 * 给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点 。
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
	if (!head) return null;
	let dummy = new ListNode(0, head);
	let cur = dummy;
	while (cur.next) {
		if (cur.next.val === val) {
			cur.next = cur.next.next;
		} else {
			cur = cur.next;
		}
	}
	return dummy.next;
};
console.log(removeElements([1, 2, 6, 3, 4, 5, 6], 6));
/*--------*/
/**给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
	let cur = head,
		pro = null;
	while (cur) {
		let next = cur.next;
		cur.next = pro;
		pro = cur;
		cur = next;
	}
	return pro;
};
