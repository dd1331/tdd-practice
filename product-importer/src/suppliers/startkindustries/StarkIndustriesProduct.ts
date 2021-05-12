export class StarkIndustriesProduct {
	public get discountAmount(): number {
		return this._discountAmount;
	}
	public get listPrice(): number {
		return this._listPrice;
	}
	public get name(): string {
		return this._name;
	}
	public get code(): string {
		return this._code;
	}
	constructor(
		private _code: string,
		private _name: string,
		private _listPrice: number,
		private _discountAmount: number
	) {}


}