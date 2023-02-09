import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  async create(@Body() createDiscountDto: CreateDiscountDto) {
    const data = await this.discountService.create(createDiscountDto);
    return {
      success: true,
      message: 'discount created successfully',
      data,
    };
  }

  @Get()
  async findAll() {
    const data = await this.discountService.findAll();
    return {
      success: true,
      message: 'discounts fetched successfully',
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.discountService.findOne(id);
    return {
      success: true,
      message: 'discount fetched successfully',
      data,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDiscountDto: UpdateDiscountDto,
  ) {
    const data = await this.discountService.update(id, updateDiscountDto);
    return {
      success: true,
      message: 'discount updated successfully',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.discountService.remove(id);
    return {
      success: true,
      message: 'discount deleted successfully',
    };
  }
}
