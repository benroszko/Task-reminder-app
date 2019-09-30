import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';
import { ToDoComponent } from './to-do/to-do.component';
import { DoneComponent } from './done/done.component';
import { TasksService } from './services/tasks.service';
import { CheckedDirective } from './shared/checked.directive';
import { ShowDateDirective } from './shared/show-date.directive';
import { ModifyPipe } from './shared/modify.pipe';
import { SortByNamePipe } from './shared/sort-by-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    ToDoComponent,
    DoneComponent,
    CheckedDirective,
    ShowDateDirective,
    ModifyPipe,
    SortByNamePipe,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  providers: [TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
