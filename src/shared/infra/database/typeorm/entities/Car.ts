import {
  Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Category } from './Category';
import { Specification } from './Specification';

@Entity('cars')
export class Car extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @ManyToOne(() =>
    Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() =>
    Specification, { eager: true })
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'specification_id' }],
  })
  specifications: Specification[];

  @Column()
  category_id: string;

  @Column({ default: true })
  available: boolean;
}
