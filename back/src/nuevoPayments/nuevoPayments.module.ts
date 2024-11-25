import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeService } from './nuevoPayments.service';
import { StripeController } from './nuevoPayments.controller';
import { Payment } from '../entities/payments.entity';
import { PaymentRepository } from './nuevoPayments.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [StripeController],
  providers: [StripeService, PaymentRepository],
})
export class StripeModule {}