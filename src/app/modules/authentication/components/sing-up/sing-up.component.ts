import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldValidateService } from '@core/services/field-validate.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
  providers: [MessageService]
})
export class SingUpComponent
{
  @ViewChild(LoadingComponent) loading!: LoadingComponent;
  sigUpForm!: FormGroup;
  messageError="";

  displayDialog=false;
exito=false;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    protected fieldValidate: FieldValidateService,
    private http: HttpClient,
    private storageService: LocalStorageService,
    private translate: TranslateService,
    private messageService: MessageService,
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

  submit(   )
  {

    if (this.sigUpForm.invalid) {
      this.sigUpForm.markAllAsTouched();
      return;
    }

    if (!this.fnValidatePass())    {return ;}
    if (!this.fnValidateMail())    {return ;}

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
this.exito=true;
        this.messageError = "El proceso ha sido exitoso, favor de revisar su correo electrónico.";

      }, (error) => {

                        console.log("---- error ---",error);

                        this.messageError = error.statusText + "  Error : Intente denuevo "
                        this.loading.setDisplay(false);
                        this.displayDialog = true;
                        this.exito=false;



                      });
  }

fnCerrar()
{
  if(this.exito){this.route.navigate(['../sign-in']);}
  else{window.location.reload();}




}

fnValidateMail ()
{
  let _Return =false;

  const _email:string = this.sigUpForm.value.email;
  const _emailConfirm:string = this.sigUpForm.value.emailConfirm;

  if(_email.trim().toLowerCase() != _emailConfirm.trim().toLowerCase() )
  {

      this.messageService.add({ severity: 'error', summary: 'Actualización', detail: "El mail y la confirmación no son iguales"});
      return _Return;

  }

  if (!this.isEMail(_email)){
      this.messageService.add({ severity: 'error', summary: 'Actualización', detail: "El mail no tiene el formato adecuado"});
      return _Return;
  }

return true;
}

isEMail(email: string):boolean {
  let mailValido = false;

    var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(EMAIL_REGEX)){
      mailValido = true;
    }
  return mailValido;
}


fnValidatePass ()
{
  let _Return =false;

  const _password:string = this.sigUpForm.value.password;
  const _passwordConfirm:string = this.sigUpForm.value.passwordConfirm;

  if(_password.trim() != _passwordConfirm.trim() )
  {
      this.messageService.add({ severity: 'error', summary: 'Actualización', detail: "El password y la confirmación no son iguales"});
      return _Return;
  }

return true;
}
}
