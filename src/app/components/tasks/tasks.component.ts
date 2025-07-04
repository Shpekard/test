import { Component, inject, OnInit } from '@angular/core';
import { ToDoDb } from '../../types/todo';
import { IndexService } from '../../services/index.service';
import { AddToDoComponent } from '../add-to-do/add-to-do.component';
import { FormBackgroundService } from '../../services/form-background.service';
import { RouterLink } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tasks',
  imports: [AddToDoComponent, RouterLink, NgbTooltipModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {

  indDB = inject(IndexService)
  subjDisplay = inject(FormBackgroundService)

  arrDB: Array<ToDoDb> = []
  dbOrig: Array<ToDoDb> = []

  ngOnInit(): void {
    this.indDB.toDoEmitter.subscribe(arr => {
      this.arrDB = arr;
      this.dbOrig = arr.slice()
      console.log(this.arrDB)
    });
  }

  delete(id: number) {
    this.indDB.deleteToDo(id);
  }

  changeStatus(id: number) {
    this.indDB.changeStatus(id)
  }

  sendBackground() {
    this.subjDisplay.changeVal(true)
  }

  onInput(event: Event) {
    let target = event.target as HTMLInputElement;

    if (target.value == '') {
      this.arrDB = this.dbOrig.slice();
      return
    }
    const text = target.value.toLowerCase()

    this.arrDB = this.arrDB.filter(elem => {
      return elem.title.toLowerCase().includes(text)
    })

  }
  
}
