import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FileConfigService } from 'src/app/services/fileConfig/file-config.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.page.html',
  styleUrls: ['./resource-table.page.scss'],
})
export class ResourceTablePage implements OnInit {

  rows = [];
  temp = [];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(private fileConfigService: FileConfigService, private router: Router,
    public alertCtrl: AlertController, private http: HttpClient) {
    this.fileConfigService.getResourceList('CT').map(res => res.json()).subscribe(response => {
      this.temp = [...JSON.parse(JSON.stringify(response))];

      this.rows = JSON.parse(JSON.stringify(response));
    });
  }

  ngOnInit() {
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.fileName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  download(event) {
    this.fileConfigService.downloadResource(event).subscribe(response => {

      let filename = '';
      const disposition = response.headers['content-disposition'];
      if (disposition && disposition.indexOf('attachment') !== -1) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
      }
      console.log(filename);
      console.log(response);
    });
    const alert = this.alertCtrl.create({
      message: 'File task successfully submitted!',
      subHeader: 'Success!',
      buttons: ['Dismiss']
    }).then(alert => alert.present());
  }

  saveData(blob, fileName) {
    const a = document.createElement('a');
    document.body.appendChild(a);

    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
