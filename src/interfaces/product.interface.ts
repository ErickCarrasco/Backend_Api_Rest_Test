import {Document} from 'mongoose';

interface ProductInterface extends Document {
  name: string;
  typeCover: string;
  description: string;
  sku: string;
  price: number;
  stock: number;
  category?: string;
  conditions: string;
  isActive: boolean;
}

export default ProductInterface;