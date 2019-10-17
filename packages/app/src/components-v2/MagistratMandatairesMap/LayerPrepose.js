import React, { useContext } from "react";
import { Layer, Feature } from "react-mapbox-gl";
import { useLazyQuery } from "@apollo/react-hooks";

import { MapContext } from "./context";
import iconMarker from "../../../static/images/map-icon-propose-man@2x.png";
import { MESURES_MANDATAIRE } from "./queries";

const image = new Image(60, 72);
image.src = iconMarker;
const images = ["prepose", image, { pixelRatio: 2 }];

const LayerPrepose = props => {
  const { prepose } = props;
  const { currentGestionnaire, setCenter, setMesures, setcurrentGestionnaire } = useContext(
    MapContext
  );
  const [getMesures, { data }] = useLazyQuery(MESURES_MANDATAIRE);

  let currentPreposes = prepose;

  const chooseMandataire = prepose => {
    // Should move that when data are fetched so it will be less laggy
    setcurrentGestionnaire({
      id: prepose.mandataire.id,
      discriminator: "SERVICE",
      coordinates: [prepose.longitude, prepose.latitude]
    });
    getMesures({ variables: { id: prepose.mandataire.id } });
  };

  if (currentGestionnaire) {
    currentPreposes = prepose.filter(currentPrepose => {
      if (currentGestionnaire.discriminator === "MANDATAIRE_PRE") {
        return null;
      }
      return currentPrepose.mandataire.id === currentGestionnaire.id;
    });
  }

  if (data && data.mesures) {
    setTimeout(function() {
      setCenter(currentGestionnaire.coordinates);
      setMesures(data.mesures);
    }, 300);
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
      id="propose"
      images={images}
      layout={{ "icon-image": "prepose" }}
    >
      {currentPreposes.map(gestionnaire => {
        return (
          <Feature
            onClick={() => chooseMandataire(gestionnaire)}
            key={gestionnaire.id}
            coordinates={[gestionnaire.longitude, gestionnaire.latitude]}
          />
        );
      })}
    </Layer>
  );
};

export default LayerPrepose;
