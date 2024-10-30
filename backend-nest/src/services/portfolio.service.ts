import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PortfolioModel } from '../models/portfolio.model';
import { PortfolioDto } from '../dtos/portfolio.dto';
import { JSDOM } from 'jsdom';
import * as DOMPurify from 'dompurify';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PortfolioService {
  private purify: (dirty: string) => string;

  constructor() {
    // Creează un mediu JSDOM pentru a utiliza DOMPurify
    const window = (new JSDOM('')).window;
    this.purify = DOMPurify(window).sanitize;
  }

  async create(file: Express.Multer.File, portfolioDto: PortfolioDto): Promise<PortfolioModel> {
    this.setImage(file, portfolioDto);
    this.sanitizeInput(portfolioDto);
    return await PortfolioModel.create(portfolioDto);
  }

  async findAll(): Promise<PortfolioModel[]> {
    return await PortfolioModel.findAll();
  }

  async findOne(id: string): Promise<PortfolioModel> {
    const portfolio = await PortfolioModel.findByPk(id);
    if (!portfolio) throw new NotFoundException(`Portfolio with ID ${id} not found`);
    return portfolio;
  }

  async update(id: string, file: Express.Multer.File, portfolioDto: PortfolioDto): Promise<PortfolioModel> {
    this.setImage(file, portfolioDto);
    this.sanitizeInput(portfolioDto);

    const [updatedCount, [updatedPortfolio]] = await PortfolioModel.update(portfolioDto, {
      where: { id },
      returning: true,
    });

    if (updatedCount === 0) throw new NotFoundException(`Portfolio with ID ${id} not found`);
    return updatedPortfolio;
  }

  async remove(id: string): Promise<number> {
    const portfolio = await PortfolioModel.findOne({ where: { id } });
    if (!portfolio) {
        throw new NotFoundException(`Portfolio with ID ${id} not found`);
    }

    const imagePath = path.join(__dirname, '..', '..', 'uploads', portfolio.image); 
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); 
    } else {
    
        throw new NotFoundException(`Image for Portfolio with ID ${id} not found at ${imagePath}`);
    }


    const deletedCount = await PortfolioModel.destroy({ where: { id } });
    return deletedCount;
  }

  private setImage(file: Express.Multer.File, portfolioDto: PortfolioDto): void {
    if (file) {
        // portfolioDto.image = `http://localhost:3002/uploads/${file.filename}`;
        portfolioDto.image = file.filename;
        
    // } else if (portfolioDto.image && !this.isValidUrl(portfolioDto.image)) {
    //     throw new BadRequestException('Invalid URL for the image');
    } else if (!portfolioDto.image) {
        throw new BadRequestException('Image is required');
    }
  }


  private isValidUrl(url: string): boolean {
    return /^(ftp|http|https):\/\/[^ "]+$/.test(url);
  }

  private sanitizeInput(portfolioDto: PortfolioDto): void {
    const fieldsToSanitize = ['title', 'description', 'clientLink'];
    fieldsToSanitize.forEach((field) => {
      const originalValue = portfolioDto[field];
      const sanitizedValue = this.purify(originalValue);
  
      if (originalValue !== sanitizedValue) {
        throw new BadRequestException(
          `Input invalid în câmpul ${field}. Cod HTML sau JavaScript nu este permis.`
        );
      }
  
      portfolioDto[field] = sanitizedValue;
    });
  }
  
}
