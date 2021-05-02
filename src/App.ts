import { ReadLine, createInterface } from "readline";
{	
	const readline: ReadLine = createInterface({
			input: process.stdin,
			output: process.stdout,
			// terminal: false
		})
	let input: string[] = [];
	readline.on('line', line => {
		console.log('line',line)
		input.push(line);
	})
	readline.on('close', () => {
		console.log('input',input);
		process.exit();
	})
}