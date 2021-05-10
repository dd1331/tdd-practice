import each from 'jest-each';
import { Product } from "../../../Product";
import { WayneEnterprisesProductSourceStub } from "./WayneEnterprisesProductSourceStub";
import { WayneEnterprisesProductImporter } from "../../../suppliers/wayneenterprises/WayneEnterprisesProductImporter";
import { WayneEnterprisesProduct } from "../../../suppliers/wayneenterprises/WayneEnterPrisesProduct";
import { Pricing } from '../../../Pricing';

describe('wayne', () => {
	const params = [
		[
			new WayneEnterprisesProduct('0', 'title1', 100, 110,),
			new WayneEnterprisesProduct('2', 'title2', 200, 210,)
		]
	];
	each(params).it('sut projects all products', (source: WayneEnterprisesProduct[]) => {
		const stub = new WayneEnterprisesProductSourceStub(source);
		const sut = new WayneEnterprisesProductImporter(stub);

		const actual: Product[] | Iterable<WayneEnterprisesProduct> = sut.fetchProducts();
		console.log('actual', actual);
		console.log('actual2', typeof source);
		expect(actual)
	})
})