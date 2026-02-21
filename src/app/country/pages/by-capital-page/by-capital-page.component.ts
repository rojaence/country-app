import { Component, inject, signal } from '@angular/core';
import { SearchFormComponent } from "../../components/search-form/search-form.component";
import { ListComponent } from "../../components/list/list.component";
import { CountryService } from '../../services/country.service';


@Component({
  selector: 'app-by-capital-page',
  imports: [SearchFormComponent, ListComponent],
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);
  isError = signal<string | null>(null);

  onSearch(query: string) {
    this.countryService.searchByCapital(query)?.subscribe({
      error: (error) => this.isError.set(error.message),
      next: () => this.isError.set(null)
    })
  }
}
