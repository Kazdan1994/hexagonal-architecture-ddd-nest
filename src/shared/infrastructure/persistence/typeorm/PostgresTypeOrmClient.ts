import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

export class PostgresTypeOrmClient {
  static create() {
    return TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      synchronize: true,
      entities: [
        join(
          __dirname,
          '..',
          '..',
          '..',
          '..',
          '**',
          'infrastructure',
          'persistence',
          '**',
          '*{.ts,.js}',
        ),
      ],
    });
  }
}
