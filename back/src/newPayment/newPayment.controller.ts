/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import { Controller, Post, Body, Res, BadRequestException } from '@nestjs/common';
// import { Response } from 'express';
// import { StripeService } from './newPayment.service';

// @Controller('stripe')
// export class StripeController {
//   constructor(private readonly stripeService: StripeService) {}

//   @Post('create-payment-intent')
//   async createPaymentIntent(
//     @Body('amount') amount: number,
//     @Body('id') id: string,
//   ) {
//     try {
//       const paymentIntent = await this.stripeService.createPaymentIntent(
//         amount,
//         id,
//       );

//       //return paymentIntent;
//       res.json({ message: 'Payment successfully completed', paymentIntent });
//     } catch (error: any) {
//       res.status(error.status || 400).json({ message: error.message });
//        return { message: 'Payment successfully completed', paymentIntent }
//     }
//   }
// }
