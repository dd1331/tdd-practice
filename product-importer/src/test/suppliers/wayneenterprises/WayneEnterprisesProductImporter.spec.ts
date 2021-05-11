import each from 'jest-each';
import { Product } from "../../../Product";
import { WayneEnterprisesProductSourceStub } from "./WayneEnterprisesProductSourceStub";
import { WayneEnterprisesProductImporter } from "../../../suppliers/wayneenterprises/WayneEnterprisesProductImporter";
import { WayneEnterprisesProduct } from "../../../suppliers/wayneenterprises/WayneEnterPrisesProduct";
import { Pricing } from '../../../Pricing';

describe('wayne', () => {
	const params = [[
		[
			new WayneEnterprisesProduct('0', 'title1', 100, 110,),
			new WayneEnterprisesProduct('2', 'title2', 200, 210,)
		]
	]];
	each(params).it('sut projects all products', (source: WayneEnterprisesProduct[]) => {
		const stub = new WayneEnterprisesProductSourceStub(source);
		const sut = new WayneEnterprisesProductImporter(stub);
		const actual: Product[] = sut.fetchProducts();
		
		expect(actual).toHaveLength(actual.length);
	})
	
	each(params).it('sut sets supplier name correctly', (source: WayneEnterprisesProduct[]) => {
		const stub = new WayneEnterprisesProductSourceStub(source);
		const sut = new WayneEnterprisesProductImporter(stub);
		const actual: Product[] = sut.fetchProducts();

		actual.forEach((product: Product) => {
			expect(product.getSupplierName()).toEqual('wayne');
		})
	})

	each(params[0]).it('sut projects source properties correctly', (source: WayneEnterprisesProduct) => {
		const stub = new WayneEnterprisesProductSourceStub([source]);
		const sut = new WayneEnterprisesProductImporter(stub);
		const actual: Product = sut.fetchProducts()[0];
		expect(actual.getProductCode()).toEqual(source.getId());
		expect(actual.getProductName()).toEqual(source.getTitle());
		expect(actual.getPricing().getListPrice()).toEqual(source.getListPrice());
		expect(actual.getPricing().getDiscount()).toEqual(source.getListPrice() - source.getSellingPrice());
	})

})