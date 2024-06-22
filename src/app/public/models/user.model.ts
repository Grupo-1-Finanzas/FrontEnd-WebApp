export class UserModel{
    id: string;
    email: string;
    password: string;
    name: string;
    birth: string;
    user: string;

    constructor(id: string, email: string, password: string, name: string, birth: string, user: string) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.birth = birth;
        this.user = user;
    }
}
