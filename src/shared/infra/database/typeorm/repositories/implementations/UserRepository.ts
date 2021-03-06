import { getRepository, Repository } from 'typeorm';
import { ICreateUserDTO } from '@modules/accounts/useCases/createUser/dto/ICreateUserDTO';
import { User } from '@shared/infra/database/typeorm/entities/User';
import { IUserRepository } from '@shared/infra/database/typeorm/repositories/IUserRepository';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async create({
    name, username, password, email, driver_license, id, avatar,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name, username, password, email, driver_license, id, avatar,
    });

    await this.repository.save(user);
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.repository.findOne({ username });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }

  findByEmail(email: string): Promise<User> {
    const user = this.repository.findOne({ email });
    return user;
  }
}

export { UserRepository };
