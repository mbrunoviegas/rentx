import { getRepository, Repository } from 'typeorm';
import { ICreateCategoryDTO } from '@modules/cars/repositories/dto/ICreateCategoryDTO';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';
import { Category } from '@shared/infra/database/typeorm/entities/Category';

class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }

  async findByName(name: string): Promise<Category | undefined> {
    return this.repository.findOne({ name });
  }

  async list(): Promise<Category[]> {
    return this.repository.find();
  }
}
export { CategoryRepository };
