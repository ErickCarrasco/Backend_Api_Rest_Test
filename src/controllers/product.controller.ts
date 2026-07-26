import {Response, Request} from 'express';
import Product from '../models/product.model';

class ProductController {
  public async getAllProducts (req: Request, res: Response) {
		const { query } = req;
		const {queryPage} = query;
		try {
			// console.log('queryPage', queryPage);
			const perpage = 2;//Documents per Page
			const page = Number(queryPage);//Value through a query param

			// Count total documents and calculate total pages
			const countTotal = await Product.countDocuments({isActive: true});
			const totalPages = countTotal / perpage;

			// Retrieve documents for the current page
			const data = await Product.find({isActive: true})
				.skip((perpage * page) - perpage)
				.limit(perpage);
			return res.json({
				status: 'success',
				info: 'Se obtuvo los datos',
				data: data,
				totalPages: totalPages,
			});
		} catch (error) {
			return res.status(400).json({
				status: 'error',
				info: 'Error al obtener los datos',
			});
		}
	}
}

export default new ProductController();