import { action, makeObservable, observable } from 'mobx';

export class Fragment {
    path = '';
    type = '';
    model = {
        id: '',
        path: '',
    };
    hasChanges = false;
    isSelected = false;
    status = '';

    fields = [];

    /**
     * @param {Object} props - common properties of a fragment as a search result
     * @param {string} props.path - cf path
     * @param {string} props.type - merch web component type (e.g: merch-card)
     * @param {Object} props.model - cf model
     * @param {string} props.model.id - cf model id
     * @param {string} props.model.path - cf model path
     * @param {Object[]} props.fields - cf fields
     */
    constructor(props) {
        makeObservable(this, {
            hasChanges: observable,
            updateField: action,
            isSelected: observable,
        });
        Object.assign(this, props);
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

    select() {
        this.isSelected = true;
        this.hasChanges = false;
    }

    unselect() {
        this.isSelected = false;
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
}
