import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

/// Custom providers
import { AirportService } from '../services/airport/airport.service';
import { ActivatedRoute } from '@angular/router';

/// Custom models
import { Airport } from '../airport/airport';
import { Flight } from '../flight/Flight';


@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {

  /// Declarations...
  private airports: Airport[] = [];
  private errorMessage: any;
  private flights: Flight[] = [];
  private airportFlights: Flight[] = [];
  private flight: any = {} ;

  /// temp value
  public temp: String;

  constructor(private _airportService: AirportService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {

    // Capture the code
    this.flight.FlightNumber = parseInt(this.route.snapshot.params["flightno"]);

    /// get the data
    this.getAirports();
    this.getFlights();
  }

  /// set flights
  setFlight() {
    this.flight = this.flights.find(airp => airp.FlightNumber === this.flight.FlightNumber);
  }

  /// Set Airport Flights
  getAirportName(code: string): String {

    /// loop thru after the successful transactin from server...
    this.airports.forEach(airport => {

      /// check for the code and map...
      if (airport.Code === code) {
        this.temp = airport.Name;
      }
    });

    /// return the name...    
    return this.temp;
  }

  /// get the airports
  getAirports(): void {

    /// call the service
    this._airportService.getAirports().then(
      res => { this.airports = res; },
      error => this.errorMessage = <any>error);
  }

  /// get the flights
  getFlights(): void {

    /// call the service
    this._airportService.getFlights().then(
      res => { this.flights = res; this.setFlight(); },
      error => this.errorMessage = <any>error);
  }

}