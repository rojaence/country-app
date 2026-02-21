import { Component, inject } from '@angular/core';
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

  onSearch(query: string) {
    console.log('🚀 ~ ByCapitalPageComponent ~ onSearch ~ query:', query);
    this.countryService.searchByCapital(query).subscribe({
      next: (value) => {
        console.log('🚀 ~ ByCapitalPageComponent ~ onSearch ~ value:', value);
      },
    })
  }
}
