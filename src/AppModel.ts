import { PositiveIntegerGenerator } from "./PositiveIntegerGenerator";
const NEW_LINE = '\n';

export class AppModel {
	
	constructor(
		private generator: PositiveIntegerGenerator,
		private output: string = '1: Single player game' + NEW_LINE + '2: Multiplayer game' + NEW_LINE + '3: Exit' + NEW_LINE + 'Enter selection: ',
		private completed: boolean = false,
		private answer: number = generator.generateLessThanOrEqualToHundred(),
		private singPlayerMode: boolean = false
	) {}

	isCompleted(): boolean {
		return this.completed;
	}
	flushOutput(): string {
			return this.output;
			
	}

	processInput(input: string): void {
		if (this.singPlayerMode) {
			this.processSinglePlayerGame(input);
		} else {
			this.processModeSelection(input);
		}
	}

	private processSinglePlayerGame(input: string) {
		const guess = parseInt(input);
		if (guess < this.answer) {
			this.output = 'Your guess is too low' + NEW_LINE + 'Enter your guess: ';
		}
		else if (guess > this.answer) {
			this.output = 'Your guess is too high' + NEW_LINE + 'Enter your guess: ';
		}
		else {
			this.output = 'Correct';
		}
	}

	private processModeSelection(input: string) {
		if (input === '1') {
			this.output = 'Single player game' + NEW_LINE + 'I am thinking of a number between 1 and 100' + NEW_LINE + 'Enter your guess: ';
			this.singPlayerMode = true;
		}
		else {
			this.completed = true;
		}
	}
}