import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { Card, Heading4, Spinner } from "@socialgouv/emjpm-ui-core";
import { Box } from "rebass";
import { MagistratChoose } from "./MagistratMandataireMapChoose";
import { formatMandatairesList } from "../MagistratMandatairesList/utils";
import { GET_MANDATAIRE } from "./queries";

const Mandataire = props => {
  const { discriminator, id, tiId } = props;
  const { data, error, loading } = useQuery(GET_MANDATAIRE, {
    variables: {
      serviceId: discriminator === "SERVICE" ? id : null,
      mandataireId:
        discriminator === "MANDATAIRE_IND" || discriminator === "MANDATAIRE_PRE" ? id : null,
      discriminator: discriminator
    }
  });

  if (loading) {
    return (
      <Card width="100%">
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card width="100%">
        <Heading4>erreur</Heading4>
      </Card>
    );
  }

  const [mandataire] = formatMandatairesList(data.mandataire);
  return (
    <div>
      <MagistratChoose {...mandataire} tiId={tiId} />
    </div>
  );
};

export { Mandataire };
