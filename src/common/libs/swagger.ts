import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Ebdesk Api')
  .setDescription('Nest Api Documentation')
  .setVersion('1.0')
  .setContact(
    'Aristu Chahya',
    'https://github.com/aristuchahya',
    'aristuchahyasururi@gmail.com',
  )
  .addTag('Users')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
    'access-token',
  )
  .build();

export const document = (app: INestApplication<any>) =>
  SwaggerModule.createDocument(app, config);
