import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

/// Custom models
import { Airport } from '../../airport/airport';
import { Flight } from '../../flight/flight';

@Injectable()
export class AirportService {

  constructor(private http: Http) {
  }

  /// Get the airports
  public getAirports(): Promise<Airport[]> {
    return this.http.get('assets/airports.json').toPromise()
      .then(this.extractData).catch(this.handleError);
  }

  /// Get the flights
  public getFlights(): Promise<Flight[]> {
    return this.http.get('assets/flights.json').toPromise()
    .then(this.extractData).catch(this.handleError);
  }

  /// Custom error handler
  private extractData(res: Response) {
    let body = res.json();
    return body || [];
  }

  /// Custom error handler
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
