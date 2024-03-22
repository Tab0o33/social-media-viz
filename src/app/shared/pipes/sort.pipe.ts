import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sort',
    standalone: true
})
export class SortPipe implements PipeTransform {

    transform(array: any[], propertyName: string, direction: 'asc' | 'desc' = 'asc'): any[] {
        if (!array || !propertyName) {
            return array;
        }

        return array.sort((a, b) => {
            const valueA = a[propertyName];
            const valueB = b[propertyName];

            if (valueA < valueB) {
                return direction === 'asc' ? -1 : 1;
            } else if (valueA > valueB) {
                return direction === 'asc' ? 1 : -1;
            } else {
                return 0;
            }
        });
    }

}
