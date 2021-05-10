import { Pricing } from "./Pricing";

export class Product {
	constructor(
		private supplierName: string,
		private productCode: string,
		private productName: string,
		private pricing: Pricing
	){}
	
	getSupplierName(): string {
		return this.supplierName;
	}
	getProductCode(): string {
		return this.productCode;
	}
	getProductName(): string {
		return this.productName;
	}
	getPricing(): Pricing {
		return this.pricing;
	}
}