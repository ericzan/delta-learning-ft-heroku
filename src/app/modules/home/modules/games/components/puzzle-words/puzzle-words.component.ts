import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ResponseZan } from '../../data.interfaces';
import { wordstouserModel } from '../../data.interfaces';
import { sentenceModel } from '../../data.interfaces';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';


@Component({
  selector: 'zan-puzzle-words',
  templateUrl: './puzzle-words.component.html',
  styleUrls: ['./puzzle-words.component.scss']
})
export class PuzzleWordsComponent implements OnInit {

  openSpinner: boolean = false;
  public list_01_Data: string[] = [];
  public list_02_Data: string[] = [];
  sentenceWord_ouput_Org: Array<{ Id: number, Value: string }> = [];
  sentenceWord_ouput_Des: Array<{ Id: number, Value: string }> = [];

  formHowMatySentences!: FormGroup;

  totalWords: number = 0;

  lbl_Div = "1 / " + this.totalWords.toString();
  lbl_Averge = "0";
  lbl_Grade = "100";

  list_Words_Process: Array<{ espaniol: string, value: number, ingles: string }> = [];
  list_Words_Request: Array<string> = [];

  list_Words_API: ResponseZan[] = [];
  totalWordsAPI = 0;
  totalSentences = 0;
  totalGrade = 100;
  totalGradeAcum = 0;
  itemActual = 0;
  itemActualSentence = "";
  level = "";
  showIndication = true;

  // list_Words_View: Array<{ espaniol: string, value: number, ingles: string }> = [];


  buttonVisible = false;
  orgSentence = "";
  ViewOpen: String = "guess";

  public msjParamsAlert: Array<{ TypeMessge: string, ShowAlert: boolean, Messge: string, Comment: string }> = [];


  constructor(private uiOperGrService: UiOperGrService,) { }

  ngOnInit(): void {
    this.fn_ShowMessage("", false, "", "", false);

  }//-----------------------------ngOnInit--------------------------------------


  drop($event: CdkDragDrop<string[]>) {




    if ($event.previousContainer == $event.container) {
      moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex);

    }
    else {


      transferArrayItem($event.previousContainer.data, $event.container.data, $event.previousIndex, $event.currentIndex);


    }
    console.log(this.list_02_Data.length);

    if (this.list_02_Data.length > 0) { this.showIndication = false; }
    else { this.showIndication = true; }

  }//------------------------drop-------------------------------------------

  fn_ShowMessage(_TypeMessge: string, _ShowAlert: boolean, _Messge: string, _Comment: string, _Sound: boolean) {

    if (_Sound) {
      if (_TypeMessge === "Error" || _TypeMessge === "Alert") { this.doing_beep(400, 350); }
      else { this.doing_beep(200, 800); }

    }


    this.msjParamsAlert = [{ TypeMessge: _TypeMessge, ShowAlert: _ShowAlert, Messge: _Messge, Comment: _Comment }];
  }//------------------------------------------------------------


  doing_beep(long_of_beep: number, freq: number) {

    var context = new AudioContext();
    var oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = freq;
    oscillator.connect(context.destination);
    oscillator.start();

    setTimeout(function () { oscillator.stop(); }, long_of_beep);
  }//-----------------------------------------------------------------------------------------


  fn_List_Words_Des_Input(_list_02_Data: string[]) {

    this.list_02_Data = _list_02_Data;

  }//------------------------------


  fn_StarGame_Input(_list_Words_API: ResponseZan[]) {


    console.log("-------   desde fn_StarGame_Input -- ");
    console.log(_list_Words_API);



    this.list_Words_API = _list_Words_API;


    if (this.list_Words_API.length > 0) {

      this.level = this.list_Words_API[0].level;
      this.totalSentences = this.list_Words_API[0].sentences.length;

      if (this.totalSentences > 0) { this.buttonVisible = true; }



      this.fn_StarGame(); //------------- function
    }

  }//--------------------------------------------------------------

  fn_StarGame() {
    //-- objetivo : se busca la primer frace a validar
    //-- EricZan  : 20Agt23

    this.showIndication = true;

    let li = 0;
    this.sentenceWord_ouput_Org = [];
    this.sentenceWord_ouput_Des = [];
    this.totalGrade = 100;
    this.lbl_Grade = this.totalGrade.toString();

    if ((this.itemActual + 1) <= this.totalSentences) {
      this.itemActualSentence = this.list_Words_API[0].sentences[this.itemActual].sentence;
      this.list_01_Data = [];
      this.list_02_Data = [];

      //------ prepara la palabra para presentar en pantalla --------
      this.list_Words_API[0].sentences[this.itemActual].wordstouser.forEach((_word) => {
        this.list_01_Data.push(_word.value);

        this.sentenceWord_ouput_Org.push({ Id: li, Value: _word.value.trim() });
        li++;

      });



      console.log("------------ inicia :  fn_StarGame() ()-----------")
      console.log(this.list_01_Data);

    }
    if ((this.itemActual + 1) > this.totalSentences) {
      //--------------- terina el juego

      this.fn_SaveData();

    }




  }//--------------------------------------------



  fn_SaveData() {

    this.openSpinner = true;
    this.buttonVisible = false;
    let _words = "";
    let _ulevel = this.level;
    let _avg = Number(this.lbl_Averge);
    let _hms = (this.itemActual);

    this.list_Words_Request.forEach((_value) => { _words = _words + "'" + _value + "',"; });

    _words = _words.substr(0, _words.length - 1);
    _words = "[" + _words + "]";

    console.log(_words);

    this.uiOperGrService.getGamesAAPuzzleWords({
      "org": "DTL-01",
      "ulevel": _ulevel,
      "kog": "puzzlewords",
      "hms": _hms,
      "words": _words,
      "avg": _avg,
      "setlevel": true,
    }).subscribe((resp: any) => {
      console.log('- ---- respondio busqueda api------');
      console.log(resp);


      this.openSpinner = false;

      this.fn_ShowMessage("Exito", true, "That is great.... Good Job!!!", "", true);



    }
      , (_error) => {
        console.log('----- erro API  (2)----');
        console.log(_error);
        let _msj = '';

        try { _msj = _error.error.detail.toString(); }
        catch (e: any) { _msj = ' Error http://'; }
        finally { }


        this.openSpinner = false;
        this.fn_ShowMessage('Error', true, 'Communication error http:// ', _msj, false);
        return;

      }
    );



  }//---------------------------------------------------------


  fn_ValidatData() {


    let wordPuzzole = "";
    let wordSentence = "";
    let listValues: string[] = this.itemActualSentence.split(" ");
    let wordSpanish = this.list_Words_API[0].sentences[this.itemActual].exTarget.trim().toLowerCase();



    listValues.forEach(function (_item) { wordSentence = wordSentence + _item.trim().toLowerCase(); });



    this.list_02_Data.forEach(function (_item) { wordPuzzole = wordPuzzole + _item.trim().toLowerCase(); });


    console.log(wordPuzzole + "  <----------->  " + wordSentence + "  <----------->  " + this.itemActualSentence)
    if (wordPuzzole === wordSentence) {
      console.log("--adivino ---");

      this.list_Words_Process.push({ espaniol: wordSpanish, value: (this.itemActual + 1), ingles: this.itemActualSentence.trim().toLowerCase() });
      this.list_Words_Request.push(this.itemActualSentence);

      this.itemActual = this.itemActual + 1;
      this.totalGradeAcum = this.totalGradeAcum + this.totalGrade;
      this.fn_Averege();

      this.fn_ShowMessage("Success", true, " Yes, it is right!!!!  ", "", true);

      this.fn_StarGame();
    }
    else {
      this.fn_ShowMessage("Alert", true, " Sorry, try again!!!!: ", "", true);

      this.totalGrade = this.totalGrade - 10;
      if (this.totalGrade < 0) { this.totalGrade = 0; }

      this.lbl_Grade = this.totalGrade.toString();
    }



  }//---------------------------------------------------

  fn_Averege() {


    this.lbl_Div = (this.itemActual).toString() + " / " + this.totalSentences.toString()

    this.lbl_Averge = (this.totalGradeAcum / (this.itemActual)).toFixed(2).toString();;


  }


}//--------- ******** principal ****************** ---------------------
