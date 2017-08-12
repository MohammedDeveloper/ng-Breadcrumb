import { Routes } from '@angular/router';

/// Custom components
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { GalleryComponent } from './gallery/gallery.component';

/// Flights
import { FlightBaseComponent } from './flight/flightbase.component';
import { FlightsComponent } from './flight/flights.component';
import { FlightComponent } from './flight/flight.component';

/// Airports
import { AirportBaseComponent } from './airport/airportbase.component';
import { AirportsComponent } from './airport/airports.component';
import { AirportComponent } from './airport/airport.component';

/// Routes
export const navRouterConfig: Routes = [
      { path: '', pathMatch: 'prefix', redirectTo: 'home' },
      { path: "home", component: HomeComponent },
      { path: "contact", component: ContactComponent, data: { breadcrumb: "Contact" } },
      {
            path: "flights", component: FlightBaseComponent, data: { breadcrumb: "Flights" },
            children: [
                  {
                        path: "", component: FlightsComponent, data: { breadcrumb: "" }
                  },
                  {
                        path: "details/:flightno", component: FlightComponent, data: { breadcrumb: "View Details" }
                  }
            ]
      },
      {
            path: "airports", component: AirportBaseComponent, data: { breadcrumb: "Airports" },
            children: [
                  {
                        path: "", component: AirportsComponent, data: { breadcrumb: "" }
                  },
                  {
                        path: "flights/:code", component: AirportComponent, data: { breadcrumb: "Flights" }
                  }
            ]
      },
      { path: "gallery", component: GalleryComponent, data: { breadcrumb: "Gallery" } }
];

