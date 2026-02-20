import { Route } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';

const countryRoutes: Route[] = [
  {
    path: '',
    component: ByCapitalPageComponent
  }
];

export default countryRoutes;
