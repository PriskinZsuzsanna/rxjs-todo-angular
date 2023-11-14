import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TodoService } from 'src/app/todo.service';
import { Todo } from 'src/todo.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  todos$: Observable<Todo[]> = new Observable<Todo[]>
  editState$ : Observable<boolean> = new Observable<boolean>
  actual: any
  private editTodoSubject = new Subject<number>()
  editAction$ = this.editTodoSubject.asObservable()

  constructor(private service: TodoService){}

  ngOnInit(): void {
    this.todos$ = this.service.getTodos()
    this.service.deleteAction$.subscribe((id) => {/*logic*/});
    this.editAction$.subscribe((id) => {})
  }

  delete(id:number):void{
    this.service.deleteTodo(id)
  }

  check(id: number){
    console.log('click')
    this.actual = this.service.find(id)
    console.log(this.actual)
    this.actual.completed = !this.actual.completed
  }

  edit(id:number):void{
    this.editTodoSubject.next(id)
    this.actual = this.service.find(id)
    this.actual.editing = true
  }
  
  saveEdited(id:number){
    this.service.updateEdited(id, this.actual)
    this.actual.editing = false
  }
}
