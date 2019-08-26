import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class FileConfigService {
  private API: string = 'http://127.0.0.1:5000/';

  constructor(public http: Http) { }

  // submission for file type tasks
  public insertFile(val: any, taskId: string) {

    const _formData = new FormData();
    _formData.append('file', val, val.name);
    _formData.append('studentId', 'TP041800');
    _formData.append('taskId', taskId);

    this.http.post(this.API + 'fileTaskSub', _formData).subscribe(response => console.log(response));
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
  public insertResource(val: any) {

  }


}
