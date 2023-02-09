import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DiscountDocument = HydratedDocument<Discount>;

@Schema({
  timestamps: true,
})
export class Discount {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({
    max: 100,
  })
  percentage: number;

  @Prop({
    default: false,
  })
  active: boolean;
}

export const DiscountSchema = SchemaFactory.createForClass(Discount);
