import { Component } from "@angular/core";
import { NgGrid, NgGridItem } from 'angular2-grid';
import { NotesService } from './services';

declare var require;
const styles: string = require("./app.component.scss");
const template: string = require("./app.component.html");

@Component({
    selector: "app",
    styles: [styles],
    template
})

export class AppComponent {
    notes;
    constructor(public notesService: NotesService) {
        this.notesService
                .getNotes()
                .subscribe(
                    (response) => {
                        this.notes = response.notes;
                    },
                    error => console.log(error)
                );
    }
    ngOnInit(): void {
     console.log('notesService2');
       this.notes = this.notesService.notes;
       console.log(this.notes);
    }

}
