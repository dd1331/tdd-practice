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
		// private processor: Processor
	) {
		this.processor  = this.processModeSelection()
	}

	isCompleted(): boolean {
		return this.completed;
	}

	flushOutput(): string {
			const result = this.output;
			this.output = '';
			return result;
	}

	processInput(input: string): void {
		this.processor = this.processor(input);
	}

	private processModeSelection(): Processor {
		return (input: string) => {
			if (input === '1') {
				this.output = 'Single player game' + NEW_LINE + 'I am thinking of a number between 1 and 100' + NEW_LINE + 'Enter your guess: ';
				const answer = this.generator.generateLessThanOrEqualToHundred();
				return this.getSinglePlayerGameProcessor(answer, 1);
			} else if ( input === '2') {
				this.output = 'Multiplayer game' + NEW_LINE + 'Enter player names with commas:';
				const answer = this.generator.generateLessThanOrEqualToHundred();
				return this.startMultiPlayerGameProcessor(answer);
			}
			else {
				this.completed = true;
				return this.processor
			}
		}
	}

	private getSinglePlayerGameProcessor(answer: number, tries: number): Processor {
		return input => {
			const guess = parseInt(input);
			// this.tries += 1;
			if (guess < answer) {
				this.output = 'Your guess is too low' + NEW_LINE + 'Enter your guess: ';
				return this.getSinglePlayerGameProcessor(answer, tries + 1);
			}
			else if (guess > answer) {
				this.output = 'Your guess is too high' + NEW_LINE + 'Enter your guess: ';
				return this.getSinglePlayerGameProcessor(answer, tries + 1);
			}
			else {
				this.output = 'Correct' + (tries) + (tries === 1 ? ' guess' : ' guesses') + NEW_LINE
				+ '1: Single player game' + NEW_LINE + '2: Multiplayer game' + NEW_LINE + '3: Exit' + NEW_LINE + 'Enter selection: ';
				tries = 0;
				return this.processModeSelection()
			}
		}
	}
	
	private startMultiPlayerGameProcessor(answer: number): Processor {
		return input => {
			const players = input.split(',')
			this.output = 'I am thinking of a number between 1 and 100' 
			return this.getMultiPlayerGameProcessor(players, 1, answer);
		}
	}
	private getMultiPlayerGameProcessor(players: string[], tries: number, answer: number): Processor {
		const player = players[(tries - 1) % players.length];
		this.output += ' Enter ' + player + "'s guess: "
		return input => {
			const guess = parseInt(input);
			if (guess < answer) {
				this.output = player + "'s guess is too low" + NEW_LINE;
				return this.getMultiPlayerGameProcessor(players, tries + 1, answer)
			} else if (guess > answer) {
				this.output = player + "'s guess is too high" + NEW_LINE;
				return this.getMultiPlayerGameProcessor(players, tries + 1, answer)
			} else {
				this.output = 'correct! ' + player +' wins' + NEW_LINE;
				this.output += AppModel.SELECT_MODE_MESSAGE;
				// this.completed = true;
				return this.processModeSelection();
			}
		}
	}
}