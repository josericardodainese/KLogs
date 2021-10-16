import {Pipe, PipeTransform} from '@angular/core';
import {itemMenu} from "../entities/menu-item";

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform {

  private static getMenuListFiltered(itemMenuText: string) {
    const itemMenu: itemMenu = {
      metadata: {
        name: itemMenuText
      }
    }
    return [itemMenu];
  }

  transform(items: itemMenu[], searchText: string): itemMenu[] {

    if (!items) {
      return FilterPipe.getMenuListFiltered("Não Encontrado");
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    const itemsFiltered: itemMenu[] = items.filter(it => {
      return it.metadata.name.toLocaleLowerCase().includes(searchText);
    });

    return itemsFiltered.length > 0 ? itemsFiltered : FilterPipe.getMenuListFiltered("Não Encontrado");
  }
}
