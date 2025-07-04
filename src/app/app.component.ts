import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasksComponent } from "./components/tasks/tasks.component";
import { FormBackgroundService } from './services/form-background.service';
import { IndexService } from './services/index.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isDisplayed: 'block' | 'none' = 'none'
  subjDisplay = inject(FormBackgroundService)
  indDB = inject(IndexService)

  ngOnInit(): void {
    this.subjDisplay.display.subscribe(value => {
      this.isDisplayed = value ? 'block' : 'none'
    });
    this.indDB.startDB();
  }

  exitBackground() {
    this.subjDisplay.changeVal(false)
  }

}
