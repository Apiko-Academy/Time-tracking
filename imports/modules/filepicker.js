import { loadFilePicker } from 'meteor/natestrauser:filepicker-plus';
import { outputHandler } from './output-handler.js';

const KEY = 'AMxXlNUEKQ1OgRo47XtKSz';
loadFilePicker(KEY);

let changeIcon = (callbacks) => {
	filepicker.pick({
			mimetypes: ['image/gif','image/jpeg','image/png'],
			multiple: false
		},
		function(InkBlobs){
			callbacks.onsuccess(InkBlobs.url);
		},
		function(FPError){
			callbacks.onerror(FPError.toString());
		});
};
export { changeIcon };