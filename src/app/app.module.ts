import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AutofocusModule } from 'angular-autofocus-fix';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import {TodoService} from './todo.service';
import {FormsModule} from '@angular/forms';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';




@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    AutofocusModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
