import { IStarkIndustriesProductSource } from "./IStarkIndustriesProductSource";
import { StarkIndustriesProduct } from "./StarkIndustriesProduct";

export class StarkIndustriesProductSourceImpl implements IStarkIndustriesProductSource {
	getAllProducts(): StarkIndustriesProduct[] {
		throw new Error("Method not implemented.");
	}
}