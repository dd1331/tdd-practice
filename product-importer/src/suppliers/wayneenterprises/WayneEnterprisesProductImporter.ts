import { WayneEnterprisesProductSource } from "./WayneEnterprisesProductSource";
import { IProductImporter } from "../../IProductImporter";
import { Product } from "../../Product";
import { WayneEnterprisesProductTranslator } from "./WayneEnterprisesProductTranslator";


export class WayneEnterprisesProductImporter implements IProductImporter {
	constructor(private dataSource: WayneEnterprisesProductSource) {}
	fetchProducts(): Product[] {
		const translator = new WayneEnterprisesProductTranslator();
		const result: Product[] = this.dataSource.fetchProducts().map(product => {
			return translator.translate(product);
		})
		return result;
	}
}