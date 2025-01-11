import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MigrateTransactions } from './migrations/migrate-transactions'; // Import migration service

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', 
  });

  await app.listen(process.env.PORT ?? 3001);

  // // Run the migration
  // const migrateTransactions = app.get(MigrateTransactions);
  // await migrateTransactions.migrate();

  // await app.close(); // Close the app after migration
}
bootstrap();
