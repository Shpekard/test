import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IndexService } from '../../services/index.service';
import { ToDoDb } from '../../types/todo';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-to-do-item',
  imports: [RouterLink, NgbCollapse, DatePipe],
  templateUrl: './to-do-item.component.html',
  styleUrl: './to-do-item.component.scss'
})
export class ToDoItemComponent implements OnInit, AfterViewInit {
  route = inject(ActivatedRoute)
  router = inject(Router)
  idb = inject(IndexService)
  item?: ToDoDb

  collapseControl = {
    'title': true,
    'description': true,
    'date': true,
    'status': true
  }

  isCollapsed: boolean = true
  curCollapse: 'title' | 'description' | 'date' | 'status' | undefined

  ngOnInit(): void {
    let num_id = this.route.snapshot.paramMap.get('id')!;

    this.idb.toDoEmitter.subscribe((arr) => {
      if (arr.length == 0) return

      if (arr.filter(elem => elem.id == Number(num_id)).length == 0) {
        this.router.navigate(['/tasks'])
      } else {
        this.item = arr[Number(num_id)]
      }
    })
  }

  ngAfterViewInit(): void {
    window.scrollTo(0, 0)
  }

  changeCollapse(tag: 'title' | 'description' | 'date' | 'status') {
    this.collapseControl[tag] = !this.collapseControl[tag]
  }
}
