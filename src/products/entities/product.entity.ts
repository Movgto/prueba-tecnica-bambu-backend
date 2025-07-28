import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Product extends Document {
    @Prop({
        index: true,
        required: true,
        unique: true
    })
    title: string

    @Prop({
        index: true,
        required: true
    })
    description: string

    @Prop({
        required: true,
        index: true
    })
    category: string

    @Prop({
        index: true,
        required: true
    })
    brand: string

    @Prop({
        required: true
    })
    price: number
}

export const productSchema = SchemaFactory.createForClass(Product);