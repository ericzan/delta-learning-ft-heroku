import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldValidateService } from '@core/services/field-validate.service';
import { HttpService } from '@core/services/http.service';
import { Translatei18Service } from '@core/services/translatei18.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';
import { KeyStorage } from '@shared/services/key-storage.enum';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [MessageService]
})
export class ViewComponent implements AfterViewInit {
  @ViewChild(LoadingComponent) loading!: LoadingComponent;
  form!: FormGroup;
  formPassword!: FormGroup;
  listLenguage = [
    {
    label: 'Es',
    value: 'es'
    },
    {
    label: 'En',
    value: 'en'
    }
  ]
  constructor(
    protected fieldValidate: FieldValidateService,
    private fb: FormBuilder, 
    private uiOperGrService: UiOperGrService,
    private messageService: MessageService, 
    private translatei18Service: Translatei18Service
    ) {
    this.form = fb.group({
      username: [{
        value: '',
        disabled: true
      }, []],
      email: [{
        value: '',
        disabled: true
      }, []],
      fullName: [{
        value: '',
        disabled: true
      }, []],
      contactEmail: [{
        value: '',
        disabled: true
      }, []],
      contactId: [{
        value: '',
        disabled: true
      }, []],
      contactName: [{
        value: '',
        disabled: true
      }, []],
      native_lang: [{
        value: '',
        disabled: true
      }, []],
      country_birth: [{
        value: '',
        disabled: true
      }, []],
      country_res: [{
        value: '',
        disabled: true
      }, []]
    });
    this.formPassword = this.fb.group({
      currentPassword: [,[Validators.required]],
      newPassword: [,[Validators.required]]
    });
  }
  ngAfterViewInit(): void {
    this.loading.setDisplay(true);
    this.getConfig();
  }
  submit() {

  }
  selectedLenguage(event: any){
    console.log(event.value);
    this.translatei18Service.translate(event.value);
  }
  submitPassword() {
    if(this.formPassword.invalid){
      this.formPassword.markAllAsTouched();
      return;
    }
    this.loading.setDisplay(true);
    this.uiOperGrService.changePassword({
      oldkeypass: this.formPassword.value.currentPassword,
      newkeypass: this.formPassword.value.newPassword,
    }).subscribe( resp => {
      this.loading.setDisplay(false);
      this.messageService.add({ severity: 'info', summary: 'Actualización', detail: 'Se ha actualizado exitosamente tu contraseña' });
    }, error => {

    })
    console.log(this.formPassword.value);
  }
  getConfig() {
    this.uiOperGrService.getInfoUser().subscribe((resp: any) => {
      console.log(resp);
      let data: {
        birth_year: string,
        capacity: number,
        contactEmail: string,
        contactId: string,
        contactName: string,
        contactPhone: string,
        country_birth: string,
        country_res: string,
        month_year: string,
        name: string,
        native_lang: string,
        us_ctInsert: string,
        usemail: string,
        userId: string,
      } = resp;
      this.form.patchValue({
        username: data.userId,
        fullName: data.name,
        email: data.usemail,
        contactEmail: data.contactEmail,
        contactId: data.contactId,
        contactName: data.contactName,
        country_res: data.country_res,
        country_birth: data.country_birth,
        native_lang: data.native_lang,
      });
      this.loading.setDisplay(false);
    });
  }

}
