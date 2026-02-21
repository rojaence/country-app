import { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';

export class CountryMapper {
  static toCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2,
      cca3: restCountry.cca3,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common || restCountry.name.common,
      capital: restCountry.capital.join(', '),
      population: restCountry.population
    }
  }

  static toCountries(countries: RESTCountry[]): Country[] {
    return countries.map((c) => this.toCountry(c));
  }
}
