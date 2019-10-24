import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Box } from "rebass";

import { MapContext } from "../MagistratMandatairesMap/context";
import { MagistratMandatairesMapList } from "../MagistratMandatairesMapList";
import { MagistratMandatairesMapPanelStyle } from "./style";
import { Mandataire } from "./Mandataire";

const MagistratMandatairesMapPanel = props => {
  const { tiId } = props;
  const { currentGestionnaire } = useContext(MapContext);
  useQuery;
  return (
    <Box sx={MagistratMandatairesMapPanelStyle} {...props}>
      {currentGestionnaire ? (
        <Mandataire
          id={currentGestionnaire.id}
          discriminator={currentGestionnaire.discriminator}
          tiId={tiId}
        />
      ) : (
        <MagistratMandatairesMapList tiId={tiId} />
      )}
    </Box>
  );
};

export { MagistratMandatairesMapPanel };
