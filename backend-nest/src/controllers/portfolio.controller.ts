import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors, UploadedFile, UsePipes, ValidationPipe } from '@nestjs/common';
import { PortfolioService } from '../services/portfolio.service';
import { PortfolioDto } from '../dtos/portfolio.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const { window } = new JSDOM('');
const purify = DOMPurify(window);

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  @UseInterceptors(FileInterceptor('image')) 
  async create(@UploadedFile() file: Express.Multer.File, @Body() portfolioDto: PortfolioDto) {
      const sanitizedDto = {
        ...portfolioDto,
        description: purify.sanitize(portfolioDto.description), 
      };
      
      return this.portfolioService.create(file, sanitizedDto);
  }
  
  @Get() 
  findAll() {
    return this.portfolioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portfolioService.findOne(id);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Put(':id') 
  @UseInterceptors(FileInterceptor('image')) 
  async update(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Body() portfolioDto: PortfolioDto) {
    const sanitizedDto = {
      ...portfolioDto,
      description: purify.sanitize(portfolioDto.description),
    };

    return this.portfolioService.update(id, file, sanitizedDto);
  }

  @Delete(':id') 
  remove(@Param('id') id: string) {
    return this.portfolioService.remove(id);
  }
}
