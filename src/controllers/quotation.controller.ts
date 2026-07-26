import {Response, Request} from 'express';
import RequestWithUser from '../interfaces/requestuser.interface';
import Quotation from '../models/quotation.mode';

class QuotationController {
  public async createQuotation (req: RequestWithUser, res: Response) {
    const {body, user} = req;
    const {
      vehicle,
      yearVehicle,
      modelVehicle,
      typeCover,
      price,
      conditions,
    } = body;
		try {

      // Check if the quotation already exists for the user according to vehicle, yearVehicle, modelVehicle, and typeCover
			const data = await Quotation.findOne({
        vehicle: vehicle,
        yearVehicle: yearVehicle,
        modelVehicle: modelVehicle,
        typeCover: typeCover,
        userId: user._id
      });
      if (data) {
        return res.status(400).json({
				  status: 'error',
				  info: 'La cotizacion ya existe',
			  });
      }

      // Create a new quotation record with the provided data and the user ID
      const newQuotation = new Quotation({
        vehicle: vehicle,
        yearVehicle: yearVehicle,
        modelVehicle: modelVehicle,
        typeCover: typeCover,
        price: price,
        conditions: conditions,
        userId: user._id,
        isActive: true
      });
      await newQuotation.save();
			return res.json({
				status: 'success',
				info: 'Se ha creado la cotizacion',
				data: newQuotation,
			});
		} catch (error) {
			return res.status(400).json({
				status: 'error',
				info: 'Error al crear la cotizacion',
        error,
			});
		}
	}
}

export default new QuotationController();