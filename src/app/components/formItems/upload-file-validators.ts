import { FormControl } from '@angular/forms';

export function requiredFileType( type: string ) {
  return function ( control: FormControl ) {
    const file = control.value;

    if ( file ) {
      const extension = file.name.split('.')[1].toLowerCase();
      console.log(type);
      console.log(type);

      if ( type.toLowerCase() === extension.toLowerCase() ) {
        return null;
      }

      return {
        requiredFileType: true
      };
    }
    return {
      requiredFileType: true
    };
  };
}