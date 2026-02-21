import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { catchError, tap } from 'rxjs';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private readonly http = inject(HttpClient);

  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<RESTCountry[]>([]);

  searchByCapital(query: string) {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.isError.set(null);

    query = query.toLocaleLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      tap((response: RESTCountry[]) => {
        this.countries.set(response);
        this.isLoading.set(false);
      }),
      catchError((error) => {
        this.isError.set(error.message);
        this.isLoading.set(false);
        throw error;
      })
    );
  }
}
