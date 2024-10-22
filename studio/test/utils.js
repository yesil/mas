window.toggleTheme = () => {
    const theme = document.querySelector('sp-theme');
    theme.color = theme.color === 'dark' ? 'light' : 'dark';
};

export const getTemplateContent = (template) => {
    const templateEl = document.getElementById(template);
    // @ts-ignore
    const templateContent = templateEl.content.cloneNode(true);
    return [...templateContent.children];
};

export const delay = (ms = 0) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export function spTheme() {
    const theme = document.createElement('sp-theme');
    theme.color = 'light';
    theme.scale = 'medium';
    return theme;
}

export async function createFromTemplate(id, testName) {
    const [element] = getTemplateContent(id);
    const div = document.createElement('div');
    div.innerHTML = `<h2>${testName}</h2>`;
    div.append(element);
    document.querySelector('sp-theme').append(div);
    // add header to element.
    await element.updateComplete;
    return element;
}

const calculateCoordinates = (element, offsetX, offsetY) => {
    const rect = element.getBoundingClientRect();
    return {
        x: rect.left + (offsetX ?? rect.width / 2),
        y: rect.top + (offsetY ?? rect.height / 2),
        rect,
    };
};

const dispatchMouseEvent = (element, eventType, clientX, clientY) => {
    const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX,
        clientY,
    });
    element.dispatchEvent(event);
};

const setCursorPosition = (element, offsetX, rect) => {
    if (!element.isContentEditable) return;

    const textNode = element.firstChild;
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return;

    const charIndex = Math.floor(
        (offsetX / rect.width) * textNode.textContent.length,
    );

    const range = document.createRange();
    const selection = window.getSelection();

    range.setStart(textNode, charIndex);
    range.setEnd(textNode, charIndex);
    selection.removeAllRanges();
    selection.addRange(range);
};

export async function simulateClick(element, offsetX, offsetY) {
    if (!element) {
        throw new Error('Element must be provided.');
    }

    const { x, y, rect } = calculateCoordinates(element, offsetX, offsetY);
    dispatchMouseEvent(element, 'click', x, y);
    setCursorPosition(element, offsetX ?? rect.width / 2, rect);
    await delay(500);
}

export function selectWordsInTextNode(textNode, words) {
    const text = textNode.nodeValue;
    // Create regex pattern for all words with word boundaries
    const regex = new RegExp(words, 'gi');

    const ranges = [];
    let match;

    // Find all occurrences of any word
    while ((match = regex.exec(text)) !== null) {
        const range = document.createRange();
        range.setStart(textNode, match.index);
        range.setEnd(textNode, match.index + match[0].length);
        ranges.push(range);
    }

    if (ranges.length > 0) {
        const selection = window.getSelection();
        selection.removeAllRanges();

        // Add all ranges to the selection
        ranges.forEach((range) => selection.addRange(range));
        return true;
    }

    return false;
}
