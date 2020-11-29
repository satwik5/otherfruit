import { Component, OnInit } from '@angular/core';

import { Note } from './note';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  errMessage: string;
  note: Note = new Note();
  editId: number;
  noteList;
  /*[ { "title": "otherFruit", "text": 'this is new text', "id": 3 },
  { "title": "sravya", "text": 'here is the text', "id": 2 }];
*/
  constructor(private notesService: NotesService) { }

  ngOnInit() {

    this.getNote();

  }
  getNote() {
    this.notesService.getNotes().subscribe(response => {
      if (response) {
        this.noteList = response;
      } else {
        this.errMessage = 'We are unable to retreive notes list.';
      }
    }, error => {
      this.errMessage = 'Http failure response for server';
    });
  }
  addNote() {
    if (!this.note.text || !this.note.title) {
      this.errMessage = 'Title and Text both are required fields';
      return;
    }
    this.note.id = Math.max.apply(Math, this.noteList.map(function (o) { return o.id; })) + 1;
    if (this.noteList.findIndex(vendor => vendor.id === this.editId) == 0) {
      this.notesService.editNote(this.note).subscribe(response => {
        if (response) {
          this.getNote(); 
          this.note = new Note();
        } else {
          this.errMessage = 'We are unable to add the selected note.';
        }
      }, error => {
        this.errMessage = 'Http failure response for edit notes';
      });
    } else {
      this.notesService.addNote(this.note).subscribe(response => {
        if (response) {
          this.noteList.push(this.note);
          this.note = new Note();
        } else {
          this.errMessage = 'We are unable to add the selected note.';
        }
      }, error => {
        this.errMessage = 'Http failure response for adding note';
      });
    }

  }
  editNote(note) {
    console.log(note)
    this.note = note;
    this.editId = note.id;
  }

  deleteNote(id) {
    this.notesService.deleteNote(id).subscribe(response => {
      if (response) {
        this.getNote();
      } else {
        this.errMessage = 'We are unable to add the selected note.';
      }
    }, error => {
      this.errMessage = 'Http failure response for delete notes';
    });
  }

}
