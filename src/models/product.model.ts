
import {Schema, model} from 'mongoose';
import ProductInterface from '../interfaces/product.interface';

export const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  typeCover: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    index: true,
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  category: {
    type: String,
  },
  conditions: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = model<ProductInterface>('ProductData', ProductSchema);

export default Product;
