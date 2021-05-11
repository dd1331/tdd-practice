import each from 'jest-each';
import { WayneEnterprisesProductSourceStub } from "./suppliers/wayneenterprises/WayneEnterprisesProductSourceStub"
import { WayneEnterprisesProductImporter } from "../suppliers/wayneenterprises/WayneEnterprisesProductImporter";
import { WayneEnterprisesProductSource } from "../suppliers/wayneenterprises/WayneEnterprisesProductSource";
import { WayneEnterprisesProduct } from "../suppliers/wayneenterprises/WayneEnterPrisesProduct";
import { IProductImporter } from '../IProductImporter';
import { ProductSynchronizer } from '../ProductSynchronizer';
import { Product } from '../Product';
import { ProductInventorySpy } from './ProductInventorySpy';
import { IProductValidator } from '../IProductValidator';
import { ListPriceFilter } from '../ListPriceFilter';
import { Pricing } from '../Pricing';
import { IProductInventory } from '../IProductInventory';

describe('product synchronize', () => {
	const params = [[
		[
			new WayneEnterprisesProduct('0', 'title1', 100, 110,),
			new WayneEnterprisesProduct('2', 'title2', 200, 210,)
		]
	]];
	each(params).it('sut saves products correctly', (products) => {
		const stub: WayneEnterprisesProductSource = new WayneEnterprisesProductSourceStub(products);
		const importer: IProductImporter = new WayneEnterprisesProductImporter(stub);
		const validator: IProductValidator = new ListPriceFilter(0);
		const spy = new ProductInventorySpy();
		const sut = new ProductSynchronizer(importer, validator, spy);

		sut.run();

		const expected: Product[] = importer.fetchProducts();
		
		expect(expected).toEqual(spy.log);
	})
	each(params[0]).it('sut does not save invalid product', (product: WayneEnterprisesProduct) => {
		const lowerBound = product.getListPrice() + 10000
		const validator: IProductValidator = new ListPriceFilter(lowerBound);
		const stub: WayneEnterprisesProductSource = new WayneEnterprisesProductSourceStub([product]);
		const importer: IProductImporter = new WayneEnterprisesProductImporter(stub);
		const spy = new ProductInventorySpy();
		const sut = new ProductSynchronizer(importer, validator, spy);

		sut.run();

		expect(spy.log).toHaveLength(0);
	})

	it('MOCK sut does not save invalid product', () => {
		const pricing = new Pricing(10, 1);
		const product = new Product('mockSupplierNmae', 'mockProductCode', 'mockProductName', pricing);
		jest.mock("../suppliers/wayneenterprises/WayneEnterprisesProductImporter");
		const importer: IProductImporter = WayneEnterprisesProductImporter.prototype;
		jest.spyOn(WayneEnterprisesProductImporter.prototype, 'fetchProducts').mockImplementation(() => [product]);
		jest.spyOn(ListPriceFilter.prototype, 'isValid').mockImplementation(() => false);
		jest.spyOn(ProductInventorySpy.prototype, 'upsertProduct');

		const validator: IProductValidator = ListPriceFilter.prototype;

		// NOTE using class of interface in java is possible???
		// spy class is used here for now
		const inventory: IProductInventory = ProductInventorySpy.prototype;
		const sut = new ProductSynchronizer(importer, validator, inventory);

		sut.run();

		expect(inventory.upsertProduct).not.toHaveBeenCalled();

	})
})