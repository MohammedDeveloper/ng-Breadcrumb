import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {RouterModule} from '@angular/router';
import {navRouterConfig} from './app.routes';

/// Custom components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { GalleryComponent } from './gallery/gallery.component';
import { BreadcrumbComponent } from './app.breadcrumb';



/// Custom providers
import { AirportService } from './services/airport/airport.service';
import { HomePipe } from './pipes/home/home.pipe';

/// Flights
import { FlightBaseComponent } from './flight/flightbase.component';
import { FlightsComponent } from './flight/flights.component';
import { FlightComponent } from './flight/flight.component';

/// Airports
import { AirportBaseComponent } from './airport/airportbase.component';
import { AirportsComponent } from './airport/airports.component';
import { AirportComponent } from './airport/airport.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    GalleryComponent,
    HomePipe,
    BreadcrumbComponent,
    FlightBaseComponent,
    FlightsComponent,
    FlightComponent,
    AirportBaseComponent,
    AirportsComponent,
    AirportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(navRouterConfig, {useHash: false})
  ],
  providers: [AirportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
