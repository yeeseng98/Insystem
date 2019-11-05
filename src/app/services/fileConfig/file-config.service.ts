import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FileConfigService {
  private API: string = 'http://127.0.0.1:5000/';

  constructor(public http: Http, public alertCtrl: AlertController) { }

  // submission for file type tasks
  public insertFile(val: any, taskId: string, studentId: string) {

    const _formData = new FormData();
    _formData.append('file', val, val.name);
    _formData.append('studentId', studentId);
    _formData.append('taskId', taskId);

    this.http.post(this.API + 'fileTaskSub', _formData).subscribe(response => {
      if (response.status === 200) {
        this.generateAlert('Task is successfully submitted!');
      } else {
        this.generateAlert('Some error has occured, please try again later.');
      }
    });

    const submission = {
      taskId: taskId,
      studentId: studentId
    };
    this.http.post(this.API + 'recordSubmission', submission).subscribe(response => {
      if (response.status === 200) {
        this.generateAlert('Submission is recorded!');
      } else {
        this.generateAlert('Some error has occured, please try again later.');
      }
    });
  }

  // fetch existing submitted filename
  public getExistingFormFile(formatId: string, studentId: string, taskId: string) {
    const params = {
      formatId: formatId,
      studentId: studentId,
      taskId: taskId
    };

    return this.http.get(this.API + 'getFormFile', { search: params });
  }

  // fetch existing submitted filename
  public getExistingTaskFile(studentId: string, taskId: string) {
    const params = {
      studentId: studentId,
      taskId: taskId
    };

    return this.http.get(this.API + 'getTaskFile', { search: params });
  }

  // get intern resource list of names
  public getResourceList(facultyId: any) {
    const params = {
      facultyId: facultyId
    };

    return this.http.get(this.API + 'getFileList', { search: params });
  }

  // insert new internship resource
  public insertResource(val: any, tFaculty: string) {
    const _formData = new FormData();
    _formData.append('file', val, val.name);
    _formData.append('tFaculty', tFaculty);

    this.http.post(this.API + 'insertResource', _formData).subscribe(response => {
      if (response.status === 200) {
        this.generateAlert('Resource inserted successfully!');
      } else {
        this.generateAlert('Some error has occured, please try again later.');
      }
    });
  }

  // download file
  public downloadResource(fileId: string) {
    const params = {
      fileId: fileId
    };

    return this.http.get(this.API + 'getFile', { search: params });
  }

  // delete resource
  public deleteResource(fileId: string) {
    const params = {
      fileId: fileId
    };

    this.http.post(this.API + 'deleteResource', params).subscribe(response => {
      if (response.status === 200) {
        this.generateAlert('Resource deleted successfully!');
      } else {
        this.generateAlert('Some error has occured, please try again later.');
      }
    });
  }

  generateAlert(response) {
    const alert = this.alertCtrl.create({
      message: response,
      buttons: ['Dismiss']
    }).then(alert => alert.present());

    return alert;
  }
}
