export class ContactModel {
    constructor(
        public name: string,
        public lastname: string,
        public email: string,
        public phone: string,
        public businessName: string,
        public RUC: string,
        public categories: string,
        public products: string,
        public comment: string,
    ) { }
}
