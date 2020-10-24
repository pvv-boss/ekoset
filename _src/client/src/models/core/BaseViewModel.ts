export class BaseViewModel {
    toJSON() {
        return Object.getOwnPropertyNames(this).reduce((a, b) => {
            a[b] = this[b];
            return a;
        }, {});
    }

    static make(data: any) {
        const model = new this;

        Object.keys(data).forEach(key => {
            model[key] = data[key];
        });

        return model;
    }
}
