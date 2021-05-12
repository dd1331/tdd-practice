import { IProductImporter } from "../../IProductImporter";
import { Product } from "../../Product";
import { IStarkIndustriesProductSource } from "./IStarkIndustriesProductSource";
import { StarkIndustriesProductTranslator } from "./StarkIndustriesProductTranslator";
import { StarkIndustriesProduct } from "./StarkIndustriesProduct";
import { Pricing } from "../../Pricing";

export class StarkIndustriesProductImporter implements IProductImporter {
	constructor(
		private productSource: IStarkIndustriesProductSource, 
		private translator: StarkIndustriesProductTranslator
	) {}
	fetchProducts(): Product[] {
		const source: StarkIndustriesProduct[] = this.productSource.getAllProducts();
		const products = new Array<Product>();
		source.map(product => {
			products.push(this.translator.translate(product))
		}
			)
		return products;

	}
	
}