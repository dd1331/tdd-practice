import { PositiveIntegerGenerator } from "./PositiveIntegerGenerator";
const NEW_LINE = '\n';

export class AppModel {
	private completed: boolean = false;
	constructor(private generator:PositiveIntegerGenerator) {}

	isCompleted(): boolean {
		return this.completed;
	}
	flushOutput(): string {
			return '1: Single player game' + NEW_LINE + '2: Multiplayer game' + NEW_LINE + '3: Exit' + NEW_LINE + 'Enter selection: ';
	}

	processInput(input: string): void {
		if (input === '3') {
			this.completed = true;
		}
	}
}