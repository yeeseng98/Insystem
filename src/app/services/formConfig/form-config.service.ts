import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class FormConfigService {

  private API: string = 'http://127.0.0.1:5000/';

  constructor(private http: Http) { }

  // This method gets dynamic form data from database.
  public getFormConfig() {
    return this.http.get(this.API + 'getForm');
  }

  // This method pre-loads user-submitted form data.
  public getSubmittedFormData(fieldId: string, studentId: string) {

    // let params: URLSearchParams = new URLSearchParams();
    // params.set('fieldId', fieldId);
    // params.set('stdId', studentId);
    const params = {
      fieldId: fieldId,
      stdId: studentId
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
  public submitFormValues(val: any) {

    for (const propName in val) {
      if (val.hasOwnProperty(propName)) {
        const propValue = val[propName];
        const isArray = val[propName] instanceof Array;
        const isFile = val[propName] instanceof File;

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
            fieldVal: allSelected
          };
          this.http.post(this.API + 'insertFormVal', fieldVal).subscribe(response => console.log(response));


        } else if (isFile) {
          // TODO
          console.log('field is file');

        } else {
          if (val[propName].constructor === Object) {
            let data;
            for (const value in val[propName]) {
              if (val[propName].hasOwnProperty(value)) {
                data = val[propName][value];

                const fieldVal = {
                  fieldName: propName,
                  studentID: 'TP041800',
                  fieldVal: data
                };
                this.http.post(this.API + 'insertFormVal', fieldVal).subscribe(response => console.log(response));

              }
            }
          } else {
            const fieldVal = {
              fieldName: propName,
              studentID: 'TP041800',
              fieldVal: val[propName]
            };
            this.http.post(this.API + 'insertFormVal', fieldVal).subscribe(response => console.log(response));

          }
        }
      }
    }
  }

  varConvert(val) {
    return val.toLowerCase().replace(/\s/g, '');
  }
}
