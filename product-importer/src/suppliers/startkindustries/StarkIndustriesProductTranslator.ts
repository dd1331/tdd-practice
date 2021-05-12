import { Product } from "../../Product";
import { Pricing } from "../../Pricing";
import { StarkIndustriesProduct } from "./StarkIndustriesProduct";

export class StarkIndustriesProductTranslator {
	translate(source: StarkIndustriesProduct): Product {
		const pricing: Pricing = this.getPricing(source);
		return new Product(
				'stark',
				source.code,
				source.name,
				pricing
		);

	}
	private getPricing(source: StarkIndustriesProduct) {
				const listPrice = source.listPrice;
				const discount = source.listPrice - source.discountAmount;
				return new Pricing(listPrice, discount);
	}
}