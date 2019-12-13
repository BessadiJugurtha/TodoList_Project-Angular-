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

  /*Animation*/
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
  ]

})

export class TodoListComponent implements OnInit {

  titre: string;
  @Input() private data: TodoListData;
  private remaining : number =0 ;

  /*Constructor*/
  constructor(private todoService: TodoService) {
    todoService.getTodoListDataObserver().subscribe( tdl => this.data = tdl );
    this.titre = this.data.label;

    if(localStorage.getItem('TodoList'))
      this.remainingStain();
    else
      this.remaining = 0;
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

  remainingStain(): void {
    const savedTodo = JSON.parse(localStorage.getItem('TodoList'));
    if(localStorage.getItem('TodoList'))
    this.remaining = savedTodo.filter(item=>!item.isDone).length;
    else this.remaining =0;
  }

  updateRemaining() : void{
    this.remaining = this.remaining +1;
  }

  checkedOrShoot(): boolean {
    const sizeArray = this.items.filter(item => !item.isDone).length;
    return sizeArray != 0 ? false : true;
  }

  toggleAllDone(){
   if(this.checkedOrShoot() == false) {
     this.items.forEach(item => {

       if (item.isDone == false) {
         this.todoService.setItemsDone(true, item);
         /*mettre à jour nombre de taches restantes*/
         this.remainingStain();
       }
     });
   }
   else{
     this.items.forEach(item => {
       if (item.isDone == true){
         this.todoService.setItemsDone( false, item );
         this.remainingStain();
       }
     });
   }
  }
    /*filtre*/
  filter(className) : void{
    if(className=="filterAll" && this.todoService.get()!= []){
      this.data.items = this.todoService.get();
      this.todoService.undo();
    } else if(className=="filterActives" && this.todoService.get()!= []){
      this.data.items = this.todoService.get().filter(item=>!item.isDone);
      this.todoService.undo();
    }else if(className=="filterCompleted" && this.todoService.get()!= []){
      this.data.items = this.todoService.get().filter(item=>item.isDone);
      this.todoService.undo();
    }
  }

  /*condition affichage du button supprimer chochés*/
  displayButtonSup() : boolean{
    return this.items.filter(item=>item.isDone).length >0
  }

 /*supprimer cochées*/
  deleteChecked() : void {
   let inter = this.items.filter(item=>item.isDone);
   inter.forEach(item=>this.todoService.removeItems(item));
   this.remainingStain();
  }

  /*Undo Redo*/
  undo(){
    this.todoService.updateUndo();
    this.remainingStain();
  }

  redo(){
    this.todoService.updateRedo();
    this.remainingStain();
  }

  /*condition affichage du button Undo*/
  sizeArrayUndo(){
    if(this.todoService.getArrayUndo())
    return this.todoService.getArrayUndo().length>0;
    else  return false;
  }

  /*condition affichage du button Redo*/
  sizeArrayRedo(){
    if(this.todoService.getArrayRedo())
    return this.todoService.getArrayRedo().length>0;
    else return false;
  }

  /*Effacer tous */

  destroyStorage(){
    if(this.data.items.length>0){
    this.data.items.forEach(item => this.removeItem(item));
    }
    localStorage.clear();
    this.remainingStain();
    /*rafraichir la page après suppression des local storage,
     pour régler le problème N° 2(détail dans le rapport)*/
    window.location.reload();
  }
}
