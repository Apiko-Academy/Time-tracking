let regExEmail = (email) => {
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(email);
};
let MongoId = Match.Where((id) => {
  check(id, String);
  return /[a-zA-Z0-9]{17,17}/.test(id);
});
export { regExEmail, MongoId };