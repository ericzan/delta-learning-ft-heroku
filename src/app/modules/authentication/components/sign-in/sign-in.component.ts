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


  listCategories: Array<{ label: string, value: string }> = [];


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
    this.getCategories("es");
  }


  ngAfterViewInit(): void {   }

  submit() {
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
      if (error.status === 403)
      {
        this.ShowDialog=true;

      }

    });
  }

  paymentCancel(){

    this.ShowDialog=false;
  }

  payment ()
  {


    if (this.modalForm.invalid) {
      this.modalForm.markAllAsTouched();
      return;
    }

    let _CvePromo = this.modalForm.value.cboListOptions;

    const userName = this.structureForm.value.username;
    this.http.post(`${environment.apiUrl}/dt/auth/stripe_checkout/`,
    {
      userId: userName,
      KoLic: _CvePromo,
      price_complete: 1500,
      price_cupon : 750,
      cupon: "abc"
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

  getCategories(lang:string) {

    if (lang=="en")
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
