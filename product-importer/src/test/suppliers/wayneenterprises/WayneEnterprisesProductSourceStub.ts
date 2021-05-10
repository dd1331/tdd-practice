import { WayneEnterprisesProduct } from "../../../suppliers/wayneenterprises/WayneEnterPrisesProduct";
import { WayneEnterprisesProductSource } from "../../../suppliers/wayneenterprises/WayneEnterprisesProductSource";
import { Product } from "../../../Product";

export class WayneEnterprisesProductSourceStub implements WayneEnterprisesProductSource{
	constructor(private products: WayneEnterprisesProduct[]){}

	fetchProducts (): WayneEnterprisesProduct[] {
		return this.products

	}

}