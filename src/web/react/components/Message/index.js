import { createRoot } from 'react-dom/client'
import Message from "./index.js";
export default function directiveRender(props, callback) {
    const container = document.createElement('div');
    document.body.appendChild(container)
    open()
    function open() {
        const root = createRoot(container)
        root.render(<Message />)
    }
    function close() {
        root.unmount();
        container.remove();
        typeof callback === 'function' && callback()
    }
}