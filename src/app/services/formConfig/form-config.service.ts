import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormConfigService {

  private API: string = 'http://127.0.0.1:5000/';

  private taskSource = new BehaviorSubject('notask');
  currentTask = this.taskSource.asObservable();

  private adminAccess = new BehaviorSubject(false);
  isAdmin = this.adminAccess.asObservable();

  constructor(private http: Http) { }

  // This method gets dynamic form data from database.
  public getFormConfig(formId: string) {

    const params = {
      formId: formId,
    };

    return this.http.get(this.API + 'getForm', { search: params });
  }

  // This method pre-loads user-submitted form data.
  public getSubmittedFormData(fieldId: string, studentId: string, taskId: string) {

    const params = {
      fieldId: fieldId,
      stdId: studentId,
      taskId: taskId
    };

    return this.http.get(this.API + 'loadFormVal', { search: params });
  }

  // This method validates form name for uniqueness.
  public getExistingForms() {
    return this.http.get(this.API + 'formNameValidation');
  }

  // This method gets a list of form names with its ID.
  public getFormList() {
    return this.http.get(this.API + 'formList');
  }

  // This method is used for dynamic form creation.
  public submitNewForm(val: any) {
    const formName = val['fname'];
    const formField = val['cfields'];
    const form = {
      formId: this.varConvert(formName),
      fname: formName
    }
    this.http.post(this.API + 'newForm', form).subscribe(response => console.log(response));
    // tslint:disable-next-line: forin
    for (let i in formField) {
      let option = new Array();
      if (formField[i].options !== '') {
        option = formField[i].options.split(',').map(function (item) {
          return item.trim();
        });
      }

      const fieldKey = this.varConvert(formName) + this.varConvert(formField[i].title);

      const field = {
        fname: this.varConvert(formName),
        name: fieldKey,
        type: formField[i].type,
        required: formField[i].isRequired,
        display: formField[i].display,
        selected: formField[i].selected,
        title: formField[i].title,
        options: option
      };
      this.http.post(this.API + 'writeFields', field).subscribe(response => console.log(response));
    }
  }

  // This method handles student form data submission.
  public submitFormValues(val: any, taskId: any) {

    for (const propName in val) {
      if (val.hasOwnProperty(propName)) {
        console.log(propName);

        const propValue = val[propName];
        const isArray = val[propName] instanceof Array;
        const isFile = val[propName] instanceof File;

        // multi select
        if (isArray) {
          let selectArr = [];
          for (const selected in val[propName]) {
            if (val[propName].hasOwnProperty(selected)) {

              for (const value in val[propName][selected]) {
                if (val[propName][selected].hasOwnProperty(value)) {
                  if (!selectArr.includes(val[propName][selected][value])) {
                    selectArr.push(val[propName][selected][value]);
                  }
                }
              }

            }
          }
          const allSelected = selectArr.join(',');
          const fieldVal = {
            fieldName: propName,
            studentID: 'TP041800',
            fieldVal: allSelected,
            taskId: taskId
          };
          this.http.post(this.API + 'insertFormVal', fieldVal).subscribe(response => console.log(response));


        } else if (isFile) {
          // TODO
          console.log('field is file');

        } else {
          // single select
          if (val[propName].constructor === Object) {
            let data;

            for (const value in val[propName]) {
              if (val[propName].hasOwnProperty(value)) {
                data = val[propName][value];
              }
            }
            const fieldVal = {
              fieldName: propName,
              studentID: 'TP041800',
              fieldVal: data,
              taskId: taskId
            };

            this.http.post(this.API + 'insertFormVal', fieldVal).subscribe(response => console.log(response));
          }
        }
      } else {
        // normal text field
        const fieldVal = {
          fieldName: propName,
          studentID: 'TP041800',
          fieldVal: val[propName],
          taskId: taskId
        };

        this.http.post(this.API + 'insertFormVal', fieldVal).subscribe(response => console.log(response));

      }
    }

    const submission = {
      taskId: taskId,
      studentId: 'TP041800'
    };
    this.http.post(this.API + 'recordSubmission', submission).subscribe(response => console.log(response));
  }

  changeTasks(task: string) {
    this.taskSource.next(task);
  }

  changeAccess(cred: boolean) {
    this.adminAccess.next(cred);
  }

  varConvert(val) {
    return val.toLowerCase().replace(/\s/g, '');
  }
}
