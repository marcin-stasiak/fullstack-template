import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {}

  public create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    console.log(createCategoryInput);
    const category = this.categoryRepository.create(createCategoryInput);

    return this.categoryRepository.save(category);
  }

  public findAll(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['meta', 'entries'] });
  }

  public findOneById(id: string): Promise<Category> {
    return this.categoryRepository.findOne({ where: { id: id } });
  }

  public findOneBySlug(slug: string): Promise<Category> {
    return this.categoryRepository.findOne({ where: { meta: { slug: slug } }, relations: ['meta'] });
  }

  public async update(updateCategoryInput: UpdateCategoryInput): Promise<Category> {
    const category = await this.categoryRepository.preload({ id: updateCategoryInput.id });

    if (category) {
      return this.categoryRepository.save(Object.assign(category, updateCategoryInput));
    }
  }

  public async remove(id: string): Promise<DeleteResult> {
    const category = await this.categoryRepository.preload({ id: id });

    if (category) {
      return this.categoryRepository.delete(category.id);
    }
  }

  public count(): Promise<number> {
    return this.categoryRepository.count();
  }
}
