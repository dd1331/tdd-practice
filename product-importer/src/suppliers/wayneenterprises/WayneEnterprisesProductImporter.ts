import { WayneEnterprisesProductSource } from "./WayneEnterprisesProductSource";
import { IProductImporter } from "../../IProductImporter";
import { WayneEnterprisesProduct } from "./WayneEnterPrisesProduct";
import { Product } from "../../Product";


export class WayneEnterprisesProductImporter implements IProductImporter {
	constructor(private dataSource: WayneEnterprisesProductSource) {}
	fetchProducts(): Product[] | Iterable<WayneEnterprisesProduct> {
		return this.dataSource.fetchProducts();
	}
}