import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Todo } from 'src/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

private todos: Todo[] = []
private todoSubject = new BehaviorSubject<Todo[]>([])
private deleteTodoSubject = new Subject<number>();
private addTodoSubject = new Subject<Todo>();


getTodos ():Observable<Todo[]>{
  return this.todoSubject.asObservable()
}

deleteAction$ = this.deleteTodoSubject.asObservable()
addAction$ = this.addTodoSubject.asObservable()

addTodo(todo: Todo):void{
  this.addTodoSubject.next(todo)
  this.todos.push(todo)
  this.todoSubject.next(this.todos)
}

deleteTodo(id:number) {
  this.deleteTodoSubject.next(id)
  this.todos = this.todos.filter(todo => todo.id !== id)
  this.todoSubject.next(this.todos)
}

find(id:number){
  return this.todos && this.todos.find(todo => todo.id === id) || null
}

updateEdited(id: number, todo: Todo){
  const index = this.todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    this.todos[index] = todo;
    this.todoSubject.next(this.todos);
  }
}
}
