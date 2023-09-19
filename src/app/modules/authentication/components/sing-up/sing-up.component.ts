import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldValidateService } from '@core/services/field-validate.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent {

  sigUpForm!: FormGroup;
  messageError="";

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

    });
  }

  submit(){}
}
