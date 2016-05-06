import { loadFilePicker } from 'meteor/natestrauser:filepicker-plus';
import { outputHandler } from './output-handler.js';

const KEY = 'AMxXlNUEKQ1OgRo47XtKSz';
loadFilePicker(KEY);


let changeIcon = (options) => { //my option

//let changeIcon = (callback) => { //old
	filepicker.pick({
			mimetypes: ['image/gif','image/jpeg','image/png'],
			multiple: false
		},
		function(InkBlobs){
			//callback(InkBlobs.url); //old
			options.onsuccess(InkBlobs.url); //my option
		},
		function(FPError){
			//outputHandler(FPError.toString()); //old
			options.onerror(FPError.toString());//my option
		});
};

export { changeIcon };