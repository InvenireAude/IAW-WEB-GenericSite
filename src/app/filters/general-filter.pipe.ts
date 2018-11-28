import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generalfilter',
  pure: false
})

export class GeneralFilterPipe implements PipeTransform {
  transform(items: any[], filter: any): any[] {
    if (!items || !filter) {
      return items;
    }
    return items.filter((item: any) => this.applyFilter(item, filter));
  }

  applyFilter(item: any, filter: any): boolean {

    for (const field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (item[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (item[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
