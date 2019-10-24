import React, { useContext } from "react";
import { Layer, Feature } from "react-mapbox-gl";
import { useLazyQuery } from "@apollo/react-hooks";

import { MESURES_SERVICE } from "../MagistratMandatairesMap/queries";
import { MapContext } from "../MagistratMandatairesMap/context";
import iconMarker from "../../../static/images/map-icon-service@2x.png";

const image = new Image(60, 72);
image.src = iconMarker;
const images = ["service", image, { pixelRatio: 2 }];

const LayerServices = props => {
  const { services } = props;
  const { setCenter, setMesures, setcurrentGestionnaire, currentGestionnaire } = useContext(
    MapContext
  );
  const [getMesures, { data }] = useLazyQuery(MESURES_SERVICE);
  let currentServices = services;

  const chooseMandataire = gestionnaire => {
    setCenter([gestionnaire.service.longitude, gestionnaire.service.latitude]);
    // Should move that when data are fetched so it will be less laggy
    setcurrentGestionnaire({
      id: gestionnaire.service.id,
      discriminator: "SERVICE",
      coordinates: [gestionnaire.service.longitude, gestionnaire.service.latitude]
    });
    getMesures({ variables: { id: gestionnaire.service.id } });
  };

  if (currentGestionnaire) {
    currentServices = services.filter(
      currentService =>
        currentService.service.id === currentGestionnaire.id &&
        currentGestionnaire.discriminator === "SERVICE"
    );
  }

  if (data && data.mesures.length > 0 && currentGestionnaire.discriminator === "SERVICE") {
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
      id="service"
      images={images}
      layout={{ "icon-image": "service" }}
    >
      {currentServices.map(gestionnaire => {
        return (
          <Feature
            onClick={() => chooseMandataire(gestionnaire)}
            key={gestionnaire.id}
            coordinates={[gestionnaire.service.longitude, gestionnaire.service.latitude]}
          />
        );
      })}
    </Layer>
  );
};

export default LayerServices;
