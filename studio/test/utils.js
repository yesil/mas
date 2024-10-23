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
    await delay(500);
    return element;
}

/**
 * Calculate coordinates for mouse events based on element and offsets.
 * @param {HTMLElement} element - The target HTML element.
 * @param {number} [offsetX] - Offset from the left of the element.
 * @param {number} [offsetY] - Offset from the top of the element.
 * @returns {{x: number, y: number, rect: DOMRect}} Calculated coordinates and element rect.
 */
const calculateCoordinates = (element, offsetX, offsetY) => {
    const rect = element.getBoundingClientRect();
    return {
        x: rect.left + (offsetX ?? rect.width / 2),
        y: rect.top + (offsetY ?? rect.height / 2),
        rect,
    };
};

/**
 * Create and dispatch a mouse event.
 * @param {HTMLElement} element - The target HTML element.
 * @param {string} eventType - Type of mouse event (e.g., 'click', 'mousedown').
 * @param {number} clientX - X coordinate for the event.
 * @param {number} clientY - Y coordinate for the event.
 */
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

/**
 * Set cursor position in a content-editable element.
 * @param {HTMLElement} element - The content-editable element.
 * @param {number} offsetX - Offset from the left to place cursor.
 * @param {DOMRect} rect - Element's bounding rectangle.
 */
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

/**
 * Simulate a click on a specified element at a given offset and place the cursor.
 * @param {HTMLElement} element - The HTML element to be clicked.
 * @param {number} [offsetX] - The offset from the left of the element to click at.
 * @param {number} [offsetY] - The offset from the top of the element to click at.
 */
export async function simulateClick(element, offsetX, offsetY) {
    if (!element) {
        throw new Error('Element must be provided.');
    }

    const { x, y, rect } = calculateCoordinates(element, offsetX, offsetY);
    dispatchMouseEvent(element, 'click', x, y);
    setCursorPosition(element, offsetX ?? rect.width / 2, rect);
    await delay(500);
}

/**
 * Simulate text selection in a content-editable element.
 * @param {HTMLElement} element - The element to select text in.
 * @param {number} startOffset - Starting offset for selection.
 * @param {number} endOffset - Ending offset for selection.
 */
export async function simulateSelection(element, startOffset, endOffset) {
    if (!element) {
        throw new Error('Element must be provided.');
    }

    const {
        x: startX,
        y: startY,
        rect,
    } = calculateCoordinates(element, startOffset);
    const { x: endX, y: endY } = calculateCoordinates(element, endOffset);

    // Simulate mouse selection sequence
    dispatchMouseEvent(element, 'mousedown', startX, startY);
    dispatchMouseEvent(element, 'mousemove', endX, endY + 8);
    dispatchMouseEvent(element, 'mouseup', endX, endY + 8);

    // Set the text selection
    if (element.isContentEditable) {
        const textNode = element.firstChild;
        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
            const startCharIndex = Math.floor(
                (startOffset / rect.width) * textNode.textContent.length,
            );
            const endCharIndex = Math.floor(
                (endOffset / rect.width) * textNode.textContent.length,
            );

            const range = document.createRange();
            const selection = window.getSelection();

            range.setStart(textNode, startCharIndex);
            range.setEnd(textNode, endCharIndex);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    await delay(500);
}
