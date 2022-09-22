import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import {
  AddNodeComponent,
  NewNodeDialog,
} from './dialog/add-node/add-node.component';
import {
  EditNodeComponent,
  EditNodeDialog,
} from './dialog/edit-node/edit-node.component';
import { DeleteNodeComponent } from './dialog/delete-node/delete-node.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [
    AppComponent,
    AddNodeComponent,
    NewNodeDialog,
    EditNodeComponent,
    EditNodeDialog,
    DeleteNodeComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
