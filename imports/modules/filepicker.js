import { loadFilePicker } from 'meteor/natestrauser:filepicker-plus';

const KEY = 'AMxXlNUEKQ1OgRo47XtKSz';
loadFilePicker(KEY);

let changeIcon = (onImageLoad) => {
	filepicker.pick({
			mimetypes: ['image/gif','image/jpeg','image/png'],
			multiple: false
		},
		function(InkBlobs){
			onImageLoad(false, InkBlobs.url)
		},
		function(FPError){
			onImageLoad(true, FPError);
		});
};

export { changeIcon };