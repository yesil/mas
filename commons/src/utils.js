/**
 * Helper function to create an element with attributes
 * @param {string} tag
 * @param {Object} attributes
 * @param {*} innerHTML
 * @returns {HTMLElement}
 */
export function createTag(tag, attributes = {}, innerHTML) {
    const element = document.createElement(tag);
    element.innerHTML = innerHTML;

    // Set attributes
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
    return element;
}
