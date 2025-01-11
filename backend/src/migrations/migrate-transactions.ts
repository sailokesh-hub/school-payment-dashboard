import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CollectRequest } from '../transactions/schemas/collect-request.schema';
import { RequestStatus } from '../transactions/schemas/request-status.schema';
import { Transaction } from '../transactions/schemas/transaction.schema';

@Injectable()
export class MigrateTransactions {
  constructor(
    @InjectModel('CollectRequest') private readonly collectRequestModel: Model<CollectRequest>,
    @InjectModel('RequestStatus') private readonly requestStatusModel: Model<RequestStatus>,
    @InjectModel('Transaction') private readonly transactionModel: Model<Transaction>,
  ) {}

  async migrate() {
    const collectRequests = await this.collectRequestModel.find({}); // Fetch collect requests
    const requestStatuses = await this.requestStatusModel.find({}); // Fetch request statuses

    for (const collectRequest of collectRequests) {
      const status = requestStatuses.find((status) => status.collect_id === collectRequest._id.toString());

      const transaction = new this.transactionModel({
        collect_id: collectRequest._id,
        school_id: collectRequest.school_id,
        gateway: collectRequest.gateway,
        order_amount: collectRequest.order_amount,
        transaction_amount: status?.transaction_amount || null,
        status: status?.status || 'PENDING', // Default to PENDING if status not found
        custom_order_id: collectRequest.custom_order_id,
      });

      await transaction.save(); // Save the transaction document
    }
  }
}
