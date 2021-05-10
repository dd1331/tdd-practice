import { WayneEnterprisesProduct } from "./WayneEnterPrisesProduct";
import { Product } from "../../Product";

export interface WayneEnterprisesProductSource {
	fetchProducts(): Iterable<WayneEnterprisesProduct>;
}