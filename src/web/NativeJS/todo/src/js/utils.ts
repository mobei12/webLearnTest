export function findParent(target: HTMLElement, className: string): HTMLElement {
    while (target) {
        if (target.className === className) {
            return target;
        }
        target = target.parentNode as HTMLElement;
    }
    return null;
}
export function creatItem(tagName:string,className:string,content:string):HTMLElement{
    const oItem:HTMLElement = document.createElement(tagName);
    oItem.className = className;
    oItem.innerHTML = content;
    return oItem;
}