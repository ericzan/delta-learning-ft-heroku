import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldValidateService } from '@core/services/field-validate.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent {
  @ViewChild(LoadingComponent) loading!: LoadingComponent;
  sigUpForm!: FormGroup;
  messageError="";

  displayDialog=false;


  constructor(
    private route: Router,
    private fb: FormBuilder,
    protected fieldValidate: FieldValidateService,
    private http: HttpClient,
    private storageService: LocalStorageService,
    private translate: TranslateService
    ) {
    this.sigUpForm = this.fb.group({
      user: [, [Validators.required]],
      name: [, [Validators.required]],
      password: [, [Validators.required]],
      passwordConfirm: [, [Validators.required]],
      email: [, [Validators.required]],
      emailConfirm: [, [Validators.required]],

    });
  }

  submit(   ){

    if (this.sigUpForm.invalid) {
      this.sigUpForm.markAllAsTouched();
      return;
    }

    this.loading.setDisplay(true);

    const _user = this.sigUpForm.value.user;
    const _name = this.sigUpForm.value.name;
    const _password = this.sigUpForm.value.password;
    const _email = this.sigUpForm.value.email;


    this.http.post(`${environment.apiUrl}/dt/auth/signup/`,
    {
      userId: _user,
      name: _name,
      password: _password,
      email: _email,
      lang    : "Sp"
    }).subscribe((resp: any) =>
    {

      console.log("---- registri ---",resp);
        this.loading.setDisplay(false);
        this.displayDialog = true;

        this.messageError = "El proceso ha sido exitoso, favor de revisar su correo electrónico.";

      }, (error) => {

                        console.log("---- error ---",error);

                        this.messageError = error.statusText
                        this.loading.setDisplay(false);

                        this.displayDialog = true;
                        // if (error.status === 401)
                        // {
                        //   setTimeout(() =>
                        //   {
                        //     this.messageError = 'Error : ';
                        //     this.loading.setDisplay(false);
                        //   }, 700)
                        //   return;
                        // }
                      });
  }

fnCerrar()
{




}

}
