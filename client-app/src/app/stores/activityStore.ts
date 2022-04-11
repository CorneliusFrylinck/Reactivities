import { makeAutoObservable, runInAction } from "mobx";
import ts from "typescript";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from 'uuid'

export default class ActivityStore {
    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    deleteItemId: string | undefined = undefined;


    constructor () {
        makeAutoObservable(this)
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach( activity => {
                activity.date = activity.date.split('T')[0];
                this.activities.push(activity);
                this.setLoadingInitial(false);
            })
        }catch (err) {
            console.log(err);
            this.setLoadingInitial(false);
        }
    }

    deleteActivity = async (id: string) => {
        this.deleteItemId = id;
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activities = [...this.activities.filter(x => x.id !== id)];
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
                this.activities.push(activity);
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
                this.activities = [...this.activities.filter(x => x.id !== activity.id), activity];
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

    selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(a => a.id === id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    setSelectedActivity = (activity: Activity | undefined) => {
        this.selectedActivity = activity;
    }

    setActivities = (activities: Activity[]) => {
        this.activities = activities;
    }
}