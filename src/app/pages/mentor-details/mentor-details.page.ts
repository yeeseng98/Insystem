import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WsApiService } from 'src/app/services/wsApiService/ws-api.service';
import { AppLauncherService } from 'src/app/services/appLauncherService/app-launcher.service';
import { StaffDirectory } from 'src/app/interfaces/staff-directory';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { StudentProfile } from 'src/app/interfaces/student-profile';

@Component({
  selector: 'app-mentor-details',
  templateUrl: './mentor-details.page.html',
  styleUrls: ['./mentor-details.page.scss'],
})
export class MentorDetailsPage implements OnInit {

  profile$: Observable<StudentProfile>;
  staff$: Observable<StaffDirectory>;
  staffExists = true;

  constructor(private router: Router,
              private ws: WsApiService,
              private appLauncherService: AppLauncherService) { }

  ngOnInit() {

    this.profile$ = this.ws.get<StudentProfile>('/student/profile');

    this.profile$.subscribe(std => {
      this.staff$ = this.ws.get<StaffDirectory[]>('/staff/listing', { caching: 'cache-only' }).pipe(
        map(ss => {
          const staffRecord = ss.find(s => s.ID === std.MENTOR_SAMACCOUNTNAME);
          staffRecord ? this.staffExists = true : this.staffExists = false;
          return staffRecord;
        }),
        share(),
      );
    });
  }

  chatInTeams(lecturerCasId: string) {
    const androidSchemeUrl = 'com.microsoft.teams';
    const iosSchemeUrl = 'microsoft-teams://';
    const webUrl = `https://teams.microsoft.com/_#/apps/a2da8768-95d5-419e-9441-3b539865b118/search?q=?${lecturerCasId}`;
    const appStoreUrl = 'https://itunes.apple.com/us/app/microsoft-teams/id1113153706?mt=8';
    const appViewUrl = 'https://teams.microsoft.com/l/chat/0/0?users=';
    // tslint:disable-next-line: max-line-length
    const playStoreUrl = `https://play.google.com/store/apps/details?id=com.microsoft.teams&hl=en&referrer=utm_source%3Dgoogle%26utm_medium%3Dorganic%26utm_term%3D'com.microsoft.teams'&pcampaignid=APPU_1_NtLTXJaHKYr9vASjs6WwAg`;
    this.appLauncherService.launchExternalApp(
      iosSchemeUrl,
      androidSchemeUrl,
      appViewUrl,
      webUrl,
      playStoreUrl,
      appStoreUrl,
      `${lecturerCasId}@staffemail.apu.edu.my`);
  }

  navigateToIconsult(staffId: string) {
    // this.router.navigate(['staffs', staffId, 'consultations']);
  }
}
