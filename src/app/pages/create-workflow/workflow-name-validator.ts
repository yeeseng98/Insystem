import { FormControl } from '@angular/forms';
import { WorkflowConfigService } from 'src/app/services/workflowConfig/workflow-config.service';

export function UniqueName(workflowConfigService: WorkflowConfigService) {
    return function (control: FormControl) {
        let existingWorkflows = [];

        //window.sessionStorage.removeItem('existingWorkflows');
        if (window.sessionStorage.getItem('existingWorkflows') == null) {
            let json_data;

            workflowConfigService.getExistingFlows()
                .map(res => res.json())
                .subscribe(response => {
                    json_data = JSON.parse(JSON.stringify(response));

                    // console.log(json_data);

                    // tslint:disable-next-line: forin
                    json_data.forEach((element) => {
                        existingWorkflows.push(element.WorkflowID);
                    });

                    window.sessionStorage.setItem('existingWorkflows', JSON.stringify(existingWorkflows));
                });

        } else {

            existingWorkflows = JSON.parse(sessionStorage.getItem('existingWorkflows'));
            // console.log('existingWorkflows: ' + existingWorkflows);
        }

        const inputName = control.value.toLowerCase().replace(/\s/g, '');
        console.log(inputName);
        if (existingWorkflows.includes(inputName)) {
            console.log('true');
            return {
                uniqueName: true
            };
        }
        console.log('false');
        return null;
    };
}
