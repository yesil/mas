import { makeObservable } from 'picosm';

class Fragment {
    path = '';
    hasChanges = false;
    status = '';

    fields = [];

    selected = false;

    /**
     * @param {*} AEM Fragment JSON object
     */
    constructor({
        id,
        etag,
        model,
        path,
        title,
        description,
        status,
        modified,
        tags,
        fields,
    }) {
        this.id = id;
        this.model = model;
        this.etag = etag;
        this.path = path;
        this.name = path.split('/').pop();
        this.title = title;
        this.description = description;
        this.status = status;
        this.modified = modified;
        this.tags = tags;
        this.fields = fields;
        this.updateOriginal();
    }

    get variant() {
        return this.fields.find((field) => field.name === 'variant')
            ?.values?.[0];
    }

    get fragmentName() {
        return this.path.split('/').pop();
    }

    get statusVariant() {
        if (this.hasChanges) return 'modified';
        return this.status === 'PUBLISHED' ? 'published' : 'draft';
    }

    updateOriginal() {
        this.original = null; // clear draft
        this.original = JSON.parse(JSON.stringify(this));
    }

    refreshFrom(fragmentData) {
        Object.assign(this, fragmentData);
        this.hasChanges = false;
        this.updateOriginal();
    }

    discardChanges() {
        this.refreshFrom(this.original);
    }

    toggleSelection(value) {
        if (value !== undefined) this.selected = value;
        else this.selected = !this.selected;
    }

    updateFieldInternal(fieldName, value) {
        this[fieldName] = value ?? '';
        this.hasChanges = true;
    }

    getField(fieldName) {
        return this.fields.find((field) => field.name === fieldName);
    }

    updateField(fieldName, value) {
        let change = false;
        const field = this.getField(fieldName);
        if (
            field.values.length === value.length &&
            field.values.every((v, index) => v === value[index])
        )
            return;
        field.values = value;
        this.hasChanges = true;
        change = true;
    }
}

const FragmentObservable = makeObservable(
    Fragment,
    ['discardChanges', 'updateField', 'updateFieldInternal', 'toggleSelection'],
    ['variant', 'fragmentName', 'statusVariant'],
);

export { FragmentObservable as Fragment };
