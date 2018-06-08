export class ContactModel {
    constructor(
        public name: string,
        public lastname: string,
        public email: string,
        public phone: string,
        public businessName: string,
        public RUC: string,
        public hotel: boolean,
        public restaurante: boolean,
        public catering: boolean,
        public otro: boolean,
        public frutas: boolean,
        public verduras: boolean,
        public abarrotes: boolean,
        public bebidas: boolean,
        public all: boolean,
        public otros: boolean,
        public comment: string,
    ) { }
}
