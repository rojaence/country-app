import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { catchError, map, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private readonly http = inject(HttpClient);

  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  searchByCapital(query: string) {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.isError.set(null);

    query = query.toLocaleLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map((res) => CountryMapper.toCountries(res)),
      tap((response: Country[]) => {
        this.countries.set(response);
        this.isLoading.set(false);
      }),
      catchError((error) => {
        this.isError.set(error.message);
        this.isLoading.set(false);
        this.countries.set([]);
        return throwError(() => new Error(`Error al buscar por capital con query: ${query}`));
      })
    );
  }

  searchByCountry(query: string) {
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map((res) => CountryMapper.toCountries(res)),
      catchError((error) => {
        return throwError(() => new Error(`Error al buscar por pais con query: ${query}`));
      })
    )
  }
}
