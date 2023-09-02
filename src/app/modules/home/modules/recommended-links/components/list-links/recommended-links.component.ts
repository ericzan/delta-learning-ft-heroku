import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FieldValidateService } from '@core/services/field-validate.service';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { WathStepsLearningService } from '../../../steps-learning/services/wath-steps-learning.service';
import { WatchService } from '../../../steps-learning/verifying-ce/services/watch.service';


@Component({
  selector: 'zan-recommended-links',
  templateUrl: './recommended-links.component.html',
  styleUrls: ['./recommended-links.component.scss']
})
export class RecommendedLinksComponent implements OnInit{

  list_links: Array<{ logo:string,name: string, link: string, texttoshow: string ,imagelink:string}> = [];

  openSpinner: boolean = false;
  public msjParamsAlert: Array<{ TypeMessge: string, ShowAlert: boolean, Messge: string, Comment: string }> = [];
  ViewOpen: String = "";

  constructor(private fb: FormBuilder,
    private uiOperGrService: UiOperGrService,
    protected fieldValidate: FieldValidateService,
    private router: Router,
    private wathSteps: WathStepsLearningService,
    private watchService: WatchService) { }


  ngOnInit(): void {
    this.fn_ShowMessage("", false, "", "", false);
    this.fn_BuscaDatos_API();

  }//-------------------------------------------------

  fn_BuscaDatos_API()
  {

    console.log("----- fn_BuscaDatosAPI------");

    this.openSpinner = true;


    this.uiOperGrService.getRecLinks ().subscribe((resp: any) =>
    {
      console.log("- ---- respondio busqueda api------");
      console.log(resp);

      this.openSpinner = false;
      debugger;
      if (resp == undefined)
      {
        this.fn_ShowMessage("Error", true, "TypeError: Cannot read properties of undefined (reading 'map')", "", false);
        this.list_links =[];
        this.list_links.push({logo:"./assets/images/imagotipo.png",name:"There is no information",link:"",texttoshow:"",imagelink:""});

      }
      else{

                try {

                  this.list_links = resp.map((value: any) => ({
                                        logo:  value.logo == null ?"": value.logo.trim(),
                                        name:  value.name.trim(),
                                        link:  value.link.trim(),
                                        texttoshow:  value.texttoshow.trim(),
                                        imagelink:  value.imagelink.trim(),
                                })), catchError(e => {
                                                        console.log('----- erro API  catchError ----');
                                                        this.openSpinner = false;
                                                        this.fn_ShowMessage("Error", true, "Communication error http:// ", "", false);
                                                        return of(null);
                                                      });


                }
                catch (e: any) {
                  let _msj = e.toString();
                  this.fn_ShowMessage("Error", true, "Communication error http:// ", _msj, false);

                }
                finally { }






                if (this.list_links.length > 0) {   }
                else { this.fn_ShowMessage("Error", true, "There is no information", "", false);  }

      }





    } , (error) => {
                        console.log('----- erro API  (2)----');
                        console.log(error);
                        let _msj = "";

                        try { _msj = error.error.detail.toString(); }
                        catch (e: any) { _msj = " Error http://"; }
                        finally { }


                        this.openSpinner = false;
                        this.fn_ShowMessage("Error", true, "Communication error http:// ", _msj, false);
                        return;

                      }
    );



  }//_------------------------------------------------------------------------------------------------

  fn_ShowMessage(_TypeMessge: string, _ShowAlert: boolean, _Messge: string, _Comment: string, _Sound: boolean) {



    this.msjParamsAlert = [{ TypeMessge: _TypeMessge, ShowAlert: _ShowAlert, Messge: _Messge, Comment: _Comment }];
  }//------------------------------------------------------------


}
