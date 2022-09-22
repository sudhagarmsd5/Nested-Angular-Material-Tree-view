import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TreeData } from '../models/tree-data.model';

@Injectable({
  providedIn: 'root',
})
export class TreeDataService {
  _dataChange = new BehaviorSubject<TreeData[]>([]);
}
