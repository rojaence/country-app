import { Component, inject, signal } from '@angular/core';
import { SearchFormComponent } from "../../components/search-form/search-form.component";
import { ListComponent } from "../../components/list/list.component";
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { finalize, of } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchFormComponent, ListComponent],
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);

  // Forma tradicional de manejar el estado de una peticion
  /* isError = signal<string | null>(null);
  isLoading = signal<boolean>(false);
  countries = signal<Country[]>([]);

  onSearch(query: string) {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.isError.set(null);
    this.countryService.searchByCountry(query)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe({
        next: (res) => {
          this.countries.set(res);
        },
        error: (err) => {
          this.isError.set(err.message);
        }
      })
  } */

  // Forma de manejar el estado de la peticion con rxResource
  query = signal('');

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      return this.countryService.searchByCountry(request.query)
    }
  })
}
