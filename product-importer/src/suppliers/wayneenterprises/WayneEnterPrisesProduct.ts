export class WayneEnterprisesProduct {
	constructor(
		private id: string,
		private title: string,
		private listPrice: number,
		private sellingPrice: number
	) {}

	getId(): string {
		return this.id;
	}
	getTitle(): string {
		return this.title;
	}
	getListPrice(): number {
		return this.listPrice;
	}
	getSellingPrice(): number {
		return this.sellingPrice;
	}
}