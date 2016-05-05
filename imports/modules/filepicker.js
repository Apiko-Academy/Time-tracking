import { loadFilePicker } from 'meteor/natestrauser:filepicker-plus';
import { outputHandler } from './output-handler.js';

const KEY = 'AMxXlNUEKQ1OgRo47XtKSz';
loadFilePicker(KEY);

let changeIcon = (callback) => {
	filepicker.pick({
			mimetypes: ['image/gif','image/jpeg','image/png'],
			multiple: false
		},
		function(InkBlobs){
			callback(InkBlobs.url)
		},
		function(FPError){
			outputHandler(FPError.toString());
		});
};

export { changeIcon };