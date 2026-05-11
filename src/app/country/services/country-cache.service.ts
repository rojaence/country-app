import { Injectable } from '@angular/core';
import { CacheService } from '../../shared/services/cache.service';
import { Country } from '../interfaces/country.interface';

@Injectable({ providedIn: 'root' })
export class CountryCacheService extends CacheService<Country[]> {}
