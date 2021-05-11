import { IProductInventory } from "../IProductInventory";
import { Product } from "../Product";

export class ProductInventorySpy implements IProductInventory {
	private _log: Product[]

	public get log(): Product[] {
		return this._log;
	}
	constructor() {
		this._log = new Array<Product>();
	}
	upsertProduct(product: Product): void {
		this._log.push(product)
	}
	
}