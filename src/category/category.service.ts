import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = await this.categoryModel.create(createCategoryDto);
    return newCategory;
  }

  async findAll() {
    const categories = await this.categoryModel.find();
    return categories;
  }

  async findOne(categoryId: string) {
    const category = await this.categoryModel.findById(categoryId);
    if (!category) {
      throw new NotFoundException('Could not find category for this id');
    }
    return category;
  }

  async update(categoryId: string, updateCategoryDto: UpdateCategoryDto) {
    const activeCategory = await this.findOne(categoryId);
    for (const detail in updateCategoryDto) {
      activeCategory[detail] = updateCategoryDto[detail];
    }
    await activeCategory.save();
    return activeCategory;
  }

  async remove(categoryId: string) {
    const deletedCategory = await this.categoryModel.findByIdAndDelete(
      categoryId,
    );
    if (!deletedCategory) {
      throw new NotFoundException('Could not find category for this id');
    }
  }
}
