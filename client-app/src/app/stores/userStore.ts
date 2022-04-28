import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;
    refreshTokenTimeout: any;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            runInAction(() => {
                store.profileStore.profile = null;
                store.activityStore.activityRegistry = new Map<string, Activity>();
                store.commonStore.setToken(user.token);
                this.startRefreshTokenTimer(user)
                this.user = user;
            })
            history.push('/activities')
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/')
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user)
        } catch(err) {
            console.log(err);
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            runInAction(() => {
                store.commonStore.setToken(user.token);
                this.startRefreshTokenTimer(user)
                this.user = user;
            })
            history.push('/activities')
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    setImage = (image: string) => {
        if (this.user) {
            this.user.image = image;
        }
    }

    refreshToken = async () => {
        this.stopRefreshTokenTimer();
        try {
            const user = await agent.Account.refreshToken();
            runInAction(() => this.user = user)
            store.commonStore.setToken(user.token)
            this.startRefreshTokenTimer(user)
        } catch (err) {
            console.log(err)
        }
    }

    private startRefreshTokenTimer(user: User) {
        const jwtToken = JSON.parse(atob(user.token.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60*1000);
        this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
    }
    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout)
    }
}