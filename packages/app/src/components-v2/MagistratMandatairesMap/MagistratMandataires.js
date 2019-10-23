import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { Box, Flex } from "rebass";
import dynamic from "next/dynamic";

import { MagistratMandatairesMapPanel } from "../MagistratMandatairesMapPanel";
import { MagistratMandatairesMapStyle } from "./style";
import { MESURES_GESTIONNAIRE } from "./queries";
import { MapContextProvider } from "./context";

const formatData = view_mesure_gestionnaire => {
  return view_mesure_gestionnaire.map(gestionnaire => {
    return {
      ...gestionnaire
    };
  });
};

const MagistratMandatairesMap = dynamic(
  () => import("./MagistratMandatairesMap").then(mod => mod.MagistratMandatairesMap),
  { ssr: false }
);

const MagistratMandataires = props => {
  const {
    magistrat: { ti_id }
  } = props;

  const { data, error, loading } = useQuery(
    MESURES_GESTIONNAIRE,
    {
      variables: {
        tiId: ti_id
      }
    },
    {
      fetchPolicy: "network-only"
    }
  );

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { view_mesure_gestionnaire } = data;
  const datas = formatData(view_mesure_gestionnaire);

  return (
    <MapContextProvider>
      <Flex sx={MagistratMandatairesMapStyle()}>
        <Box height="100%" flex="0 1 auto">
          <MagistratMandatairesMapPanel tiId={ti_id} />
        </Box>
        <Box height="100%" flex="1 1 auto">
          <MagistratMandatairesMap view_mesure_gestionnaire={datas} />
        </Box>
      </Flex>
    </MapContextProvider>
  );
};

export { MagistratMandataires };