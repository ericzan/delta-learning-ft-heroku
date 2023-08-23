import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldValidateService } from '@core/services/field-validate.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { KeyStorage } from '@shared/services/key-storage.enum';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements AfterViewInit {
  structureForm!: FormGroup;
  messageError: string = '';
  @ViewChild(LoadingComponent) loading!: LoadingComponent;
  constructor(private route: Router, private fb: FormBuilder, protected fieldValidate: FieldValidateService, private http: HttpClient, private storageService: LocalStorageService) {
    this.structureForm = this.fb.group({
      username: [, [Validators.required]],
      password: [, [Validators.required]]
    });
  }
  ngAfterViewInit(): void {
  }
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
      this.loading.setDisplay(false);
      if (error.status === 401) {
        setTimeout(() => {
          this.messageError = 'Usuario o contraseña invalidos';
          this.loading.setDisplay(false);
        }, 700)
        return;
      }
    });
  }
}
