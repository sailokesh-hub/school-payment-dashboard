import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './schemas/transaction.schema'; // Import Transaction schema

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel('Transaction') private readonly transactionModel: Model<Transaction>, // Use Transaction model
  ) {}

  async getTransactions(
    page: number = 1,
    limit: number = 10,
    filters: { status?: string; dateRange?: string; schoolId?: string },
  ) {
    const skip = (page - 1) * limit;
    const query: any = {};

    // Apply filter by schoolId if provided
    if (filters.schoolId) {
      query.school_id = filters.schoolId;
    }

    // Apply filter by status if provided and ensure it's a valid status (SUCCESS, FAILURE, PENDING)
    if (filters.status) {
      const validStatuses = ['SUCCESS', 'FAILURE', 'PENDING'];
      if (validStatuses.includes(filters.status)) {
        query.status = filters.status;
      } else {
        return {
          data: [],
          total: 0,
          page,
          limit,
          message: 'Invalid status filter, only SUCCESS, FAILURE, and PENDING are allowed.',
        };
      }
    }

    // Apply filter by dateRange (if provided)
    if (filters.dateRange) {
      const date = new Date(filters.dateRange);
      query.createdAt = {
        $gte: date,
        $lte: new Date(date.getTime() + 24 * 60 * 60 * 1000), // Include entire day
      };
    }

    // Query the transactions collection
    const transactions = await this.transactionModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();

    // Count the total number of transactions matching the filter for pagination
    const total = await this.transactionModel.countDocuments(query).exec();

    return {
      data: transactions,
      total,
      page,
      limit,
    };
  }

  async checkStatus(customOrderId: string) {
    const transaction = await this.transactionModel.findOne({ custom_order_id: customOrderId });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }

  async handleWebhookPayload(payload: any) {
    if (!payload || !payload.order_info || !payload.order_info.order_id) {
      return { status: 400, message: 'Invalid payload' };
    }

    const { order_info } = payload;
    const { order_id, order_amount, transaction_amount, gateway, bank_reference } = order_info;

    const transaction = await this.transactionModel.findOneAndUpdate(
      { _id: order_id }, // Assuming `order_id` maps to `collect_id` or `_id` in Transaction schema
      {
        $set: {
          order_amount,
          transaction_amount,
          gateway,
          bank_reference,
          status: payload.status === 200 ? 'SUCCESS' : 'FAILED',
        },
      },
      { new: true, upsert: false } // Don't create new records; only update existing ones
    );

    if (transaction) {
      return { status: 200, message: 'Transaction updated successfully', transaction };
    } else {
      return { status: 404, message: 'Transaction not found' };
    }
  }
}
