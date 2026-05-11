import { Component, effect, inject, signal } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { Region, REGIONS } from '../../interfaces/country.interface';
import { NgClass } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  imports: [ListComponent, NgClass],
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {
  regions = signal(REGIONS).asReadonly();
  selectedRegion = signal<Region | null>(null);
  countryService = inject(CountryService);

  countryResource = rxResource({
    request: () => ({ query: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      return this.countryService.getCountriesByRegion(request.query);
    }
  });
}
