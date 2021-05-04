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
	
	it('sut prints multiplayer game setup message', () => {
		const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
		sut.flushOutput();
		sut.processInput('2');
		
		const actual = sut.flushOutput();
		
		expect(actual).toEqual('Multiplayer game' + NEW_LINE + 'Enter player names with commas:')
	})
	
	it('sut prints multiplayer game start message', () => {
		const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));

		sut.processInput('2');
		sut.flushOutput();
		sut.processInput('foo, bar');
		
		const actual = sut.flushOutput();
		
		expect(actual).toContain('I am thinking of a number between 1 and 100');
		
	})
	
	const params3 = [
		['foo', 'bar', 'baz'],
		['bar', 'baz', 'foo'],
		['baz', 'foo', 'bar']
	];
	each(params3).it('sut prompts first player name', (player: string, player2: string, player3: string) => {
		const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
		sut.processInput('2');
		sut.flushOutput();
		sut.processInput([player, player2, player3].join(','))
		
		const actual = sut.flushOutput();
		
		expect(actual).toContain('Enter ' + player + "'s guess: ")
	})
	
	each(params3).it('sut prompts second player name', (player: string, player2: string, player3: string) => {
		const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
		sut.processInput('2');
		sut.flushOutput();
		sut.processInput([player, player2, player3].join(','))
		sut.flushOutput();
		sut.processInput('10');
		
		const actual = sut.flushOutput();
		
		expect(actual).toContain(' Enter ' + player2 + "'s guess: ")

	})
	each(params3).it('sut prompts third player name', (player: string, player2: string, player3: string) => {
		const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
		sut.processInput('2');
		sut.flushOutput();
		sut.processInput([player, player2, player3].join(','))
		sut.flushOutput();
		sut.processInput('10');
		sut.flushOutput();
		sut.processInput('10');
		
		const actual = sut.flushOutput();
		expect(actual).toContain(' Enter ' + player3 + "'s guess: ")
	})
	each(params3).it('sut rounds players', (player: string, player2: string, player3: string) => {
		const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
		sut.processInput('2');
		sut.processInput([player, player2, player3].join(','))
		sut.processInput('10');
		sut.processInput('10');
		sut.flushOutput();
		sut.processInput('10');
		
		const actual = sut.flushOutput();
		expect(actual.endsWith(' Enter ' + player + "'s guess: ")).toBeTruthy();
	})
	
	const params4 = [
		['50', '40', '1', 'foo'],
		['30', '29', '2', 'bar'],
	];
	
	each(params4).it('sut prints too low message in multiplayer game', 
	(answer: number, guess: number, fails: number, lastPlayer: string) => {
		const sut = new AppModel(new PositiveIntegerGeneratorStub([answer]));
		sut.processInput('2');
		sut.processInput('foo,bar,baz');
		for (let i = 0; i < fails - 1; i++) {
			sut.processInput(guess.toString())
		}
		sut.flushOutput();
		sut.processInput(guess.toString());
		
		const actual = sut.flushOutput()
		expect(actual.startsWith(lastPlayer + "'s guess is too low" + NEW_LINE)).toBeTruthy();
	})
	const params5 = [
		['50', '55', '1', 'foo'],
		['30', '33', '2', 'bar'],
	];
	
	each(params5).it('sut prints too high message in multiplayer game', 
	(answer: number, guess: number, fails: number, lastPlayer: string) => {
		const sut = new AppModel(new PositiveIntegerGeneratorStub([answer]));
		sut.processInput('2');
		sut.processInput('foo,bar,baz');
		for (let i = 0; i < fails - 1; i++) {
			sut.processInput(guess.toString())
		}
		sut.flushOutput();
		sut.processInput(guess.toString());
		
		const actual = sut.flushOutput()
		expect(actual.startsWith(lastPlayer + "'s guess is too high" + NEW_LINE)).toBeTruthy();
	})
	
	each([1, 10, 100]).it('sut prints correct message in multiplayer game', (answer: number) => {
		const sut = new AppModel(new PositiveIntegerGeneratorStub([answer]));
		sut.processInput('2');
		sut.processInput('foo,bar,baz');
		sut.flushOutput();
		
		const guess = answer;
		
		sut.processInput(guess.toString())
		
		const actual = sut.flushOutput();
		
		expect(actual.startsWith('correct! ')).toBeTruthy();
	})
	
	const params6 = [
		[0, 'foo'],
		[1, 'bar'],
		[2, 'baz'],
		[99, 'foo'],
		[100, 'bar'],
	];
	
	each(params6).it('sut prints winner if muliplayer game is finished',
	(fails: number, winner: string) => {
		const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
		sut.processInput('2');
		sut.processInput('foo,bar,baz');
		for (let i = 0; i < fails; i++) {
			sut.processInput('30')
		}
		sut.flushOutput();
		sut.processInput('50');

		const actual = sut.flushOutput();
		console.log(actual)

		expect(actual).toContain(winner + ' wins' + NEW_LINE);
		
		
	})
	
	
	
	
})