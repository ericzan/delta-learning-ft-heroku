
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { StripeService, StripeCardComponent   ,     } from "ngx-stripe";

import {	StripeCardElementOptions,	StripeElementsOptions,  StripeElement,StripeIbanElement,StripeCardElement ,StripeElements } from '@stripe/stripe-js';



@Component({
  selector: 'zan-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent  implements OnInit
{
  elements!: StripeElements;
  card!: StripeCardElement;

  // optional parameters
  elementsOptions: StripeElementsOptions = {    locale: 'es'  };

  stripeTest!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService) {}

  ngOnInit() {
    this.stripeTest = this.fb.group({   name: ['', [Validators.required]]  });

    this.stripeService.elements(this.elementsOptions)
    .subscribe(elements => {

                  this.elements = elements;
                  // Only mount the element the first time
                  if (!this.card) {
                    this.card = this.elements.create('card', {
                      style: {
                        base: {
                          iconColor: '#666EE8',
                          color: '#31325F',
                          lineHeight: '40px',
                          fontWeight: 300,
                          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                          fontSize: '18px',
                          '::placeholder': {
                            color: '#CFD7E0'
                          }
                        }
                      }
                    });
                    this.card.mount('#card-element');
                  }
                });

  } //---------------------------------------------------


  buy()
  {

    debugger;



    const name = this.stripeTest.get('name')!.value;
    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {

console.log("---result token ----",result);
              debugger;                      // Use the token to create a charge or a customer
                            // https://stripe.com/docs/charges
                          if (result.token)
                          {

                            console.log(result.token);
                            this.pago();


                          }
                          else if (result.error) {

                            console.log("--- result token error ---",result.error.message);
                          }
                        }, (error) => {
                           console.log('----- erro API  (2)----',error);
                          return;

                        })
                        ;
  }


  async pago ()
  {

    debugger;



    // Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
// const stripe:any = require('stripe')('sk_test_51KNUZgHynfh9L9pTAsgTefRSbuddpHe5pcOqRiVBUMlajUPR1jiUFLxEy4bxNSOyAIQiPVCzKm1LZRVnHTWED2NT00KJClYXjO');

// const paymentLink = await stripe.paymentLinks.create({
//   line_items: [
//     {
//       price: '{{PRICE_ID}}',
//       quantity: 1,
//     },
//   ],
// });



      // let  require: NodeRequire;
     //  const stripe = require('stripe')("pk_test_51KNUZgHynfh9L9pTnmw9bgxGbSEhc3nJQAAFdWdcbagjtlGp0psCpERWiyTSTNkUF3CNozBptdh8lBj8YVltuPH900jD62sCUN");
    // console.log("---- stripe----", stripe);
    // let paymentIntent =  await stripe.paymentIntents.create({
    //   amount: 1,
    //   currency: 'mxn',
    //   automatic_payment_methods: {enabled: true},
    //   statement_descriptor: 'Custom descriptor',
    // });

    // console.log(paymentIntent);
  }

}//-----------************ principal ********** --
