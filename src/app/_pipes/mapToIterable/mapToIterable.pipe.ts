import {Pipe} from "@angular/core";
import {PipeTransform} from "@angular/core/src/change_detection";

@Pipe({name: 'mapToIterable'})
export class MapToIterablePipe implements PipeTransform {
  transform(value, args: any[]): any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}
