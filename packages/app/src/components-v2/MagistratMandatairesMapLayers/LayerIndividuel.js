import React, { useContext } from "react";
import { Layer, Feature } from "react-mapbox-gl";
import { useLazyQuery } from "@apollo/react-hooks";

import { MapContext } from "../MagistratMandatairesMap/context";
import iconMarker from "../../../static/images/map-icon-individuel-man@2x.png";
import { MESURES_MANDATAIRE } from "../MagistratMandatairesMap/queries";

const image = new Image(60, 72);
image.src = iconMarker;
const images = ["individuel", image, { pixelRatio: 2 }];

const LayerIndividuel = props => {
  const { individuel } = props;
  const { currentGestionnaire, setCenter, setMesures, setcurrentGestionnaire } = useContext(
    MapContext
  );
  const [getMesures, { data }] = useLazyQuery(MESURES_MANDATAIRE);
  let currentIndividuel = individuel;

  const chooseMandataire = gestionnaire => {
    setCenter([gestionnaire.mandataire.longitude, gestionnaire.mandataire.latitude]);
    // Should move that when data are fetched so it will be less laggy
    setcurrentGestionnaire({
      id: gestionnaire.mandataire.id,
      discriminator: "MANDATAIRE_IND",
      coordinates: [gestionnaire.mandataire.longitude, gestionnaire.mandataire.latitude]
    });
    getMesures({ variables: { id: gestionnaire.mandataire.id } });
  };

  if (currentGestionnaire) {
    currentIndividuel = individuel.filter(currentService => {
      return (
        currentService.mandataire.id === currentGestionnaire.id &&
        currentGestionnaire.discriminator === "MANDATAIRE_IND"
      );
    });
  }

  if (data && data.mesures.length > 0 && currentGestionnaire.discriminator === "MANDATAIRE_IND") {
    setMesures(data.mesures);
  }

  return (
    <Layer
      onMouseEnter={e => {
        e.target.getCanvas().style.cursor = "pointer";
      }}
      onMouseLeave={e => {
        e.target.getCanvas().style.cursor = "grab";
      }}
      type="symbol"
      id="individuel"
      images={images}
      layout={{ "icon-image": "individuel" }}
    >
      {currentIndividuel.map(gestionnaire => {
        return (
          <Feature
            onClick={() => chooseMandataire(gestionnaire)}
            key={gestionnaire.id}
            coordinates={[gestionnaire.mandataire.longitude, gestionnaire.mandataire.latitude]}
          />
        );
      })}
    </Layer>
  );
};

export default LayerIndividuel;
