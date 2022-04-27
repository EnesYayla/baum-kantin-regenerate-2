import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentHandler: any = null;
success: boolean = false;
failure:boolean = false;

  constructor(
    public authenticationService: AuthenticationService,
    private checkout: CheckoutService
  ) {}
  ngOnInit(): void {
    this.invokeStripe();
  }

  makePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KlBr5GzzWDfC0X7rN95EfwcdpDXAdK0zfMK08Ivxjyt3SsJZZVS0vf4lcbv02VSXATnidQTtjmQK1fN2vmcUleP007vKunyBT',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        paymentStripe(stripeToken);
      },
    });

    const paymentStripe = (stripeToken: any) => {
      this.checkout.makePayment(stripeToken).subscribe((data: any) => {
        console.log(data);
        
        if(data.data === "success"){
          this.success = true
        }else{
          this.failure = true
        }
      });
    };

    paymentHandler.open({
      name: 'Ödeme',
      description: 'Kantin Harcaması',
      amount: amount * 100,
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51KlBr5GzzWDfC0X7rN95EfwcdpDXAdK0zfMK08Ivxjyt3SsJZZVS0vf4lcbv02VSXATnidQTtjmQK1fN2vmcUleP007vKunyBT',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };

      window.document.body.appendChild(script);
    }
  }
  logOut() {
    this.authenticationService.logOut();
  }
}
