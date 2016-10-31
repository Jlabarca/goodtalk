import { INote, Note } from "../../models";


export class NoteSocket {
    nsp: any;
    name: string;
    data: any;
    socket: any;
    //notes: any = {};
    notes = [{
                name:  'PRUEBA1',
                created:  new Date(),
                x:  0,
                y:  0,
                content: 'PRUEBA1PRUEBA1PRUEBA1'
        },
        {
                name:  'PRUEBA1',
                created:  new Date(),
                x:  0,
                y:  0,
                content: 'PRUEBA1PRUEBA1PRUEBA1'
        },
        {
                name:  'PRUEBA1',
                created:  new Date(),
                x:  0,
                y:  0,
                content: 'PRUEBA1PRUEBA1PRUEBA1'
        },
        {
                name:  'PRUEBA1',
                created:  new Date(),
                x:  0,
                y:  0,
                content: 'PRUEBA1PRUEBA1PRUEBA1'
        },
        {
                name:  'PRUEBA1',
                created:  new Date(),
                x:  0,
                y:  0,
                content: 'PRUEBA1PRUEBA1PRUEBA1'
        },
        {
                name:  'PRUEBA1',
                created:  new Date(),
                x:  0,
                y:  0,
                content: 'PRUEBA1PRUEBA1PRUEBA1'
        },
        {
                name:  'PRUEBA1',
                created:  new Date(),
                x:  0,
                y:  0,
                content: 'PRUEBA1PRUEBA1PRUEBA1'
        },
        {
                name:  'PRUEBA1',
                created:  new Date(),
                x:  0,
                y:  0,
                content: 'PRUEBA1PRUEBA1PRUEBA1'
        },
        {
                name:  'PRUEBA1',
                created:  new Date(),
                x:  0,
                y:  0,
                content: 'PRUEBA1PRUEBA1PRUEBA1'
        },
        {
                name:  'PRUEBA1',
                created:  new Date(),
                x:  0,
                y:  0,
                content: 'PRUEBA1PRUEBA1PRUEBA1'
        },
        {
                name:  'PRUEBA1',
                created:  new Date(),
                x:  0,
                y:  0,
                content: 'PRUEBA1PRUEBA1PRUEBA1'
        },
        {
                name:  'PRUEBA1',
                created:  new Date(),
                x:  0,
                y:  0,
                content: 'PRUEBA1PRUEBA1PRUEBA1'
        },
        {
                name:  'PRUEBA1',
                created:  new Date(),
                x:  0,
                y:  0,
                content: 'PRUEBA1PRUEBA1PRUEBA1'
        },
        {
                name:  'PRUEBA1',
                created:  new Date(),
                x:  0,
                y:  0,
                content: 'PRUEBA1PRUEBA1PRUEBA1'
        },
        {
                name:  'PRUEBA1',
                created:  new Date(),
                x:  0,
                y:  0,
                content: 'PRUEBA1PRUEBA1PRUEBA1'
        },
        {
                name:  'PRUEBA1',
                created:  new Date(),
                x:  0,
                y:  0,
                content: 'PRUEBA1PRUEBA1PRUEBA1'
        },
        {
                name:  'PRUEBA1',
                created:  new Date(),
                x:  0,
                y:  0,
                content: 'PRUEBA1PRUEBA1PRUEBA1'
        },
        {
                name:  'PRUEBA1',
                created:  new Date(),
                x:  0,
                y:  0,
                content: 'PRUEBA1PRUEBA1PRUEBA1'
        },
        {
                name:  'PRUEBA2',
                created:  new Date(),
                x:  56,
                y:  56,
                content: 'PRUEBA2PRUEBA2PRUEBA2'
        }];


    constructor(private io: any) {
        this.nsp = this.io.of("/note");
        this.nsp.on("connection", (socket: any) => {
            console.log("Client connected");
            this.socket = socket;
            this.socket.emit('onConnected', this.notes);
            this.listen();
        });
    }

    // Add signal
    private listen(): void {
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("create", (name: string) => this.create(name));
        this.socket.on("remove", (name: string) => this.remove(name));
        this.socket.on("list", () => this.list());
        //this.socket.on("getNotes", () => this.notes);
        this.socket.on('createNote', data => this.socket.broadcast.emit('onNoteCreated', data));
        this.socket.on('updateNote', data => this.socket.broadcast.emit('onNoteUpdated', data));
        this.socket.on('moveNote', data => this.socket.broadcast.emit('onNoteMoved', data));
        this.socket.on('deleteNote', data => this.socket.broadcast.emit('onNoteDeleted', data));
    }

    // Handle disconnect
    private disconnect(): void {
        console.log("Client disconnected");
    }

    // Create note and emit it
    private createNote(note: INote): void {
        if (!this.notes[note.name]) {
            console.log("Creating namespace for note:", note.name);
            //this.notes[note.name] = new MessageSocket(this.io, note.name);
        }
        this.nsp.emit("create", note);        
    }

    // Create a note
    private create(name: string): void {
        Note.create({
            name: name,
            created: new Date(),
            messages: []
        }, (error: any, note: INote) => {
            if (!error && note) {
                this.createNote(note);
            }
        });
    }

    // Remove a note
    private remove(name: string): void {
        // First remove note messages
        //Message.remove({
        //    note: name
        //}).exec();

        // Remove note
        Note.remove({
            name: name
        }).exec( (error: any, note: INote) => {
            if (!error && note) {
                this.nsp.emit("remove", note);
            }
        });
    }

    // List all notes
    private list(): void {
        if (this.socket && this.socket.connected) {
            Note.find({}).exec( (error: any, notes: INote[]) => {
                for (let note of notes) {
                    this.createNote(note);
                }
            });
        }
    }
}