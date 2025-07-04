import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import { IndexService } from '../../services/index.service';
import { FormBackgroundService } from '../../services/form-background.service';

@Component({
  selector: 'app-add-to-do',
  imports: [ReactiveFormsModule],
  templateUrl: './add-to-do.component.html',
  styleUrl: './add-to-do.component.scss'
})
export class AddToDoComponent implements OnInit {

  formGroup = inject(FormBuilder)
  indexDB = inject(IndexService)
  subjDisplay = inject(FormBackgroundService)
  display_valid: boolean = false

  fb = this.formGroup.nonNullable.group({
    title: ['', [Validators.required]],
    description: ['']
  })

  ngOnInit(): void {
    this.subjDisplay.display.subscribe(value => {
      this.display_valid = value;
      this.fb.reset();
    })
  }

  addToList() {
    if (this.fb.controls.title.errors !== null) {
      this.fb.controls.title.markAsTouched()
      return
    }
    console.log('done')
    this.indexDB.AddToDo({
      ...this.fb.getRawValue(),
      isExecuted: false
    });
    this.fb.reset();
  }
}
