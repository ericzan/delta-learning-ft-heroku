
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldValidateService } from '@core/services/field-validate.service';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';
import { KeyStorage } from '@shared/services/key-storage.enum';
import { LocalStorageService } from '@shared/services/local-storage.service';




@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})

export class ViewComponent
  implements OnInit {

  listLevel: Array<{ label: string, value: number }> = [];
  listSubCategories: any[] = [];
  formLevel!: FormGroup;
  resp: any[] = [];
  userId: string = '';


  constructor(private fb: FormBuilder,
    private uiOperGrService: UiOperGrService,
    protected fieldValidate: FieldValidateService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: LocalStorageService) { }


  ngOnInit(): void {

    this.userId = String(this.storage.load(KeyStorage.user));
    this.getCategories();
    this.formLevel = this.fb.group({
      cboLevel: [, [Validators.required]],
    })
  }//-----------------------------------------------------------------

  getCategories() {

    this.listLevel.push({ label: "English Words Level Evaluation", value: 1 });
  }//-----------------------------------------------------------------

  submit() {

    if (this.formLevel.invalid) {
      this.formLevel.markAllAsTouched();
      return;
    }



    console.log(" entro ");
    let liSelected = this.formLevel.value;


    if (liSelected.cboLevel == 1) {
      this.router.navigate(['english'], { relativeTo: this.route });

    }


    // if (liSelected.cobLevel == 2 )
    // {this.router.navigate(['trying'],{ relativeTo: this.route }) ;}


  }//-----------------------------------------------------------------


}
