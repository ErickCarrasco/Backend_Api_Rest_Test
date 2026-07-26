
import {Schema, model} from 'mongoose';
import QuotationInterface from '../interfaces/quotation.interface';

export const QuotationSchema = new Schema({
  vehicle: {
    type: String,
    required: true,
  },
  yearVehicle: {
    type: Number,
    required: true
  },
  modelVehicle: {
    type: String,
    required: true
  },
  typeCover: { // Foreign key to Product
    type: Schema.Types.ObjectId,
    index: true,
  },
  price: {
    type: Number,
  },
  conditions: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  },
  userId: { // Foreign key to User
    type: Schema.Types.ObjectId,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Quotation = model<QuotationInterface>('QuotationData', QuotationSchema);

export default Quotation;
