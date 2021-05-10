export class Pricing {
	constructor(
		private listPrice: number,
		private discount: number
	){}

	getListPrice(): number {
		return this.listPrice

	}
	getDiscount(): number {
		return this.discount
	}
}