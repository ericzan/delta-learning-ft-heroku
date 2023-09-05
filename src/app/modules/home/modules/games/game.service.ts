import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamelService {
  public CLEAR_LIST$ = new BehaviorSubject<boolean>(false);



  constructor() { }
}
