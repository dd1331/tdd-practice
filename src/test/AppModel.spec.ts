import each from 'jest-each';
import { AppModel } from "../AppModel"
import { PositiveIntegerGeneratorStub } from "../PositiveIntegerGeneratorStub";

describe('AppModel', () => {

	const NEW_LINE = '\n';

	it('sut is incompleted when it is initialized()', () => {
		const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
		const actual =  sut.isCompleted();
		
		expect(actual).toBeFalsy();
	})
	
	it('sut prints select mode message', () => {
		const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
		const actual: string = sut.flushOutput();
		
		expect(actual).toEqual('1: Single player game' + NEW_LINE + '2: Multiplayer game' + NEW_LINE + '3: Exit' + NEW_LINE + 'Enter selection: ')
		
	})
	
	it('sut exits', () => {
		const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
		
		sut.processInput('3');

		const actual: boolean = sut.isCompleted();
		expect(actual).toBeTruthy();
	})

	it('sut prints single player game start message', () => {
		const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
		sut.flushOutput();
		sut.processInput('1');
		
		const actual: string = sut.flushOutput();
		// 'Single player game' + NEW_LINE + 'I am thinking of a number between 1 and 100' + NEW_LINE + 'Enter your guess: '
		expect(actual).toEqual('Single player game' + NEW_LINE + 'I am thinking of a number between 1 and 100' + NEW_LINE + 'Enter your guess: ')
	})
	
	const params = [
		[50, 40],
		[30, 29],
		[89, 9],
	]
	each(params).it('sut prints too low message in single player game', (answer: number, guess: number) => {
		const sut = new AppModel(new PositiveIntegerGeneratorStub([answer]));
		sut.processInput('1');
		sut.flushOutput();
		sut.processInput(guess.toString());
		
		const actual: string = sut.flushOutput();
		
		expect(actual).toEqual('Your guess is too low' + NEW_LINE + 'Enter your guess: ');
	});
	const params2 = [
		[50, 69],
		[30, 31],
		[89, 93],
	];
	each(params2).it('sut prints too high message in single player game', (answer: number, guess: number) => {
		const sut = new AppModel(new PositiveIntegerGeneratorStub([answer]));
		sut.processInput('1');
		sut.flushOutput();
		sut.processInput(guess.toString());
		
		const actual: string = sut.flushOutput();
		
		expect(actual).toEqual('Your guess is too high' + NEW_LINE + 'Enter your guess: ');
	})
	
	each([1, 3, 10, 30]).it('sut prints correct message in single player game', (answer: number) => {
		const sut = new AppModel(new PositiveIntegerGeneratorStub([answer]));
		sut.processInput('1');
		sut.flushOutput();

		const guess = answer;

		sut.processInput(guess.toString());
		
		const actual: string = sut.flushOutput();
		
		expect(actual).toContain('Correct');
	})
	
	each([1, 10, 100]).it('sut prints guess count if single player game is finished', (fails) => {
		const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
		sut.processInput('1');
		for (let i = 0; i < fails; i++) {
			sut.processInput('30');
		}
		sut.flushOutput();
		sut.processInput('50');
		
		const actual: string = sut.flushOutput();
		
		expect(actual).toContain((fails + 1) + ' guesses' + NEW_LINE);
	})
	
	it('sut prints one guess if single player game is done', () => {
		const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
		sut.processInput('1');
		sut.flushOutput();
		sut.processInput('50');

		const actual = sut.flushOutput();
		
		expect(actual).toContain('1 guess');
	})
	
	it('sut prints select mode message if single player game is finished', () => {
		const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
		sut.processInput('1');
		sut.flushOutput();
		sut.processInput('50');
		
		const actual = sut.flushOutput();
		
		expect(actual).toContain('1: Single player game' + NEW_LINE + '2: Multiplayer game' + NEW_LINE + '3: Exit' + NEW_LINE + 'Enter selection: ');
	})
	
	it('sut returns to mode selection if single player game is finished', () => {
		const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
		sut.processInput('1');
		sut.processInput('50');
		sut.processInput('3');
		
		const actual = sut.isCompleted();
		expect(actual).toBeTruthy();
	})

	each(['100,10,1']).it('sut generates answer for each game', (source: string) => {
		const answers: number[] = source.split(',').map(c => parseInt(c.trim()));
		const sut = new AppModel(new PositiveIntegerGeneratorStub(answers));
		answers.forEach(answer => {
			sut.processInput('1');
			sut.flushOutput();
			sut.processInput(answer.toString());
		});

		const actual = sut.flushOutput();

		expect(actual).toContain('Correct');
	
	})

	
	
})