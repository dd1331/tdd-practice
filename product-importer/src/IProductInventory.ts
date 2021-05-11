import { Product } from "./Product";

export interface IProductInventory {
	upsertProduct(product: Product): void
}