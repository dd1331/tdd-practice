import { IProductValidator } from "./IProductValidator";
import { Product } from "./Product";

export class ListPriceFilter implements IProductValidator {
	constructor(private lowerBound: number) {}
	isValid(product: Product): boolean {
		return product.getPricing().getListPrice() >= this.lowerBound
	}
}