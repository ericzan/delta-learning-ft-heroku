import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldValidateService } from '@core/services/field-validate.service';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-supportoth',
  templateUrl: './supportoth.component.html',
  styleUrls: ['./supportoth.component.scss']
})
export class SupportothComponent implements OnInit {

  form!:FormGroup;
  list_koh: Array<{ label: string, value: string }> = [];
  userId="";
  userName="";
  public msjParamsAlert: Array<{ TypeMessge: string, ShowAlert: boolean, Messge: string, Comment: string }> = [];
  openSpinner=false;


  constructor(protected fieldValidate: FieldValidateService,
    private fb: FormBuilder,
    private uiOperGrService: UiOperGrService,
)
{

  this.form = this.fb.group({ selected_koh: [null],
    asunto: [{value: '',disabled: false},[Validators.required]],
    descripcion: [{value: '',disabled: false},[Validators.required]],  });


} //----------------------------------------------------------





  ngOnInit(): void
  {

    this.fn_ShowMessage("", false, "", "");
    this.userData();


  }

fn_cancel(){

  window.location.reload();
}

fn_Send (){

let _classification = this.form.value.selected_koh.trim();
let _subject = this.form.value.asunto.trim();
let _longdescription = this.form.value.descripcion.trim();

if(this.form.invalid){
  this.form.markAllAsTouched();
  return;
}

  this.openSpinner = true;
  this.uiOperGrService.setAskForSupportoth({
    classification: _classification,
    subject: _subject,
    longdescription: _longdescription


  }).subscribe((resp: any) =>
  {
    console.log("---------- respondio guardar datos api ---------");
    console.log(resp);

    this.openSpinner = false;

    this.fn_ShowMessage("Exito", true, "los datos se guardaron correctamente ","");


  } , (error) => {

      console.log('----- erro API  (2)----');
      console.log(error);

      let _msj = error.error.detail.toString();
      this.openSpinner = false;
      this.fn_ShowMessage("Error", true, "Tcommunication error http:// ", _msj);
      return;

    }
  );


}//----------------------------------

userData ()
{


this.openSpinner = true;
this.uiOperGrService.getTDT().subscribe((resp: any) =>
{
  console.log("---------- respondio guardar datos api ---------");
  console.log(resp);
  this.list_koh = resp.koh.map((value: any) => ({
                          label: value.text,
                          value: value.value
                                        })), catchError(e => {
                                          console.log('----- erro API ----');
                                          this.openSpinner = false;
                                          return of(null);
                                        });


  this.openSpinner = false;

this.userId = resp.user;
this.userName = resp.name;

  if (this.list_koh.length > 0) { }
  else { this.fn_erroAPI(); }

} , (error) => {

    console.log('----- erro API  (2)----');
    console.log(error);

    let _msj = error.error.detail.toString();
    this.openSpinner = false;
    this.fn_ShowMessage("Error", true, "Tcommunication error http:// ", _msj);
    return;

  }
);


}//---------------------



fn_ShowMessage(_TypeMessge: string, _ShowAlert: boolean, _Messge: string, _Comment: string ) {


  this.msjParamsAlert = [{ TypeMessge: _TypeMessge, ShowAlert: _ShowAlert, Messge: _Messge, Comment: _Comment }];
}//------------------------------------------------------------


fn_erroAPI() {

  console.log('------ erro api ----');

  this.fn_ShowMessage("Error", true, " Error", " contact admin");
  return;


}//----------------------------------------------



}//  ************************* princpal ******************************************
