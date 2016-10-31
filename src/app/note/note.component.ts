import {
    Component, Input, trigger,
    state,
    style,
    transition,
    animate
} from '@angular/core';
import { INote } from "../../models";

declare var require;
const styles: string = require('./note.component.scss');
const template: string = require('./note.component.html');


    
@Component({
    selector: 'note',
    styles: [styles],
    template
})



export class NoteComponent {
   
    @Input() note: INote = {
        name: '',
        created: new Date(),
        x: 0,
        y: 0,
        content: ''
    };

    constructor() {
        
    }


    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
    }

    ngOnDestroy(): void {
    }


}
