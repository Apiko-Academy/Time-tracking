import { Organisation } from '../api/collections.js';
import { noImage } from './images.js';

let getOrganisationIcon = (organisationId) => {
  let organization = Organisation.findOne({_id: organisationId});
  if (organization && organization.profile && organization.profile.iconUrl ) {
    return organization.profile.iconUrl;
  } else {
    return noImage;
  }
};

export { getOrganisationIcon };