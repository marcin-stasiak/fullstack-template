import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(createUserInput);

    return this.userRepository.save(user);
  }

  public findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public findOneById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  public findOneBySlug(slug: string): Promise<User> {
    return this.userRepository.findOne({ where: { meta: { slug: slug } }, relations: ['meta'] });
  }

  public async update(updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.preload({ id: updateUserInput.id });

    if (user) {
      return this.userRepository.save(Object.assign(user, updateUserInput));
    }
  }

  public async remove(id: string): Promise<DeleteResult> {
    const user = await this.userRepository.preload({ id: id });

    if (user) {
      return this.userRepository.delete(user.id);
    }
  }

  public count(): Promise<number> {
    return this.userRepository.count();
  }
}