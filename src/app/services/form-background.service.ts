import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormBackgroundService {

  display = new BehaviorSubject<boolean>(false)

  changeVal(val: boolean) {
    this.display.next(val)
  }
}
