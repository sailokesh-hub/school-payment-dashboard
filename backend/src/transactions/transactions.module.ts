import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MigrateTransactions } from '../migrations/migrate-transactions'; // Import the migration service
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { CollectRequestSchema } from './schemas/collect-request.schema';
import { RequestStatusSchema } from './schemas/request-status.schema';
import { TransactionSchema } from './schemas/transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CollectRequest', schema: CollectRequestSchema },
      { name: 'RequestStatus', schema: RequestStatusSchema },
      { name: 'Transaction', schema: TransactionSchema },
    ]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, MigrateTransactions], // Register the MigrateTransactions service here
})
export class TransactionsModule {}
