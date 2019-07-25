import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestProvService } from '../../services/testProv/test-prov.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public stdName;
  public stdEmail;
  public id;

  constructor(private route: ActivatedRoute, private testProv: TestProvService) {

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.stdName = params['stdName'];
      this.stdEmail = params['stdEmail'];
    });
    console.log(this.stdName);

  }

  updateTest(id) {
    let result;

    this.testProv.updateList(id, 'TEST').subscribe(response => result = response);
    console.log(result);
  }

  ngOnInit() { }

}
