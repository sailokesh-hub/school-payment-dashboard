import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as serverless from 'serverless-http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  // Create an Express app (required by serverless-http)
  const expressApp = express();

  // Create a NestJS application with the Express adapter
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  // Enable CORS for your frontend if needed
  app.enableCors({
    origin: 'https://school-payment-dashboard-phi.vercel.app', // Your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Initialize the NestJS app
  await app.init();

  // Return the serverless handler wrapped with the Express app
  return serverless(expressApp); // Wrap the Express app with serverless-http
}

// Export the handler function
export const handler = bootstrap(); 
