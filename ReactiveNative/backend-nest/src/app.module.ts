import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsModule } from './contacts/contacts.module';
import { Contact } from './contacts/contact.entity';
// import * as dotenv from 'dotenv';

// dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Aneesh@123',
      database: 'your_database_name',
      entities: [Contact],
      synchronize: true,
    }),
    ContactsModule,
  ],
})
export class AppModule {}
