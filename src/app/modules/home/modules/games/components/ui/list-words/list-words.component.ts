import { Component, Input } from '@angular/core';

@Component({
  selector: 'zan-list-words',
  templateUrl: './list-words.component.html',
  styles: [
  ]
})
export class ListWordsComponent {
  @Input()
  public Input_Div: string = "";
  @Input()
  public Input_Averge: string = "";
  @Input()
  public Input_List_Words_Process: Array<{ espaniol: string, value: number, ingles: string }> = [];

}
