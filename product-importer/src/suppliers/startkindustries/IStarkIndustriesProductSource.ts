import { StarkIndustriesProduct } from "./StarkIndustriesProduct";

export interface IStarkIndustriesProductSource {
	getAllProducts(): StarkIndustriesProduct[];
}