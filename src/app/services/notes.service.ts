import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";
import { INote } from "../../models";

@Injectable()
export class NotesService {
    private name: string = 'note';
    private host: string = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
    socket: SocketIOClient.Socket;
    notes: INote[];

    constructor() {
        /*
        let socketUrl = this.host + "/" + this.name;
        this.socket = io.connect(socketUrl);
        console.log(this.host);
        this.socket.on("connect", () => this.connect());
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("error", (error: string) => {
            console.log(`ERROR: "${error}" (${socketUrl})`);
        });

        this.socket.on("onConnected", (notes) => {
            this.notes = notes
            console.log(this.notes);
        });
        */
    }

    // Get items observable
    getNotes(): Observable<any> {
        this.name = 'note';
        let socketUrl = this.host + "/" + this.name;
        this.socket = io.connect(socketUrl);
        this.socket.on("connect", () => this.connect());
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("error", (error: string) => {
            console.log(`ERROR: "${error}" (${socketUrl})`);
        });

        // Return observable which follows "create" and "remove" signals from socket stream
        return Observable.create((observer: any) => {
            this.socket.on("onConnected", (notes: any) => observer.next({ action: "onConnected", notes: notes }));
            //this.socket.on("remove", (item: any) => observer.next({ action: "remove", item: item }));
            return () => this.socket.close();
        });
    }

    // Create signal
    create(name: string) {
        this.socket.emit("create", name);
    }

    // Remove signal
    remove(name: string) {
        this.socket.emit("remove", name);
    }

    // Handle connection opening
    private connect() {
        console.log(`Connected to "${this.name}"`);

        // Request initial list when connected
        this.socket.emit("getNotes");
    }

    // Handle connection closing
    private disconnect() {
        console.log(`Disconnected from "${this.name}"`);
    }
}
