import { Component, inject, signal } from '@angular/core';
import { SearchFormComponent } from "../../components/search-form/search-form.component";
import { ListComponent } from "../../components/list/list.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';


@Component({
  selector: 'app-by-capital-page',
  imports: [SearchFormComponent, ListComponent],
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);
  countries = signal<Country[]>([]);

  onSearch(query: string) {
    this.countryService.searchByCapital(query)?.subscribe({
      next: (value) => {
        this.countries.set(value);
      },
    })
  }
}
