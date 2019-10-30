import { Component, OnInit } from '@angular/core';
import { AccessConfigService } from 'src/app/services/accessConfig/access-config.service';
import { FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-authority-delegation',
  templateUrl: './authority-delegation.page.html',
  styleUrls: ['./authority-delegation.page.scss'],
})
export class AuthorityDelegationPage implements OnInit {

  public modifiablePages = [];

  constructor(private accessService: AccessConfigService) {
    accessService.getModPages().map(res => res.json()).subscribe(res => {
      const pages = JSON.parse(JSON.stringify(res));

      pages.forEach(element => {
        this.modifiablePages.push(element);
      });
    });
  }

  ngOnInit() {
  }

  public changeAuthority(event, pageId: string) {
    this.accessService.changeAuthority(event.target.value, pageId);
  }
}
