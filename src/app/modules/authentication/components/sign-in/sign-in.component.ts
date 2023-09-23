import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { FieldValidateService } from '@core/services/field-validate.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { KeyStorage } from '@shared/services/key-storage.enum';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { environment } from 'src/environments/environment';
import { RedirectGuard } from './redirect-guard.guard';
import { catchError, of } from 'rxjs';







@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [RedirectGuard],

})
export class SignInComponent implements OnInit, AfterViewInit {
  structureForm!: FormGroup;
  modalForm!:FormGroup;
  messageError: string = '';
  @ViewChild(LoadingComponent) loading!: LoadingComponent;

  ShowDialog=false;
  modalTitle ="";
  modalTitle02 ="";

  list_Promos:  Array<{  KoLic:string,cupon:string,description:string,price:number,price_cupon:number ,value:string }> = [];
  listCategories : Array<{  label:string,value :string  }> = [];

  constructor(
    private route: Router,
    private fb: FormBuilder,
    protected fieldValidate: FieldValidateService,
    private http: HttpClient,
    private storageService: LocalStorageService,
    private translate: TranslateService,
    private redirectGuard : RedirectGuard,

    ) {
    this.structureForm = this.fb.group({
      username: [, [Validators.required]],
      password: [, [Validators.required]]
    });

    this.modalForm = this.fb.group({
      cboListOptions: [, [Validators.required]],

    });
  ;
  }
  ngOnInit(): void {
    // this.getCategories("es");

  }


  ngAfterViewInit(): void {   }

  submit()
  {
    if (this.structureForm.invalid) {
      this.structureForm.markAllAsTouched();
      return;
    }

    this.loading.setDisplay(true);
    this.messageError = '';
    const userName = this.structureForm.value.username;
    const password = this.structureForm.value.password;
    this.http.post(`${environment.apiUrl}/dt/auth/login/`, {
      userId: userName,
      password: password
    }).subscribe((resp: any) => {

      // debugger;

      this.storageService.save(KeyStorage.user, userName);
      this.storageService.save(KeyStorage.token, resp.token);
      setTimeout(() => {
        this.loading.setDisplay(false);
        this.route.navigateByUrl('/home');
      }, 700)
    }, (error) => {


      console.error(error);
      this.loading.setDisplay(false);
      if (error.status === 401)
      {
        setTimeout(() =>
        {
          this.messageError = this.translate.instant('signin.form.message_invalid');
          this.loading.setDisplay(false);
        }, 700)
        return;
      }
      //--------- ya se vencio la membresia
      if (error.status === 403)
      {
        this.options();
        this.ShowDialog=true;

      }

    });
  }

  paymentCancel()
  {

    this.ShowDialog=false;
  }

  payment ()
  {


    if (this.modalForm.invalid) {
      this.modalForm.markAllAsTouched();
      return;
    }

    const userName = this.structureForm.value.username;
    let _CvePromo = this.modalForm.value.cboListOptions;
    let _price_complete =0;
    let _price_cupon  =0;
    let _cupon  ="";
    const _result =  this.list_Promos.find(x => x.KoLic === _CvePromo);

    _price_complete = _result!.price
    _price_cupon= _result!.price_cupon
    _cupon = _result!.cupon



    this.http.post(`${environment.apiUrl}/dt/auth/stripe_checkout/`,
    {
      userId: userName,
      KoLic: _CvePromo,
      price_complete: _price_complete,
      price_cupon : _price_cupon,
      cupon: _cupon
    }).subscribe((resp: any) =>
    {

        this.loading.setDisplay(false);
        let navigationExtras: NavigationExtras = {    queryParams: { 'stripeURL':resp.stripe_url }   };
        this.route.navigate(['paymentURL'],navigationExtras);



    }, (error) =>
    {
      this.loading.setDisplay(false);
      if (error.status === 401)
      {
        setTimeout(() =>
        {
          this.messageError = this.translate.instant('signin.form.message_invalid');
          this.loading.setDisplay(false);
        }, 700)
        return;
      }

    });




  }//-------------------------------------------------------------------------------

  options ()
  {


    this.list_Promos=[];
    this.listCategories=[];
    let  list_Promos:  Array<{  KoLic:string,cupon:string,description:string,price:number,price_cupon:number ,value:string }> = [];
   let  _listCategories : Array<{  label:string,value :string  }> = [];



    this.http.get(`${environment.apiUrl}/dt/auth/s_available_products`,
    {

    }).subscribe((resp: any) =>
    {
            this.loading.setDisplay(false);
            this.modalTitle =resp.title.es;
            this.modalTitle02 =resp.title02.es;

            resp.Options.forEach(function (_item:any)
                      {
                        list_Promos.push ({  KoLic:_item.KoLic,cupon:_item.cupon,description:_item.description.es
                                                  ,price:_item.price,price_cupon:_item.price_cupon ,value:_item.es });
                        _listCategories.push ({  label:_item.value.es ,value:_item.KoLic  });

                      });
            this.list_Promos = list_Promos;
            this.listCategories = _listCategories;




    }, (error) =>
    {

      this.loading.setDisplay(false);
      if (error.status === 401)
      {
        setTimeout(() =>
        {
          this.messageError = this.translate.instant('signin.form.message_invalid');
          this.loading.setDisplay(false);
        }, 700)
        return;
      }

    });





  }//-------------------------------------------------------------------------------
  getCategories(_item:string) {


    if (_item=="en")
    {
      this.listCategories.push(
        { label: "Promo 01", value: "01M" },
        { label: "Promo 02", value: "02M"  },
        { label: "Promo 03", value: "03M"  },
        { label: "Promo 04", value: "04M"});
    }
    else
    {
      this.listCategories.push(
        { label: "Promo 01", value: "01M" },
        { label: "Promo 02", value: "02M" },
        { label: "Promo 03", value: "03M" },
        { label: "Promo 04", value: "04M" });

    }

  }//-----------------------------------------------------------------


}
