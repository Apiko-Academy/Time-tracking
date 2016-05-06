import { loadFilePicker } from 'meteor/natestrauser:filepicker-plus';
import { outputHandler } from './output-handler.js';

const KEY = 'AMxXlNUEKQ1OgRo47XtKSz';
loadFilePicker(KEY);


//let changeIcon = (options) => { //my option
//	filepicker.pick({
//			mimetypes: ['image/gif','image/jpeg','image/png'],
//			multiple: false
//		},
//		function(InkBlobs){
//			options.onsuccess(InkBlobs.url);
//		},
//		function(FPError){
//			options.onerror(FPError.toString());
//		});
//};

//let changeIcon = (callback) => { //old
//	filepicker.pick({
//			mimetypes: ['image/gif','image/jpeg','image/png'],
//			multiple: false
//		},
//		function(InkBlobs){
//			callback(InkBlobs.url);
//		},
//		function(FPError){
//			outputHandler(FPError.toString());
//		});
//};

let changeIcon = (handler) => { //new
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