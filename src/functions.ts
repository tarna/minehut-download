import { writeFile } from 'fs/promises';
import fetch from 'node-fetch';
import { body } from './config';
import { existsSync, mkdir } from 'fs';
import downloadsFolder from 'downloads-folder';

export async function getServerId(server: string) {
	const res = await fetch(`https://api.minehut.com/server/${server}?byName=true`);
	const data = await res.json();
	return data.server._id as string;
}

export function downloadFile(url: string, body: any, outputPath: string) {
	return fetch(url, body)
		.then(x => x.arrayBuffer())
		.then(x => writeFile(outputPath, Buffer.from(x)));
}

export async function getFiles(folder: string, server: string) {
	const data = await fetch(`https://api.minehut.com/file/${server}/list/${folder}`, body);
	const json = await data.json();
	return json.files as { name: string; directory: boolean }[];
}

export async function download(folder: string, server: string) {
	const serverId = await getServerId(server);
	const files = await getFiles(folder, serverId);
	if (!files) {
		console.error(`Unable to download the folder "${folder}" from the server "${server}".`)
		console.error(`The server "${server}" either does not exist, isn't online, or is not your server.`)
		process.exit(1);
	}
	if (!existsSync(`${downloadsFolder()}/${folder}`)) mkdir(`${downloadsFolder()}/${folder}`, () => {});
	for (const file of files) {
		if (file.directory) {
			mkdir(`${downloadsFolder()}/${folder}/${file.name}`, () => {});

			await download(`${folder}/${file.name}`, server);
		} else {
			await downloadFile(`https://${serverId}.manager.minehut.com/file/download?files=[%22/${folder}/${file.name}%22]`, body, `${downloadsFolder()}/${folder}/${file.name}`);
		}
	}
}