import { Component, OnInit } from '@angular/core';

/// Custom providers
import { AirportService } from '../services/airport/airport.service';
import { ActivatedRoute } from '@angular/router';

/// Custom models
import { Airport } from '../airport/airport';
import { Flight } from '../flight/Flight';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css']
})
export class AirportComponent implements OnInit {

  /// Declarations...
  private airports: Airport[] = [];
  private errorMessage: any;
  private flights: Flight[] = [];
  private airportFlights: Flight[] = [];
  public airport: any = { Code: "", Name: "" };
  private sortBy: boolean = true; /// false - Price, true - Departure

  /// temp value
  public temp: String;

  constructor(private _airportService: AirportService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {

    // Capture the code
    this.airport.Code = this.route.snapshot.params["code"];

    /// get the data
    this.getAirports();
    this.getFlights();
  }

  /// set airport and its flights
  setAirport() {
    this.airport = this.airports.find(airp => airp.Code === this.airport.Code);
    this.setAirportFlights();
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
      res => { this.flights = res; this.airportFlights = res; this.setAirport(); },
      error => this.errorMessage = <any>error);
  }

  /// Set Airport Flights
  setAirportFlights() {

    /// initial check
    if (!this.airport.Code) {
      this.airportFlights = []; return;
    }

    /// loop thru after the successful transactin from server...
    this.airportFlights = this.flights.filter((airPlane) => {

      /// check      
      if (this.airport.Code)
        return (airPlane.From.includes(this.airport.Code)
          || airPlane.To.includes(this.airport.Code));
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
}