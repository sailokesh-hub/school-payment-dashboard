import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MigrateTransactions } from './migrations/migrate-transactions'; // Import migration service

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://school-payment-dashboard-tdwd.vercel.app', // Change this to your actual frontend URL if needed
    methods: 'GET, POST, PUT, DELETE, PATCH',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);

  // // Run the migration
  // const migrateTransactions = app.get(MigrateTransactions);
  // await migrateTransactions.migrate();

  // await app.close(); // Close the app after migration
}
bootstrap();
