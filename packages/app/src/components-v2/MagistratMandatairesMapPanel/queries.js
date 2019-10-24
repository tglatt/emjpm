import gql from "graphql-tag";

export const GET_MANDATAIRE = gql`
  query view_mesure_gestionnaire($mandataireId: Int, $serviceId: Int, $discriminator: String) {
    mandataire: view_mesure_gestionnaire_tis(
      where: {
        discriminator: { _eq: $discriminator }
        service_id: { _eq: $serviceId }
        mandataire_id: { _eq: $mandataireId }
      }
    ) {
      gestionnaire {
        discriminator
        mesures_awaiting
        mesures_in_progress
        mesures_max
        mandataire_id
        remaining_capacity
        service_id
        mandataire {
          telephone
          ville
          adresse
          code_postal
          user {
            nom
            prenom
            email
          }
          genre
          id
        }
        gestionnaire_tis {
          tis {
            id
            etablissement
          }
        }
        service {
          id
          nom
          prenom
          ville
          adresse
          code_postal
          telephone
          email
          etablissement
          service_antennes(where: { headquarters: { _eq: true } }) {
            id
          }
        }
      }
    }
  }
`;
