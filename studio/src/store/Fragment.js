import { action, makeObservable, observable } from 'mobx';

export class Fragment {
    path = '';
    type = '';
    model = {
        id: '',
        path: '',
    };
    hasChanges = false;

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
        });
        Object.assign(this, props);
    }

    updateField(fieldName, value) {
        this.fields
            .filter((field) => field.name === fieldName)
            .forEach((field) => {
                if (field.values === value) return;
                field.values = value;
                this.hasChanges = true;
            });
    }
}
