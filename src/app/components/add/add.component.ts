import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TodoService } from 'src/app/todo.service';
import { Todo } from 'src/todo.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{
  
  openSubject = new BehaviorSubject<boolean> (false)
  openObservable$ = this.openSubject.asObservable()
  todoText: string = '';

  constructor(private service: TodoService){}

  ngOnInit(): void {
   this.service.addAction$.subscribe() 
  }

  toggleShow(){
    const value = this.openSubject.value
    this.openSubject.next(!value)
  }

  addTodo(){
    if(this.todoText.trim() === ''){
      return
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: this.todoText,
      completed: false,
      editing: false,
    }

    this.service.addTodo(newTodo)
    this.todoText = ''
    this.toggleShow()
  }
}
