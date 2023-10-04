import yargsParser from 'yargs-parser';
import { download } from './functions';
import process from 'process';

let argv = yargsParser(process.argv.slice(2));

const folder = argv.folder as string;
const server = argv.server as string;

if (!server) {
	console.error('No server specified.');
	process.exit(1);
}

if (!folder) {
	console.error('No folder specified.');
	process.exit(1);
}

async function main() {
	console.log(`Downloading the folder "${folder}" from the server "${server}"...`);
	await download(folder, server);
	console.log(`Successfully downloaded the folder "${folder}" from the server "${server}".`);
	console.log(`The folder "${folder}" is located in your downloads folder.`);
}
main();