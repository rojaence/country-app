import { Component, input } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './list.component.html',
  styles: ``
})
export class ListComponent {
  countries = input.required<RESTCountry[]>();
}
