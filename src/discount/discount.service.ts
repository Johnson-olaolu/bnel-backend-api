import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Discount, DiscountDocument } from './schemas/discount.schemas';

@Injectable()
export class DiscountService {
  constructor(
    @InjectModel(Discount.name) private discountModel: Model<DiscountDocument>,
  ) {}
  async create(createDiscountDto: CreateDiscountDto) {
    const newDiscount = await this.discountModel.create(createDiscountDto);
    return newDiscount;
  }

  async findAll() {
    const discounts = await this.discountModel.find();
    return discounts;
  }

  async findOne(discountId: string) {
    const discount = await this.discountModel.findById(discountId);
    if (!discount) {
      throw new NotFoundException('could not find discount for this id');
    }
    return discount;
  }

  async update(discoundId: string, updateDiscountDto: UpdateDiscountDto) {
    const discount = await this.findOne(discoundId);
    for (const detail in updateDiscountDto) {
      discount[detail] = updateDiscountDto[detail];
    }
    await discount.save();
    return discount;
  }

  async remove(discountId: string) {
    const deletedDiscount = await this.discountModel.findByIdAndDelete(
      discountId,
    );
    if (!deletedDiscount) {
      throw new NotFoundException('could not find discount for this id');
    }
    return true;
  }
}
