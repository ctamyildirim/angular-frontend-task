import { inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rateOrganiser'
})
export class RateOrganiserPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    value = Math.floor(value * 10) / 10
    value= value.toFixed(1)
    return value;
  }

}
