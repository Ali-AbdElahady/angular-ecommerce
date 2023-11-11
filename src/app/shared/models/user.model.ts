export class User {
    constructor(
        public address: {
            city: string,
            street: string,
            number: number
        },
        public username:string,
        public password:string,
        public email: string,
        public phone:string,
        public name:{
          firstname:string,
          lastname:string
        },
        public role:string,
        public id: any,
        public token:string) { }
}
