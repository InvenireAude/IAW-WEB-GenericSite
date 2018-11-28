import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalfilter',
  pure: false
})

export class TotalFilterPipe implements PipeTransform {
  transform(items: any[], filter: string): any[] {
    if (!items || !filter) {
      return items;
    }
    return items.filter((item: any) => this.applyFilter(item, filter));
  }

  applyFilter(item: any, filter: string): boolean {

    for (const field in item) {
      if (item[field]) {
        if (typeof item[field] === 'string' ||
          typeof item[field] === 'number') {
          if (item[field].toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
