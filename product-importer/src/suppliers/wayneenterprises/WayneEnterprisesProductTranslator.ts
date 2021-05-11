import { Product } from "../../Product";
import { WayneEnterprisesProduct } from "./WayneEnterPrisesProduct";
import { Pricing } from "../../Pricing";

export class WayneEnterprisesProductTranslator {
	translate(product: WayneEnterprisesProduct): Product {
		const pricing: Pricing = this.getPricing(product);
		return new Product(
				'wayne',
				product.getId(),
				product.getTitle(),
				pricing
		);
	}

	private getPricing(product: WayneEnterprisesProduct) {
		const listPrice = product.getListPrice();
		const discount = product.getListPrice() - product.getSellingPrice();
		return new Pricing(listPrice, discount);
	}
}