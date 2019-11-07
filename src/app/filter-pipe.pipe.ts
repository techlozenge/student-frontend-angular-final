// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'filterPipe'
// })
// export class FilterPipePipe implements PipeTransform {

//   transform(value: any, ...args: any[]): any {
//     return null;
//   }

// }

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(list: any[], value: string) {

    return value ? list.filter(item => item.gender === value) : list;
  }
}
