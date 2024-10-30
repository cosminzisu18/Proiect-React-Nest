import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PortfolioController } from './controllers/portfolio.controller'; 
import { PortfolioService } from './services/portfolio.service'; 
import { MulterModule } from '@nestjs/platform-express'; 
import { UploadController } from './controllers/upload.controller';
import * as cookieParser from 'cookie-parser';
import { RateLimiterMiddleware } from './middleware/rate-limiter.middleware';

@Module({
  imports: [
    DatabaseModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [PortfolioController, UploadController],
  providers: [AppService, PortfolioService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // cookie-parser
    // consumer
    //   .apply(cookieParser())
    //   .forRoutes('*'); // Aplică pentru toate rutele

    // Limitarea ratei
    consumer
      .apply(RateLimiterMiddleware)
      .forRoutes('*'); // Aplică limitarea ratei pentru toate rutele
  }
}
