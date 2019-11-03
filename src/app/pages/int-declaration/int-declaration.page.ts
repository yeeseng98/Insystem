import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentProfile } from 'src/app/interfaces/student-profile';
import { WsApiService } from 'src/app/services/wsApiService/ws-api.service';
import { SettingsService } from 'src/app/services/settings.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StudentConfigService } from 'src/app/services/studentConfig/student-config.service';

@Component({
  selector: 'app-int-declaration',
  templateUrl: './int-declaration.page.html',
  styleUrls: ['./int-declaration.page.scss'],
})
export class IntDeclarationPage implements OnInit {

  profile$: Observable<StudentProfile>;
  public form: FormGroup;
  public matchError = false;

  constructor(private ws: WsApiService, private settings: SettingsService,
              private _FB: FormBuilder, private sConfig: StudentConfigService) {
    this.profile$ = this.ws.get<StudentProfile>('/student/profile');

    this.form = this._FB.group({
      name: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
  }

  verify(val: any) {
    let stdName, stdId, intake;
    this.profile$.subscribe(p => {
      stdName = p.NAME;
      stdId = p.STUDENT_NUMBER;
      intake = p.INTAKE;
    });

    if (val['name'] === stdName) {
      this.matchError = false;

      this.sConfig.confirmDeclaration(stdId, stdName, intake);
    } else {
      this.matchError = true;
    }
  }
}
