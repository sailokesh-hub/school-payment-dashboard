import { Controller, Get, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getTransactions(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('status') status: string,
    @Query('dateRange') dateRange: string,
    @Query('schoolId') schoolId: string,
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;

    const filters = {
      status: status || undefined,
      dateRange: dateRange || undefined,
      schoolId: schoolId || undefined,
    };

    return this.transactionsService.getTransactions(pageNumber, pageSize, filters);
  }
  
}
