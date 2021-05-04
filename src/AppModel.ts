import { PositiveIntegerGenerator } from "./PositiveIntegerGenerator";
const NEW_LINE = '\n';

type Processor = (input: string) => Processor;

export class AppModel {
	private static readonly SELECT_MODE_MESSAGE = '1: Single player game' + NEW_LINE + '2: Multiplayer game' + NEW_LINE + '3: Exit' + NEW_LINE + 'Enter selection: ';
	private processor: Processor

	constructor(
		private generator: PositiveIntegerGenerator,
		private output: string = AppModel.SELECT_MODE_MESSAGE,
		private completed: boolean = false,
		private answer: number = 0,
		private singPlayerMode: boolean = false,
		private tries: number = 0,
		// private processor: Processor
	) {
		this.processor  = this.processModeSelection()
	}

	isCompleted(): boolean {
		return this.completed;
	}
	flushOutput(): string {
			return this.output;
			
	}

	processInput(input: string): void {
		this.processor = this.processor(input);
		// if (this.singPlayerMode) {
		// 	this.processSinglePlayerGame(input);
		// } else {
			// 	this.processModeSelection(input);
			// }
		}
		
		// private processSinglePlayerGame(input: string) {
	private getSinglePlayerGameProcessor(tries: number): Processor {
		return input => {
			const guess = parseInt(input);
			// this.tries += 1;
			if (guess < this.answer) {
				this.output = 'Your guess is too low' + NEW_LINE + 'Enter your guess: ';
				return this.getSinglePlayerGameProcessor(tries + 1);
			}
			else if (guess > this.answer) {
				this.output = 'Your guess is too high' + NEW_LINE + 'Enter your guess: ';
				return this.getSinglePlayerGameProcessor(tries + 1);
			}
			else {
				this.output = 'Correct' + (tries) + (tries === 1 ? ' guess' : ' guesses') + NEW_LINE
				+ '1: Single player game' + NEW_LINE + '2: Multiplayer game' + NEW_LINE + '3: Exit' + NEW_LINE + 'Enter selection: ';
				this.tries = 0;
				this.singPlayerMode = false;
				return this.processModeSelection()
			}
		}
	}
	
	private processModeSelection(): Processor {
		return (input: string) => {
			if (input === '1') {
				this.output = 'Single player game' + NEW_LINE + 'I am thinking of a number between 1 and 100' + NEW_LINE + 'Enter your guess: ';
				this.singPlayerMode = true;
				this.answer = this.generator.generateLessThanOrEqualToHundred();
				return this.getSinglePlayerGameProcessor(1);
			}
			else {
				this.completed = true;
				return this.processor
			}
		}
	}
}