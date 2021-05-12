import { StarkIndustriesProductImporter } from '../../../suppliers/startkindustries/StarkIndustriesProductImporter'
import { StarkIndustriesProductSourceImpl } from '../../../suppliers/startkindustries/StarkIndustriesProductSourceImpl';
import { IStarkIndustriesProductSource } from '../../../suppliers/startkindustries/IStarkIndustriesProductSource';
import { StarkIndustriesProductTranslator } from '../../../suppliers/startkindustries/StarkIndustriesProductTranslator';
import { StarkIndustriesProduct } from '../../../suppliers/startkindustries/StarkIndustriesProduct';
import { Product } from '../../../Product';
import { Pricing } from '../../../Pricing';

describe('StarkIndustriesProductImporter', () => {
	const sourceProducts: StarkIndustriesProduct[] = [
		new StarkIndustriesProduct('testCode', 'testName', 300, 100),
		new StarkIndustriesProduct('testCode2', 'testName2', 400, 200)
	];
	it('sut projects all products', () => {
		jest.mock('../../../suppliers/startkindustries/StarkIndustriesProductSourceImpl');
		jest.mock('../../../suppliers/startkindustries/StarkIndustriesProductTranslator');
		
		const productSource: IStarkIndustriesProductSource = StarkIndustriesProductSourceImpl.prototype;
		jest.spyOn(StarkIndustriesProductSourceImpl.prototype, 'getAllProducts').mockImplementation(() => sourceProducts);
		
		const translator: StarkIndustriesProductTranslator = StarkIndustriesProductTranslator.prototype;
		const sut = new StarkIndustriesProductImporter(productSource, translator);
		
		const actual: Product[] = sut.fetchProducts();
		
		expect(actual).toHaveLength(sourceProducts.length);
	})
	
	it('sut translates source products correctly', () => {
		const products: Product[] = [
			new Product('stark', 'testCode', 'testName', new Pricing(300, 200))
		];
		const productSource: IStarkIndustriesProductSource = StarkIndustriesProductSourceImpl.prototype;
		jest.spyOn(StarkIndustriesProductSourceImpl.prototype, 'getAllProducts').mockImplementation(() => sourceProducts);
		const translator: StarkIndustriesProductTranslator = StarkIndustriesProductTranslator.prototype;
		
		const min = Math.min(sourceProducts.length, products.length);
		
		let tuple: Array<[StarkIndustriesProduct, Product]> = new Array();
		for (let i = 0; i < min; i++) {
			tuple.push([sourceProducts[i], products[i]])
		}
		tuple.map(s => {
			jest.spyOn(StarkIndustriesProductTranslator.prototype, 'translate').mockImplementation(() => s[1]);
		})
		const sut = new StarkIndustriesProductImporter(productSource, translator)
		const actual: Product[] = sut.fetchProducts();
		
		expect(actual).toEqual(expect.arrayContaining(products));
	})
})

