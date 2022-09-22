import { Component, Inject, Output, EventEmitter, Input } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData, TreeData } from '../../models/tree-data.model';
import { nanoid } from 'nanoid';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.css'],
})
export class AddNodeComponent {
  @Input() isTop: boolean;
  @Input() currentNode: TreeData;
  @Output() addedNode = new EventEmitter();
  name: string;
  description: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(NewNodeDialog, {
      width: '250px',
      data: {
        nodeName: this.name,
        nodeDescription: this.description,
        Component: 'Add',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(this.currentNode);
      if (result) {
        const node: TreeData = {
          Id: nanoid(),
          parentId: null,
          Name: result.nodeName,
          Description: result.nodeDescription,
          Children: [],
        };
        if (this.isTop) {
          this.addedNode.emit(node);
        } else {
          const node2: TreeData = {
            Id: nanoid(),
            parentId: this.currentNode.Id,
            Name: result.nodeName,
            Description: result.nodeDescription,
            Children: [],
          };
          this.addedNode.emit({ currentNode: this.currentNode, node: node2 });
        }
      }
    });
  }
}

@Component({
  selector: 'app-new-node',
  templateUrl: '../node-dialog/node-dialog.html',
})
export class NewNodeDialog {
  constructor(
    public dialogRef: MatDialogRef<NewNodeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
