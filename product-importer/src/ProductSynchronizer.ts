import { IProductImporter } from "./IProductImporter";
import { IProductInventory } from "./IProductInventory";
import { IProductValidator } from "./IProductValidator";
import { Product } from "./Product";

export class ProductSynchronizer {
	constructor(
		private importer: IProductImporter,
		private validator: IProductValidator,
		private inventory: IProductInventory
	) {}

	run() {
		const products: Product[] = this.importer.fetchProducts();
		products.filter((product: Product) => this.validator.isValid(product))
			.map((product: Product) => this.inventory.upsertProduct(product))
	}
}