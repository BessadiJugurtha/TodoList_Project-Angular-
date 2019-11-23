import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service';
import {animate, style, transition, trigger, state} from '@angular/animations';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      transition(':enter',[
        style({opacity: 0, transform:'scale(2,9)'}),
        animate(300)
      ]),
      transition(':leave',[
        animate(300, style({opacity: 0, transform:
            'scale(0.5,1)'}))
      ]),
    ])
   /* trigger('fade', [
      state('void', style({
        opacity: 0, transform: 'scale(2,4)',
      })),
      transition('void <=> *', animate(300)),
    ]),*/
  ]

})
export class TodoListComponent implements OnInit {

  titre: string;
  @Input() private data: TodoListData;
  private remaining : number = 0;

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

  checkedOrShoot() : boolean{
    let sizeArray = this.items.filter(item=>!item.isDone).length;
    return sizeArray != 0 ? false: true;
  }

  remainingStain() : void{
    this.remaining = this.items.filter(item=>!item.isDone).length;

  }

  updateRemaining() : void{
    this.remaining = this.remaining +1;
  }

  toggleAllDone(){
   if(this.checkedOrShoot() == false) {
     this.items.forEach(item => {
       if (item.isDone == false)
         item.isDone = true;
       this.remainingStain()
     })
   }
   else{
     this.items.forEach(item => {
       if (item.isDone == true)
         item.isDone = false;
       this.remainingStain()
     })
   }
  }

  filter(className) : void{
    if(className=="filterAll"){
      this.data.items = this.todoService.get();
    } else if(className=="filterActives"){
      this.data.items = this.todoService.get().filter(item=>!item.isDone);
      this.remainingStain();
    }else{
      this.data.items = this.todoService.get().filter(item=>item.isDone);
      this.remainingStain();
    }
  }

  displayButtonSup() : boolean{
    return this.items.filter(item=>item.isDone).length >0
  }


  deleteChecked() : void {
   let inter = this.items.filter(item=>item.isDone);
   inter.forEach(item=>this.todoService.removeItems(item));
  }
}
