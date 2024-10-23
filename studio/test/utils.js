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

export async function createFromTemplate(id) {
    const [element] = getTemplateContent(id);
    document.querySelector('sp-theme').append(element);
    await element.updateComplete;
    return element;
}
