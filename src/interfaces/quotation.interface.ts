import {Document} from 'mongoose';

interface QuotationInterface extends Document {
  vehicle: string;
  yearVehicle: number;
  modelVehicle: string;
  typeCover: string;
  price?: number;
  conditions: string;
  isActive: boolean;
  userId: string;
}

export default QuotationInterface;