import { Schema, Document } from 'mongoose';

export interface RequestStatus extends Document {
  collect_id: string;
  status: string;
  payment_method: string;
  gateway: string;
  transaction_amount: number;
  bank_reference: string;
}

export const RequestStatusSchema = new Schema(
  {
    collect_id: { type: String, required: true },
    status: { type: String, required: true },
    payment_method: { type: String, required: true },
    gateway: { type: String, required: true },
    transaction_amount: { type: Number, required: true },
    bank_reference: { type: String, required: true },
  },
  { collection: 'request_status_csv' },
);
