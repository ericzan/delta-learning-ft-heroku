import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldValidateService } from '@core/services/field-validate.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';
import { KeyStorage } from '@shared/services/key-storage.enum';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { dateTimeFormat } from '@shared/services/utils';
import * as moment from 'moment-timezone';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements AfterViewInit {
  @ViewChild(LoadingComponent) loading!: LoadingComponent;
  listCategories: any = [];
  listSubCategories: any[] = [];
  form!: FormGroup;
  resp: any[] = [];
  userId: string = '';
  constructor(private fb: FormBuilder,private uiOperGrService: UiOperGrService, protected fieldValidate: FieldValidateService, private router: Router, private route: ActivatedRoute, private storage: LocalStorageService) {
    this.form = this.fb.group({
      category: [, [Validators.required]],
      subCategory: [, [Validators.required]],
    });
    
  }
  ngAfterViewInit(): void {
    this.loading.setDisplay(true);
    this.userId = String(this.storage.load(KeyStorage.user));
    this.getCategories();
  }
  submit(){
    console.log(this.form.value);
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    let getSubCatId = this.form.value.subCategory;
    this.uiOperGrService.createPackage({
      idScat: getSubCatId,
      package: dateTimeFormat(),
      capacity: 8
      
    }).subscribe( (resp: any) => {
      this.router.navigate(['../','steps',getSubCatId ,resp.packageId, 1],{ relativeTo: this.route });
    });
  }
  getCategories() {
    this.uiOperGrService.getCategories().subscribe({
      next: (data: any) => {
        const resp: any[] = data.message;
        this.resp = resp;
        console.log(resp);
        this.listCategories = this.resp.map( row => ({
          label: row.Category,
          value: row.idCat
        }));
        this.loading.setDisplay(false);
      }
    })
  }
  getSubCategies(idCat: string){
    console.log('getSubCategies',idCat);
    const subCategories: any[] = this.resp.find(row => row.idCat === idCat).subcategories;
    this.listSubCategories = subCategories.map( row => ({
       label: row.subcategory,
       value: row.idSCat
    }))
  }
}
