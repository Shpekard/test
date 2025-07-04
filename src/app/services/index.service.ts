import { Injectable } from '@angular/core';
import { BehaviorSubject, count, Subject } from 'rxjs';
import { ToDoDb, ToDoItem } from '../types/todo';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  addSubj = new Subject<boolean>()
  toDoEmitter = new BehaviorSubject<ToDoDb[]>([])
  
  db?: IDBDatabase
  store?: IDBObjectStore

  startDB() {
    let req = indexedDB.open('todo', 1);  

    req.onupgradeneeded = () => {
      this.db = req.result;
      if (!this.db.objectStoreNames.contains('todo')) {
        this.db.createObjectStore('todo', {keyPath: 'id'});
      } else {
        this.db.deleteObjectStore('todo');
        this.db.createObjectStore('todo', {keyPath: 'id'});
      }
    };

    req.onsuccess = () => {
      this.db = req.result;
        
      this.db.onversionchange = () => {
        this.db?.close();  
      }
      
      this.giveTodo()
      console.log('success');
    };

    req.onerror = () => {
      console.log(req.error)
    }

  }

  AddToDo(obj: ToDoItem) {
    if (this.db === undefined) return
    
    const transaction = this.db.transaction('todo', 'readwrite');
    let request: IDBRequest<IDBValidKey>;

    let todo = transaction.objectStore('todo');
    let counter = todo.getAllKeys();

    counter.onsuccess = () => {
      
      let num = -1;
      if (counter.result.length != 0) {
        num = Math.max(...counter.result as Array<number>);
      }

      let date = new Date().toISOString();
      request = todo.add({...obj, id: ++num, date: date});
      request.onsuccess = () => {
        this.addSubj.next(true);
        this.giveTodo();
      }
    }
  }
  
  deleteToDo(id: number) {
    if (this.db === undefined) return
    
    const transaction = this.db.transaction('todo', 'readwrite');
    const todo = transaction.objectStore('todo');
    
    let del = todo.delete(id);

    del.onsuccess = () => {
      console.log('deleted');
      this.giveTodo();
    }
  }

  giveTodo() {
    if (this.db === undefined) return

    const transaction = this.db.transaction('todo', 'readonly');

    let todo = transaction.objectStore('todo');
    let req = todo.getAll();
    req.onsuccess = () => {
      this.toDoEmitter.next(req.result)
    }

  }

  changeStatus(id: number) {
    if (this.db === undefined) return
    
    const transaction = this.db.transaction('todo', 'readonly');

    let todo = transaction.objectStore('todo');

    let req = todo.get(id)

    req.onsuccess = () => {
      let item = req.result;
      item.isExecuted = !item.isExecuted;

      if (this.db === undefined) return
      const tr = this.db.transaction('todo', 'readwrite');
      let todo_item = tr.objectStore('todo')
      let request = todo_item.put(item);
      request.onsuccess = () => {
        this.giveTodo()
      }
    }
  }
}
