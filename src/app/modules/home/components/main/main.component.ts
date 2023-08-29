import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  collapseHorizontallyAnimation,
} from 'angular-animations';
import { MenuItem } from 'primeng/api/menuitem';




@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    fadeInOnEnterAnimation({
      duration: 500
    }),
    fadeOutOnLeaveAnimation({
      duration: 300
    }),
    collapseHorizontallyAnimation()
  ]
})
export class MainComponent implements OnInit {




  items: MenuItem[] | undefined;

  displayMenuMovil = false;

  infoUser: any = {
    name: ''
  };
  constructor(private router: Router, private uiOperGrService: UiOperGrService) {

  }
  ngOnInit(): void {
    this.getConfig();
    this.fn_inicioArray();
  }
  logaout() {
    this.router.navigateByUrl('/login');
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
      this.infoUser = data;
    });
  }
  toggleMenuMovil() {

    this.displayMenuMovil = !this.displayMenuMovil;
  }

  fn_inicioArray() {

    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'User Configuration',
            routerLink: './user-configuration',
            command: () => { this.toggleMenuMovil(); }
          },
          {
            label: 'Level Evaluation',
            routerLink: './level',
            command: () => { this.toggleMenuMovil(); }
          },
          {
            label: '- - - - - - - - - - - - - - -',
            command: () => {  }
          },
          {
            label: 'Games',
            routerLink: './games',
            command: () => { this.toggleMenuMovil(); }
          }
        ]
      },

    ];


  }//--------------------- fn_inicioArray


}// -- ***************** pincipal *****************
