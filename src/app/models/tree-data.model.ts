export interface TreeData {
  Id: string;
  parentId?: string;
  Name: string;
  Description: string;
  Children: TreeData[];
}

export interface DialogData {
  Name: string;
  Description: string;
  Component: string;
}
