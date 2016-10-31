import { BrowserModule  } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// App component
import { AppComponent } from "./app.component";

// Other components
import { ControlComponent } from "./control";
import { NoteComponent } from "./note";
import { NgGridModule } from 'angular2-grid';
// providers
import { NotesService } from './services';


@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        NgGridModule
    ],
    declarations: [
        AppComponent,
        ControlComponent,
        NoteComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [NotesService]

})
export class AppModule {}
