import { Pipe, PipeTransform } from '@angular/core';
import { Status } from 'src/interfaces/Status';

@Pipe({
  name: 'capitalizarComEspacos'
})
export class CapitalizarComEspacosPipe implements PipeTransform {

  transform(status: Status): string {
    return status
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/(^\w{1})|(\s+\w{1})/g, (letra) => letra.toUpperCase());
  }

};
