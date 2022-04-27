import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private httpClient: HttpClient) {}

  //post request to the server
  makePayment(stripeToken: any): Observable<any> {
    const url = 'http://localhost:5000/checkout';
    return this.httpClient.post<any>(url, { token: stripeToken });
  }
}
