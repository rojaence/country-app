import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { RESTCountry } from "../interfaces/rest-countries.interfaces";
import { catchError, delay, map, of, tap, throwError } from "rxjs";
import { CountryMapper } from "../mappers/country.mapper";
import { Country } from "../interfaces/country.interface";
import { CountryCacheService } from './country-cache.service';

const API_URL = "https://restcountries.com/v3.1";

@Injectable({
  providedIn: "root",
})
export class CountryService {
  private readonly http = inject(HttpClient);

  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  cacheCapital = inject(CountryCacheService);
  cacheCountry = inject(CountryCacheService);

  searchByCapital(query: string) {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.isError.set(null);

    query = query.toLocaleLowerCase();
    const cacheResult = this.cacheCapital.getCache(query);
    if (cacheResult) return of(cacheResult);
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((res) => CountryMapper.toCountries(res)),
      tap((response: Country[]) => {
        this.countries.set(response);
        this.isLoading.set(false);
        this.cacheCapital.updateCache({key: query, value: response})
      }),
      catchError((error) => {
        this.isError.set(error.message);
        this.isLoading.set(false);
        this.countries.set([]);
        return throwError(
          () => new Error(`Error al buscar por capital con query: ${query}`),
        );
      }),
    );
  }

  searchByCountry(query: string) {
    query = query.toLowerCase();
    const cacheResult = this.cacheCountry.getCache(query);
    if (cacheResult) return of(cacheResult);
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((res) => CountryMapper.toCountries(res)),
      tap((val) => this.cacheCountry.updateCache({key: query, value: val})),
      delay(3000),
      catchError((error) => {
        return throwError(
          () => new Error(`Error al buscar por pais con query: ${query}`),
        );
      }),
    );
  }

  searchCountryByAlphaCode(code: string) {
    const url = `${API_URL}/alpha/${code}`;
    return this.http.get<RESTCountry[]>(url).pipe(
      map((res) => CountryMapper.toCountries(res)),
      map((countries) => countries.at(0)),
      catchError((error) => {
        return throwError(
          () => new Error(`Error al buscar por pais con codigo: ${code}`),
        );
      }),
    );
  }
}
