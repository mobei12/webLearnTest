import {render} from './render.js'
import {ref, reactive, createRefSet} from './refCe.js'
import {bindEvent} from './event.js'

export const createVue = (el, options) => {
	const target = document.querySelector(el)
	const {refs, methods} = options
	const nodes = target.querySelectorAll('*')
	const refSet = createRefSet(refs, nodes)
	render(refSet)
	bindEvent.apply(refs, [nodes, methods])
}
export {ref, reactive}
