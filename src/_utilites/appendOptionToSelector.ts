const appendOptionToSelector = (selector: HTMLElement, optionValue: string): void => {

    let elem: HTMLElement = document.createElement('option');
    elem.innerText = `${optionValue}`;
    selector.append(elem);
}

export default appendOptionToSelector;
