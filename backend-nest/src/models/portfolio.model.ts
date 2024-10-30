import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class PortfolioModel extends Model<PortfolioModel> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: [3, 100],
    }
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    validate: {
      len: [10, 1000], 
    }
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isUrl: true, 
    }
  })
  clientLink: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true, 
  })
  status: boolean;
}
