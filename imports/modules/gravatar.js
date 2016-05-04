import { Gravatar } from 'meteor/jparker:gravatar';
import { regExEmail, emptyString } from './regex.js';

let useGravatar = (email) => {
  check(email, regExEmail);
  check(email, emptyString);
  let imageUrl = Gravatar.imageUrl(email);
  return imageUrl;
};

export { useGravatar }