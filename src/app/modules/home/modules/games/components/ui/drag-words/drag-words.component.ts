import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GamelService } from '../../../game.service';

@Component({
  selector: 'zan-drag-words',
  templateUrl: './drag-words.component.html',
  styles: [
  ]
})
export class DragWordsComponent implements OnInit {

  @Input()
  public Input_Datalist: string[] = [];

  @Input()
  public Input_placeholder:string = "";

  @Output()
  public Output_DataList = new EventEmitter<Array<string>>();

  showIndication=true;
  list_DataOutput: string[] = [];

  constructor(  private gameService:GamelService){  }

   ngOnInit(): void
   {
    this.list_DataOutput=[];

      this.gameService.CLEAR_LIST$.subscribe(_clear =>{
          this.next();
          this.gameService.CLEAR_LIST$.next(false);
      } );

  }

  public next(): void
  {
   this.list_DataOutput=[];
 }



  drop($event: CdkDragDrop<string[]>)
  {


    if ($event.previousContainer == $event.container) {
      moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex);
    }
    else {
      transferArrayItem($event.previousContainer.data, $event.container.data, $event.previousIndex, $event.currentIndex);
    }


    console.log("---Output_DataList----",this.list_DataOutput);

    if (this.list_DataOutput.length > 0) { this.showIndication = false; }
    else { this.showIndication = true; }

    this.Output_DataList.emit(this.list_DataOutput);
  }//------------------------drop-------------------------------------------


}
