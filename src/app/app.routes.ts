import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { ToDoItemComponent } from './components/to-do-item/to-do-item.component';

export const routes: Routes = [
    {
        path: 'tasks',
        component: TasksComponent
    },
    {
        path: 'tasks/:id',
        component: ToDoItemComponent
    },
    {
        path: '',
        redirectTo: '/tasks',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: TasksComponent
    }
];
