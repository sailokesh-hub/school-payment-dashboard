// transaction.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Transaction extends Document {
  @Prop({ required: true })
  collect_id: string;

  @Prop({ required: true })
  school_id: string;

  @Prop({ required: true })
  gateway: string;

  @Prop({ required: true })
  order_amount: number;

  @Prop({ required: true })
  transaction_amount: number;

  @Prop({ required: true, enum: ['SUCCESS', 'PENDING', 'FAILURE'] })
  status: string;

  @Prop({ required: true })
  custom_order_id: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
