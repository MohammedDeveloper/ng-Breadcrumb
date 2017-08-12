import { Component, OnInit } from '@angular/core';

/// Custom providers
import { AirportService } from '../services/airport/airport.service';
import { NgForm } from '@angular/forms';

/// Custom models
import { Airport } from '../airport/airport';
import { Flight } from '../flight/Flight';

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airport.component.css']
})
export class AirportsComponent implements OnInit {

  /// Declarations...
  private airports: Airport[] = [];
  private errorMessage: any;

  /// temp value
  public temp: String;

  constructor(private _airportService: AirportService) {
  }

  ngOnInit() {

    /// get the data
    this.getAirports();
  } 

  /// get the airports
  getAirports(): void {

    /// call the service
    this._airportService.getAirports().then(
      res => { this.airports = res; },
      error => this.errorMessage = <any>error);
  }
}