export class Fragment {
    path = '';
    hasChanges = false;
    isSelected = false;
    status = '';

    fields = [];

    constructor({ id, model, path, title, status, modified, fields }) {
        this.id = id;
        this.model = model;
        this.path = path;
        this.name = path.split('/').pop();
        this.title = title;
        this.status = status;
        this.modified = modified;
        this.fields = fields;
    }

    get variant() {
        return this.fields.find((field) => field.name === 'variant')
            ?.values?.[0];
    }

    get fragmentName() {
        return this.path.split('/').pop();
    }

    get statusVariant() {
        if (this.hasChanges) return 'yellow';
        return this.status === 'PUBLISHED' ? 'positive' : 'info';
    }

    select() {
        this.isSelected = true;
    }

    toggleSelect() {
        this.isSelected = !this.isSelected;
    }

    unselect() {
        this.isSelected = false;
    }

    updateField(fieldName, value) {
        let change = false;
        this.fields
            .filter((field) => field.name === fieldName)
            .forEach((field) => {
                if (
                    field.values.length === value.length &&
                    field.values.every((v, index) => v === value[index])
                )
                    return;
                field.values = value;
                this.hasChanges = true;
                change = true;
            });
        return change;
    }
}
