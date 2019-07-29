import { Component, OnInit } from '@angular/core';
import { TestProvService } from '../../services/testProv/test-prov.service';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { User } from '../../models/User';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private nameArr: User[];

  constructor(public router: Router, private testProv: TestProvService) {
    this.testProv.getList().subscribe((nameList: User[]) => this.nameArr = nameList);
  }

  goToDetailsPage(user) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
          id: user.id,
          stdName: user.stdName,
          stdEmail: user.stdEmail
      }
    };
    this.router.navigate(['detail'], navigationExtras);
  }
  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
