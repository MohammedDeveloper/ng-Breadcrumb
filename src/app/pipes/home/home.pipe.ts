import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { AirportService } from '../../services/airport/airport.service';

/// Custom models
import { Airport } from '../../airport/airport';
import { Flight } from '../../flight/flight';

@Pipe({
  name: 'airPlanesFilter'
})
@Injectable()
export class HomePipe implements PipeTransform {

   /// Declarations...
  private airports: Airport[] = [];

  /// temp value
  public temp: String;

  constructor(private _airportService: AirportService) {

    /// get the data
    this.getAirports();
  }

  /// transform the data..
  transform(airportFlights: Flight[], args?: any): any {

    /// return the data...
    return airportFlights.filter(airplane => 
    (
      (airplane.From.toLowerCase().indexOf(args[0].toLowerCase()) !== -1)
      ||
      (airplane.To.toLowerCase().indexOf(args[1].toLowerCase()) !== -1)
    ));
  }

  /// get the airports
  getAirports(): void {

    /// call the service
    this._airportService.getAirports().then(
      res => { this.airports = res; });
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

    /// return the name..
    return this.temp;
  }

}
