import { User } from "./user";

export interface Profile {
    username: string;
    displayName: string;
    image?: string;
    bio?: string;
}

export class Profile implements Profile {
    constructor (user: User) {
        this.displayName = user.displayName;
        this.username = user.username;
        this.image = user.image;
    }
}