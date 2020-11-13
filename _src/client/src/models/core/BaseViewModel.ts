export class BaseViewModel {
    toJSON () {
        return { ...this }
    }

    static make (data: any) {
        const model = new this;
        Object.keys(data).forEach(key => {
            model[key] = data[key];
        });
        return model;
    }
}
