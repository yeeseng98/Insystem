import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileConfigService {
  private API: string = 'http://127.0.0.1:5000/';

  constructor(public http: HttpClient) { }

  public insertFile(val: any, taskId: string) {

    const _formData = new FormData();
    _formData.append('file', val, val.name);
    _formData.append('studentId', 'TP041800');
    _formData.append('taskId', taskId);

    console.log(_formData);
    this.http.post(this.API + 'fileSub', _formData).subscribe(response => console.log(response));
  }
}
