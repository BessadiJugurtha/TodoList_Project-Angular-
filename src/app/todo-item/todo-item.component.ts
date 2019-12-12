import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoItemData} from '../dataTypes/TodoItemData';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {

  @Input() item;
  @Input() isDone;

  /*gére l'affichage de l'élément <form>*/
  @Input() show: boolean = false;

  /*pour stocker le label avant édition*/
  private  beforEdit : string;

  /*evenement transfert des données vers le composant père
  * gérer les échanges fils-père*/
  @Output() itemDone = new EventEmitter();
  @Output() removeItem = new EventEmitter();
  @Output() itemLabel = new EventEmitter();
  @Output() remainingStain = new EventEmitter();
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
    /*stockage du label*/
    this.beforEdit = label;
    this.show = true;
  }

  doneEdit(item : string) : void{
    if(item.length == 0){
      /*reprendre l'ancienne valeur du label*/
      this.eventEditLabel(this.beforEdit);
    }
    this.show = false;
    this.eventEditLabel(item);
  }

  /*mettre à jour le nombre de taches restantes*/
  eventRemaining(){
    this.remainingStain.emit();
  }

}
