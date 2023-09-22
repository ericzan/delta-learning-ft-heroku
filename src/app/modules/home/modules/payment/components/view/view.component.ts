import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyStorage } from '@shared/services/key-storage.enum';
import { LocalStorageService } from '@shared/services/local-storage.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  userId: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage: LocalStorageService,

    ) { }


  ngOnInit(): void {

    this.userId = String(this.storage.load(KeyStorage.user));

     this.router.navigate(['payment'], { relativeTo: this.route });


  }//-----------------------------------------------------------------



}
