const { sendEmail } = require(".");
const dateFormat = require("dateformat");

const EMAIL_RESERVATION_TEXT = (ti, user, mesure) =>
  `Madame, Monsieur,

Le ${dateFormat(mesure.created_at, "dd/mm/yyyy")}, le ${
    ti.etablissement
  } ${(mesure.cabinet && `cabinet ${mesure.cabinet}`) ||
    ""}, vous a confié une nouvelle mesure :
- "type de mesure": ${mesure.type}
- "genre": ${mesure.civilite}
- "année de naissance": ${mesure.annee}.

Cette dernière a été entre-temps annulée par le magistrat, ne vous sera pas notifiée et n'apparaît plus dans vos mesures en attente.
Pour rappel, à ce jour, vous avez déclaré prendre en charge "${
    user.mesures_en_cours
  }" mesures pour une capacité souhaitée de "${user.dispo_max}" mesures.

À bientôt

L’équipe e-mjpm.`;

const cancelReservationEmail = async (ti, mesure, user) => {
  sendEmail(
    user.email,
    "e-MJPM : Annulation d'une reservation de mesure",
    EMAIL_RESERVATION_TEXT(ti, user, mesure)
  ).catch(e => {
    /* eslint-disable no-console */
    console.log(e);
    /* eslint-enable no-console */
  });
};

module.exports = {
  cancelReservationEmail
};
