
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

  listCategories: Array<{ label: string, value: number }> = [];
  listSubCategories: any[] = [];
  form!: FormGroup;
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
    this.form = this.fb.group({
      cboGame: [, [Validators.required]],
    })
  }//-----------------------------------------------------------------

  getCategories() {

    this.listCategories.push(
      { label: "Puzzle Letters", value: 1 },
      { label: "Guess The Word", value: 2 },
      { label: "Trying The Word", value: 3 },
      { label: "Puzzle Words", value: 4 });
  }//-----------------------------------------------------------------

  submit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }


    let liSelected = this.form.value;

    console.log(liSelected.cboGame);

    switch (liSelected.cboGame) {
      case 1: {

        this.router.navigate(['puzzle-letters'], { relativeTo: this.route });
        break;
      }
      case 2: {

        this.router.navigate(['guess'], { relativeTo: this.route });
        break;
      }
      case 3: {
        this.router.navigate(['trying'], { relativeTo: this.route });
        break;
      }
      case 4: {
        this.router.navigate(['puzzle-words'], { relativeTo: this.route });
        break;
      }
    }



  }//-----------------------------------------------------------------


}
