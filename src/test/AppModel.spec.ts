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
})