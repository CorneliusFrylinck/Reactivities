import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { ChatComment } from "../models/comment";
import { store } from "./store";

export default class CommentStore {
    comments: ChatComment[] = [];
    hubConnection : HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = (activityId: string) => {
        if (store.activityStore.selectedActivity) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl(process.env.REACT_APP_CHAT_URL + '?activityId=' + activityId, {
                    accessTokenFactory: () => store.userStore.user?.token!
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();
            
            this.hubConnection.start().catch(error => console.log('Error establishing the connection: ', error));

            this.hubConnection.on('LoadComments', (comments: ChatComment[]) => {
                runInAction(() => {
                    try {
                        comments.forEach(comment => {
                            console.log(comment.createdAt.toString().substring(0, comment.createdAt.toString().length - 6))
                            comment.createdAt = new Date(comment.createdAt.toString().substring(0, comment.createdAt.toString().length - 6) + 'Z');
                        })
                        this.comments = comments
                    } catch(err) {
                        console.log(err);
                    }
                });
            });

            this.hubConnection.on('ReceiveComment', (comment: ChatComment) => {
                runInAction(() => {
                    try {
                        comment.createdAt = new Date(comment.createdAt);
                        this.comments.unshift(comment)
                    } catch(err) {
                        console.log(err);
                    }
                });
            })
        }
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(err => console.log("Error stopping connection: ", err));
    }

    clearComments = () => {
        this.comments = [];
        this.stopHubConnection();
        this.hubConnection = null;
    }

    addComment = async (values: any) => {
        values.activityId = store.activityStore.selectedActivity?.id;
        try {
            await this.hubConnection?.invoke("SendComment", values);
        } catch (err) {
            console.log(err);
        }
    }
}