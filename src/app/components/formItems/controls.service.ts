import { Injectable } from '@angular/core';
import { ControlDescriptor } from './control';
import { SelectControl } from './select.control';
import { TextareaControl } from './textarea.control';
import { TextboxControl } from './textbox.control';
import { MultiControl } from './multi.control';
import { FileControl } from './file.control';

@Injectable()
export class ControlsService {

  getControls(descriptors: ControlDescriptor[]) {
    let controls = descriptors.map((descriptor, index) => {
      let options = {
        ...descriptor,
        type: descriptor.type,
        key: descriptor.name,
        label: descriptor.title,
        value: '',
        required: descriptor.required,
        order: descriptor.order
      };

      console.log(options);
      switch (descriptor.type) {
        case 'text':
        case 'number':
          return new TextboxControl(options);
        case 'textarea':
          return new TextareaControl(options);
        case 'select':
          return new SelectControl(options);
        case 'multi':
          return new MultiControl(options);
        case 'file':
          return new FileControl(options);
        default:
          console.error(`${descriptor.type} is not supported`);
      }
    });

    return controls.filter(x => !!x).sort((a, b) => a.order - b.order);
  }

}
