// checks whether user's id is present in the field(s) 'roles' of structure 'struct'

export const Roles = {
  userHasRole(userId, struct, roles) {
    if (typeof roles === "string") {
      return Array.isArray(struct[roles]) && (struct[roles].indexOf(userId) > -1);
      // if 'roles' is an array of field names the function returns true if user is listed in at least one of
      // properties from array
    } else if (Array.isArray(roles)) {
      for (let i = 0, len = roles.length; i < len; i++) {
        if (Array.isArray(struct[roles[i]]) && (struct[roles[i]].indexOf(userId) > -1)) {
          return true;
        }
      }
    }
    return false;
  }
};