import { User } from "./user";

export interface Profile {
    username: string;
    displayName: string;
    image?: string;
    bio?: string;
    followersCount: number;
    followingCount: number;
    following: boolean;
    photos?: Photo[];
}

export class Profile implements Profile {
    constructor (user: User) {
        this.displayName = user.displayName;
        this.username = user.username;
        this.image = user.image;
    }
}

export interface Photo {
    id: string;
    url: string;
    isMain: boolean;
}


export class ProfileFormValues {
    bio?: string = undefined;
    displayName: string = '';
    username?: string = undefined;

    constructor(profile?: ProfileFormValues) {
      if (profile) {
        this.bio = profile.bio;
        this.displayName = profile.displayName;
        this.username = profile.username;
      }
    }
  }

  export interface UserActivity {
    id: string;
    title: string;
    category: string;
    date: Date; 
  }