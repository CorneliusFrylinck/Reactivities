import { makeAutoObservable, runInAction } from "mobx";
import ts from "typescript";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from 'uuid'

export default class ActivityStore {
    activityRegistry = new Map <string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;
    deleteItemId: string | undefined = undefined;


    constructor () {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => 
                    Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async () => {
        try {
            const activities = await agent.Activities.list();
            activities.forEach( activity => {
                this.setActivity(activity);
                this.setLoadingInitial(false);
            })
        }catch (err) {
            console.log(err);
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id); //await agent.Activities.details(id);
        if(activity) {
            this.selectedActivity = activity;
        }else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                this.setLoadingInitial(false);
            }catch(err) {
                console.log(err);
                this.setLoadingInitial(false);
            }
        }
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }

    deleteActivity = async (id: string) => {
        this.deleteItemId = id;
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id)
                if (this.selectedActivity?.id === id) {
                    this.selectedActivity = undefined;
                    this.editMode = false;
                } 
                this.deleteItemId = undefined;
                this.loading = false;
            })
        }catch (err) {
            console.log(err);
            runInAction(() => {
                this.loading = false;
                this.deleteItemId = undefined;
            })
        }
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }catch (err) {
            console.log(err);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }catch (err) {
            console.log(err);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    // alternative to wrapping value after await in runInAction in tryCatch since it's already in it's own action
    setLoadingInitial = (state: boolean) => { 
        this.loadingInitial = state;
    }

    setEditMode = (state: boolean) => { 
        this.editMode = state;
    }

    setSelectedActivity = (activity: Activity | undefined) => {
        this.selectedActivity = activity;
    }

}