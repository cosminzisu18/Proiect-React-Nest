import { Injectable, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { PortfolioModel } from '../models/portfolio.model';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', 
      password: '', // aici am sters parola
      database: 'Portfolio', 
      models: [PortfolioModel],
    });
  }

  async onModuleInit() {
    await this.connect();
  }

  async connect() {
    try {
      await this.sequelize.authenticate(); 
      await this.sequelize.sync({ alter: true }); 
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  getSequelizeInstance() {
    return this.sequelize; 
  }
}
