import { WayneEnterprisesProduct } from "./suppliers/wayneenterprises/WayneEnterPrisesProduct";
import { Product } from "./Product";

export interface IProductImporter {
	fetchProducts(): Product[];
}