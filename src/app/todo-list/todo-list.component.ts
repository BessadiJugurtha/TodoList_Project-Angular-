import {Component, Input, OnInit} from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  titre: string;
  @Input() private data: TodoListData;
  constructor(private todoService: TodoService) {
    todoService.getTodoListDataObserver().subscribe( tdl => this.data = tdl );
    this.titre = this.data.label;
  }

  ngOnInit() {
  }

  get label(): string {
    return this.data.label;
  }

  get items(): TodoItemData[] {
    return this.data.items;
  }

  itemDone(item: TodoItemData, done: boolean) {
    this.todoService.setItemsDone( done, item );
  }

  itemLabel(item: TodoItemData, label: string) {
    this.todoService.setItemsLabel( label, item );
  }

  appendItem(label: string) {
    this.todoService.appendItems( {
      label,
      isDone: false
    } );
  }

  removeItem(item: TodoItemData) {
    this.todoService.removeItems(item);
  }
}
