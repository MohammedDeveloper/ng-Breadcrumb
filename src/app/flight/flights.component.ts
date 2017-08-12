import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

/// Custom providers
import { AirportService } from '../services/airport/airport.service';
import { NgForm } from '@angular/forms';

/// Custom models
import { Airport } from '../airport/airport';
import { Flight } from '../flight/Flight';


@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightsComponent implements OnInit {

  /// Declarations...
  private airports: Airport[] = [];
  private errorMessage: any;
  private flights: Flight[] = [];
  private airportFlights: Flight[] = [];
  public flightFrom: string;
  public flightTo: string;
  private sortBy: boolean = true; /// false - Price, true - Departure

  /// temp value
  public temp: String;

  constructor(private _airportService: AirportService) {
  }

  ngOnInit() {

    /// get the data
    this.getAirports();
    this.getFlights();
  }

  /// Sort Airport Flights
  SortAirportFlights() {

    /// sort the flights    
    this.sortBy = !this.sortBy;
    switch (this.sortBy) {
      case false:
        this.airportFlights.sort((a, b) => {
          if (a.MainCabinPrice < b.MainCabinPrice) return -1;
          else if (a.MainCabinPrice > b.MainCabinPrice) return 1;
          else return 0;
        });
        break;
      case true:
        this.airportFlights.sort((a, b) => {
          return Date.parse('1970/01/01 ' + a.Departs.slice(0, -2) + ' ' + a.Departs.slice(-2)) - Date.parse('1970/01/01 ' + b.Departs.slice(0, -2) + ' ' + b.Departs.slice(-2))
        });
        break;
    }
  }

  /// Filter Airport Flights
  filterAirportFlights() {

    /// initial check
    if (!this.flightFrom && !this.flightTo) {
      this.airportFlights = this.flights; return;
    }

    /// loop thru after the successful transactin from server...
    this.airportFlights = this.flights.filter((airPlane) => {

      /// check      
      if (this.flightFrom && this.flightTo)
        return (this.getAirportName(airPlane.From).includes(this.flightFrom)
          && this.getAirportName(airPlane.To).includes(this.flightTo));
      else if (this.flightFrom)
        return (this.getAirportName(airPlane.From).includes(this.flightFrom));
      else if (this.flightTo)
        return (this.getAirportName(airPlane.To).includes(this.flightTo));
    });
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
      res => { this.flights = res; this.airportFlights = res; this.SortAirportFlights(); },
      error => this.errorMessage = <any>error);
  }

}
