import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as serverless from 'serverless-http';

async function bootstrap() {
  const server = express(); // Create an Express application instance

  // Create the NestJS application using the Express adapter
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Enable CORS with "*" to allow all origins
  app.enableCors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, PATCH',
    credentials: true,
  });

  // Initialize the NestJS app
  await app.init();

  // Return the serverless handler
  return serverless(app.getHttpAdapter().getInstance());
}

// Export handler for Vercel
module.exports.handler = async (event, context) => {
  const handler = await bootstrap();
  return handler(event, context);
};
