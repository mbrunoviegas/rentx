import csvParse from 'csv-parse';
import fs from 'fs';
import { ICategoryRepository } from '../../../repositories/interfaces/ICategoryRepository';
import { IImportCategory } from '../interfaces/IImportCategory';
import { IParsedCategory } from '../interfaces/IParsedCategory';

class ImportCategoryUseCase implements IImportCategory {
  constructor(private categoryRepository: ICategoryRepository) {}

  private loadCategories(file: Express.Multer.File): Promise<IParsedCategory[]> {
    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(file.path);
      const categories: IParsedCategory[] = [];
      const fileParser = csvParse();

      readStream.pipe(fileParser);

      fileParser.on('data', async (line) => {
        const [name, description] = line;
        categories.push({
          name, description,
        });
      })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.forEach((category) => {
      const categoryAreadyExists = this.categoryRepository.findByName(category.name);
      if (!categoryAreadyExists) {
        this.categoryRepository.create(category);
      }
    });
  }
}

export { ImportCategoryUseCase };
