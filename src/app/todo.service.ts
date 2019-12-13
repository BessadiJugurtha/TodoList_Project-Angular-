import { Injectable } from '@angular/core';
import {TodoListData} from './dataTypes/TodoListData';
import {Observable, BehaviorSubject} from 'rxjs';
import {TodoItemData} from './dataTypes/TodoItemData';

@Injectable()
export class TodoService {

  private todoListSubject = new BehaviorSubject<TodoListData>( {label: 'TodoList', items: this.get()} );

  /*local Storage*/
  private todoArrayUndo : [TodoItemData[]];
  private _todoArrayRedo : [TodoItemData[]];

  /*  Constructor*/
  constructor() {
    const arrayUndo = localStorage.getItem('ArrayUndo');
    const arrayRedo = localStorage.getItem('ArrayRedo');
        /*initialisation de todoArrayUndo et todoArrayRedo*/
      if(arrayUndo)
        this.todoArrayUndo = JSON.parse(arrayUndo)
          else {this.todoArrayUndo = [[]];
               /*cette ligne gére un problème numéro 1(regardez dans le rapport "probleme N° 1")*/
                this.todoArrayUndo.splice(0,1);
          }

      if(arrayRedo)
        this._todoArrayRedo = JSON.parse(arrayRedo);
          else {
            this._todoArrayRedo = [[]];
            /*cette ligne gére le problème num 01(regardez dans le rapport "probleme N° 1")t*/
            this._todoArrayRedo.splice(0,1);
          }
  }


  getTodoListDataObserver(): Observable<TodoListData> {
    return this.todoListSubject.asObservable();
  }

  setItemsLabel(label: string, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label, isDone: I.isDone}) )
    });
    this.saveAll();
    this.undo();

  }

  setItemsDone(isDone: boolean, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label: I.label, isDone}) )
    });
      this.saveAll();
      this.undo();

  }

  appendItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: [...tdl.items, ...items]
    });
     this.saveAll();
     this.undo();
  }

  removeItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: tdl.items.filter( I => items.indexOf(I) === -1 )
    });
    this.saveAll();
    this.undo();

  }

  /*LocalStorage*/
  saveAll() {
   const tdl = this.todoListSubject.getValue();
   localStorage.setItem(tdl.label, JSON.stringify(tdl.items));
  }

  get() : TodoItemData[]{
   let savedTodo = localStorage.getItem('TodoList');
   if(savedTodo) return JSON.parse(savedTodo);
   else return [];
  }


  /*Undo Redo*/
  undo() : void{
      this.todoArrayUndo.push(this.todoListSubject.getValue().items);
      this.setArrayUndo();
  }

  /*setter ArrayUndo et ArrayRedo*/
  setArrayUndo(){
    localStorage.setItem('ArrayUndo', JSON.stringify(this.todoArrayUndo));
  }

  setArrayRedo(){
    localStorage.setItem('ArrayRedo', JSON.stringify(this._todoArrayRedo));
  }

  /*getter ArrayUndo et ArrayRedo*/
  getArrayUndo() : [TodoItemData[]]{
    return JSON.parse(localStorage.getItem('ArrayUndo'));
  }

  getArrayRedo() : [TodoItemData[]]{
    return JSON.parse(localStorage.getItem('ArrayRedo'));
  }

  /*gérer les modifications sur les local storage de Undo et Redo*/
  updateUndo() : void {
    const tabIn = this.getArrayUndo();
    this.todoListSubject.getValue().items = tabIn[tabIn.length-2];
    this._todoArrayRedo.unshift(this.todoArrayUndo[this.todoArrayUndo.length-1]);
    this.todoArrayUndo.splice(this.todoArrayUndo.length-1,1);
    this.setArrayUndo();
    this.setArrayRedo();
    if(tabIn.length >1)
      localStorage.setItem('TodoList', JSON.stringify(tabIn[tabIn.length - 2]));
    else
      localStorage.setItem('TodoList', JSON.stringify([]));
  }

  updateRedo(){
    let tabIn = this.getArrayRedo();
    this.todoListSubject.getValue().items = tabIn[0];
    this.todoArrayUndo.push(this._todoArrayRedo[0]);
    this._todoArrayRedo.splice(0,1);
    this.setArrayUndo();
    this.setArrayRedo();
    localStorage.setItem('TodoList',JSON.stringify(tabIn[0]));
  }


}
