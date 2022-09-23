import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { of as observableOf } from 'rxjs';
import { TreeData } from './models/tree-data.model';
import { TreeDataService } from './shared/tree-data.service';
import { TreeFunctionService } from './shared/tree-function.service';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  nestedTreeControl: NestedTreeControl<TreeData>;
  nestedDataSource: MatTreeNestedDataSource<TreeData>;

  constructor(
    private dataService: TreeDataService,
    private service: TreeFunctionService
  ) {}

  ngOnInit() {
    this.nestedTreeControl = new NestedTreeControl<TreeData>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.dataService._dataChange.subscribe(
      (data) => (this.nestedDataSource.data = data)
    );
  }

  private _getChildren = (node: TreeData) => observableOf(node.Children);
  hasNestedChild = (_: string, nodeData: TreeData) =>
    nodeData.Children.length > 0;

  refreshTreeData() {
    const data = this.nestedDataSource.data;
    this.nestedDataSource.data = null;
    this.nestedDataSource.data = data;
  }

  addNode(node: TreeData) {
    // node.Id = this.service.findNodeMaxId(this.nestedDataSource.data) + 1;
    console.log('add new node', node);
    this.nestedDataSource.data.push(node);
    this.refreshTreeData();
  }

  addChildNode(childrenNodeData) {
    // childrenNodeData.node.Id =
    //   this.service.findNodeMaxId(this.nestedDataSource.data) + 1;
    // console.log(childrenNodeData);
    childrenNodeData.currentNode.Children.push(childrenNodeData.node);
    console.log('add sub node', childrenNodeData.node);
    this.refreshTreeData();
  }

  editNode(nodeToBeEdited) {
    console.log('edit node', nodeToBeEdited.node);
    const fatherElement: TreeData = this.service.findFatherNode(
      nodeToBeEdited.currentNode.Id,
      this.nestedDataSource.data
    );
    let elementPosition: number;
    // nodeToBeEdited.node.Id =
    //   this.service.findNodeMaxId(this.nestedDataSource.data) + 1;
    if (fatherElement[0]) {
      fatherElement[0].Children[fatherElement[1]] = nodeToBeEdited.node;
    } else {
      elementPosition = this.service.findPosition(
        nodeToBeEdited.currentNode.Id,
        this.nestedDataSource.data
      );
      console.log(elementPosition, 'positions');
      this.nestedDataSource.data[elementPosition] = nodeToBeEdited.node;
    }
    this.refreshTreeData();
  }

  deleteNode(nodeToBeDeleted: TreeData) {
    console.log('delete node', nodeToBeDeleted);
    const deletedElement: TreeData = this.service.findFatherNode(
      nodeToBeDeleted.Id,
      this.nestedDataSource.data
    );
    let elementPosition: number;
    if (
      window.confirm(
        'Are you sure you want to delete ' + nodeToBeDeleted.Name + '?'
      )
    ) {
      if (deletedElement[0]) {
        deletedElement[0].Children.splice(deletedElement[1], 1);
      } else {
        elementPosition = this.service.findPosition(
          nodeToBeDeleted.Id,
          this.nestedDataSource.data
        );
        this.nestedDataSource.data.splice(elementPosition, 1);
      }
      this.refreshTreeData();
    }
  }
}
