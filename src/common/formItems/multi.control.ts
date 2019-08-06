import { ControlBase } from './control-base';

export class MultiControl extends ControlBase<string> {
  controlType = 'multi';
  options: { key: string, value: string }[] = [];

  constructor(options: {} = {}) {
    super(options);

    this.options = options['options'] || [];
  }
}