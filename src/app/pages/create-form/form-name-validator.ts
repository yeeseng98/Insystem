import { FormControl } from '@angular/forms';
import { FormConfigService } from '../../services/formConfig/form-config.service';

export function UniqueName(formConfigService: FormConfigService) {
    return function (control: FormControl) {
        let existingForms = [];

        //window.sessionStorage.removeItem('existingForms');
        if (window.sessionStorage.getItem('existingForms') == null) {
            let json_data;

            formConfigService.getExistingForms()
                .map(res => res.json())
                .subscribe(response => {
                    json_data = JSON.parse(JSON.stringify(response));

                    console.log(json_data);

                    // tslint:disable-next-line: forin
                    json_data.forEach((element) => {
                        existingForms.push(element.FormID);
                    });

                    window.sessionStorage.setItem('existingForms', JSON.stringify(existingForms));
                });

            console.log('json_data: ' + existingForms);
        } else {
            console.log('sessionstore exists');

            existingForms = JSON.parse(sessionStorage.getItem('existingForms'));
            console.log('existingForms: ' + existingForms);
        }

        const inputName = control.value.toLowerCase().replace(/\s/g, '');
        console.log(inputName);
        if (existingForms.includes(inputName)) {
            console.log('true');
            return {
                uniqueName: true
            };
        }
        console.log('false');
        return null;
    };
}
