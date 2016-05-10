import { loadFilePicker } from 'meteor/natestrauser:filepicker-plus';
import { outputHandler } from './output-handler.js';

const KEY = 'AMxXlNUEKQ1OgRo47XtKSz';
loadFilePicker(KEY);

let changeIcon = (handler) => {
	filepicker.pick({
			mimetypes: ['image/gif','image/jpeg','image/png'],
			multiple: false
		},
		function(InkBlobs){
			handler(false, InkBlobs.url);
		},
		function(FPError){
			handler(FPError);
		});
};
export { changeIcon };