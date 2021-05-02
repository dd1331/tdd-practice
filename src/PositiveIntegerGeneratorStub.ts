import { PositiveIntegerGenerator } from "./PositiveIntegerGenerator";

export class PositiveIntegerGeneratorStub implements PositiveIntegerGenerator {
	private index: number;
	constructor(private numbers: number[]){
		this.index = 0;
	}

	generateLessThanOrEqualToHundred(): number {
		const number: number = this.numbers[this.index];
		this.index = (this.index + 1) % this.numbers.length;
		return number;
	}

	
}