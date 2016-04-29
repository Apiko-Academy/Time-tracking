import './routes/hooks.js';
import './account-config.js';
import './sAlert-config.js';


Template.registerHelper( 'avatar', function(user) {
  if ( user && user.md5hash ) {
    var md5hash = user.md5hash;
  } else if ( this.md5hash ) {
    var md5hash = this.md5hash;
  }

  md5hash = md5hash || "3eda6fcd3204ef285fa52176c28c4d3e";
  return Gravatar.imageUrl( md5hash, {secure: true} );
});