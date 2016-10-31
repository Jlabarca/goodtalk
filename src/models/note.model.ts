import * as mongoose from "mongoose";

export interface INote {
    name: string;
    created: Date;
    x: number,
    y: number,
    content: string
}

export interface INoteModel extends INote, mongoose.Document {}
 
export var Notechema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    created: Date,
    x: Number,
    y: Number,
    content: String
});

export var Note = mongoose.model<INoteModel>("Note", Notechema);
