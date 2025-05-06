import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deepValue',
})
export class DeepValuePipe implements PipeTransform {
  transform(columnValue: any, deepValueField: string) {
    const splittedField = deepValueField.split('.');
    splittedField.forEach((field) => {
      columnValue = columnValue[field];
    });

    return columnValue;
  }
}
