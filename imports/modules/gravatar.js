let useGravatar = (email) => {
  let imageUrl = Gravatar.imageUrl(email);
  return imageUrl;
};

export { useGravatar }