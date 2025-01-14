import { compareDesc, differenceInMonths, format } from "date-fns";

const TYPES = {
  MANDATAIRE_IND: "individuel",
  MANDATAIRE_PRE: "préposé",
  SERVICE: "service"
};
const TODAY = new Date();

const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
};

const formatLastLogin = date => {
  return format(date, ["DD/MM/YYYY"]);
};

const newestLastLogin = admins => {
  const dates = admins.map(({ user: { last_login } }) => last_login).filter(Boolean);
  const [newest] = dates.sort(compareDesc);

  return newest;
};

const isCriticalDate = date => {
  return differenceInMonths(TODAY, date) >= 1;
};

export const formatMandataire = (
  remaining_capacity,
  discriminator,
  mesures_max,
  mesures_in_progress,
  service,
  mandataire,
  mesures_awaiting,
  gestionnaire_tis
) => {
  let currentDiscriminator = {};

  const common = {
    currentAvailability: remaining_capacity ? remaining_capacity : 0,
    cvLink: "test",
    dispoMax: mesures_max ? mesures_max : 0,
    isAvailable: mesures_max < mesures_in_progress,
    mesuresAwaiting: mesures_awaiting,
    mesuresInProgress: mesures_in_progress,
    tis: gestionnaire_tis,
    type: TYPES[discriminator]
  };

  if (discriminator === "SERVICE") {
    const lastLogin =
      service.service_admins && service.service_admins.length
        ? newestLastLogin(service.service_admins)
        : null;

    currentDiscriminator = {
      adresse: service.adresse ? capitalize(service.adresse) : "non renseigné",
      codePostal: service.code_postal ? capitalize(service.code_postal) : "non renseigné",
      email: service.email ? service.email : "non renseigné",
      etablissement: service.etablissement ? service.etablissement : "non renseigné",
      genre: "F",
      id: `${discriminator}-${service.id}`,
      lastLogin: lastLogin ? formatLastLogin(lastLogin) : "non renseigné",
      lastLoginIsCritical: lastLogin && isCriticalDate(lastLogin),
      nom: service.nom ? service.nom : null,
      prenom: service.prenom ? service.prenom : null,
      serviceId: service.id,
      telephone: service.telephone ? service.telephone : "non renseigné",
      ville: service.ville ? capitalize(service.ville) : "non renseigné"
    };
  } else {
    currentDiscriminator = {
      adresse: mandataire.adresse ? capitalize(mandataire.adresse) : "non renseigné",
      codePostal: mandataire.code_postal ? capitalize(mandataire.code_postal) : "non renseigné",
      email: mandataire.user && mandataire.user.email ? mandataire.user.email : "non renseigné",
      genre: mandataire.genre ? mandataire.genre : "F",
      id: `${discriminator}-${mandataire.id}`,
      lastLogin:
        mandataire.user && mandataire.user.last_login
          ? formatLastLogin(mandataire.user.last_login)
          : "non renseigné",
      lastLoginIsCritical:
        mandataire.user && mandataire.user.last_login && isCriticalDate(mandataire.user.last_login),
      mandataireId: mandataire.id,
      nom:
        mandataire.user && mandataire.user.nom ? capitalize(mandataire.user.nom) : "non renseigné",
      prenom:
        mandataire.user && mandataire.user.prenom
          ? capitalize(mandataire.user.prenom)
          : "non renseigné",
      telephone: mandataire.telephone,
      ville: mandataire.ville ? capitalize(mandataire.ville) : "non renseigné"
    };
  }
  return {
    ...common,
    ...currentDiscriminator
  };
};
