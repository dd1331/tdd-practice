import { ReadLine, createInterface } from "readline";
import { AppModel } from "./AppModel";
import { RandomGenerator } from "./RandomGenerator";
{	
	const readlineOg: ReadLine = createInterface({
		input: process.stdin,
		output: process.stdout,
	})
	const modelOg: AppModel = new AppModel(new RandomGenerator());
	const recursiveReadline = (model: AppModel, readline: ReadLine) => {
		readline.question(model.flushOutput(), answer => {
			model.processInput(answer);
			if (model.isCompleted() === true) {
				readlineOg.close();
			} else {
				recursiveReadline(model, readline)
			}
		});
	}
	recursiveReadline(modelOg, readlineOg);
}