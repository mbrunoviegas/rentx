import { container } from 'tsyringe';
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';
import { CarsImageRepository } from '@modules/cars/repositories/implementations/CarsImageRepository';
import { CategoryRepository } from '@modules/cars/repositories/implementations/CategoryRepository';
import { SpecificationRepository } from '@modules/cars/repositories/implementations/SpecificationRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { RentalsRepository } from '@modules/rentals/repositories/implementations/RentalsRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { ICrypt } from '@shared/core/providers/ICrypt';
import { CryptProvider } from '@shared/core/providers/implementations/CryptProvider';
import { ICarsRepository } from '@shared/infra/database/typeorm/repositories/ICarsRepository';
import { CarsRepository } from '@shared/infra/database/typeorm/repositories/implementations/CarsRepository';
import { UserRepository } from '@shared/infra/database/typeorm/repositories/implementations/UserRepository';
import { UsersTokensRepository } from '@shared/infra/database/typeorm/repositories/implementations/UsersTokensRepository';
import { IUserRepository } from '@shared/infra/database/typeorm/repositories/IUserRepository';
import { IUsersTokensRepository } from '@shared/infra/database/typeorm/repositories/IUsersTokensRepository';
import { IDateProvider } from '../providers/IDateProvider';
import { IMailProvider } from '../providers/IMailProvider';
import { DateProvider } from '../providers/implementations/DateProvider';
import { EtherealMailProvider } from '../providers/implementations/EtherealMailProvider';
import { LocalStorageProvider } from '../providers/implementations/LocalStorageProvider';
import { S3AwsProvider } from '../providers/implementations/S3AwsProvider';
import { SESMailProvider } from '../providers/implementations/SESMailProvider';
import { IStorageProvider } from '../providers/IStorageProvider';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository,
);

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository,
);

container.register<ICrypt>(
  'CryptProvider',
  CryptProvider,
);

container.registerSingleton<ICarsRepository>(
  'CarsRepository',
  CarsRepository,
);

container.registerSingleton<ICarsImageRepository>(
  'CarsImageRepository',
  CarsImageRepository,
);

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository,
);

container.registerSingleton<IDateProvider>(
  'DateProvider',
  DateProvider,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);

const mailProvider = {
  local: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

const MAIL_PROVIDER = process.env.MAIL_PROVIDER as string;

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[MAIL_PROVIDER],
);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3AwsProvider,
};

const disk = process.env.disk as string;

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[disk],
);
