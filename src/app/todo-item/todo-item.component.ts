import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoItemData} from '../dataTypes/TodoItemData';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() item;
  @Input() isDone;
  @Input() show: boolean = false;

  private  beforEdit : string;

  @Output() itemDone = new EventEmitter();
  @Output() removeItem = new EventEmitter();
  @Output() itemLabel = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  eventIsDone(){
    this.itemDone.emit(!this.isDone);
  }

  eventDestroy(item){
    this.removeItem.emit(item);
  }

  eventEditLabel(newLab:string){
    if(newLab.length == 0)
      this.itemLabel.emit(this.beforEdit);
    else
      this.itemLabel.emit(newLab);
  }

  editLabel(label : string){
    this.beforEdit = label;
    console.log(this.show);
    this.show = true;
    console.log(this.show);
  }

  doneEdit(item : string) : void{
    if(item.length == 0){
      this.eventEditLabel(this.beforEdit);
    }
    this.show = false;
    this.eventEditLabel(item);
  }

}
