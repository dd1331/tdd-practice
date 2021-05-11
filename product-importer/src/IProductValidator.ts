import { Product } from "./Product";

export interface IProductValidator {
	isValid(product: Product): boolean;
}