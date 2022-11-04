export default class User {
    constructor(fields?: { userName?: string, firstName?: string, lastName?: string, email?: string, picture?: string }) {
        if (fields) {
            Object.assign(this, fields);
        }
    }

    userName!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    picture!: string;

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    get initials() {
        const firstNameInitial = this.firstName?.length >= 1 ? this.firstName.charAt(0).toUpperCase() : "";
        const lastNameInitial = this.lastName?.length >= 1 ? this.lastName.charAt(0).toLocaleUpperCase() : "";

        if (firstNameInitial && lastNameInitial) {
            return `${firstNameInitial}${lastNameInitial}`;
        }

        if (this.userName?.length >= 1) {
            return this.userName?.charAt(0).toUpperCase();
        }

        return "?";
    }
}