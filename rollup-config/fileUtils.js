import sass from 'sass';
import path from 'path';

export function buildFileExtension(id){
	const filename = path.parse(id).base;	
	return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;
}

export async function run_postcss( file){	
	const result = await new Promise((resolve, reject) => {
		sass.render({
				file: file,
				sourceMap: true,
		}, (err, result) => {
			if (err) {
				reject(err)
			} else {
				resolve(result)
			}
		})
	})		
	return result;
}



