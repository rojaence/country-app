import { Component, inject } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryInfoComponent } from "./country-info/country-info.component";

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInfoComponent],
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent {
  countryService = inject(CountryService);
  countryCode = inject(ActivatedRoute).snapshot.paramMap.get('code') ?? '';

  countryResource = rxResource({
    request: () => ({ code: this.countryCode }),
    loader: ({ request }) => {
      return this.countryService.searchCountryByAlphaCode(request.code)
    }
  })
}
