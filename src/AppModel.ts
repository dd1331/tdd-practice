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
				this.println('Single player game')
				this.println('I am thinking of a number between 1 and 100')
				this.print('Enter your guess: ')
				const answer = this.generator.generateLessThanOrEqualToHundred();
				return this.getSinglePlayerGameProcessor(answer, 1);
			} else if ( input === '2') {
				this.println('Multiplayer game');
				this.print('Enter player names with commas:');
				const answer = this.generator.generateLessThanOrEqualToHundred();
				return this.startMultiPlayerGame(answer);
			}
			else {
				this.completed = true;
				return this.processor
			}
		}
	}

	private println(message: string) {
		this.output += message + NEW_LINE;
	}

	private print(message: string) {
		this.output += message;
	}

	private getSinglePlayerGameProcessor(answer: number, tries: number): Processor {
		return input => {
			const guess = parseInt(input);
			// this.tries += 1;
			if (guess < answer) {
				this.println('Your guess is too low');
				this.print('Enter your guess: ');
				return this.getSinglePlayerGameProcessor(answer, tries + 1);
			}
			else if (guess > answer) {
				this.println('Your guess is too high');
				this.print('Enter your guess: ');
				return this.getSinglePlayerGameProcessor(answer, tries + 1);
			}
			else {
				this.println('Correct' + (tries) + (tries === 1 ? ' guess' : ' guesses'));
				this.println('1: Single player game');
				this.println('2: Multiplayer game')
				this.println('3: Exit');
				this.print('Enter selection: ');
				tries = 0;
				return this.processModeSelection()
			}
		}
	}
	
	private startMultiPlayerGame(answer: number): Processor {
		return input => {
			const players = input.split(',')
			this.println('I am thinking of a number between 1 and 100'); 
			return this.getMultiPlayerGameProcessor(players, 1, answer);
		}
	}
	private getMultiPlayerGameProcessor(players: string[], tries: number, answer: number): Processor {
		const player = players[(tries - 1) % players.length];
		this.print(' Enter ' + player + "'s guess: ");
		return input => {
			const guess = parseInt(input);
			if (guess < answer) {
				this.println(player + "'s guess is too low");
				return this.getMultiPlayerGameProcessor(players, tries + 1, answer)
			} else if (guess > answer) {
				this.println(player + "'s guess is too high");
				return this.getMultiPlayerGameProcessor(players, tries + 1, answer)
			} else {
				this.println('correct! ' + player +' wins');
				this.print(AppModel.SELECT_MODE_MESSAGE);
				return this.processModeSelection();
			}
		}
	}
}