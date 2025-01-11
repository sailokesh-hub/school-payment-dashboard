import { Schema, Document } from 'mongoose';

export interface CollectRequest extends Document {
  school_id: string;
  trustee_id: string;
  gateway: string;
  order_amount: number;
  custom_order_id: string;
}

export const CollectRequestSchema = new Schema(
  {
    school_id: { type: String, required: true },
    trustee_id: { type: String, required: true },
    gateway: { type: String, required: true },
    order_amount: { type: Number, required: true },
    custom_order_id: { type: String, required: true },
  },
  { collection: 'collect_request_csv' },
);
