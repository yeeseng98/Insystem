import { ControlBase } from './control-base';

export class FileControl extends ControlBase<string> {
  controlType = 'file';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}