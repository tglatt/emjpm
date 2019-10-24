import React, { useContext } from "react";
import { Layer, Feature } from "react-mapbox-gl";

import { MapContext } from "../MagistratMandatairesMap/context";
import iconMarker from "../../../static/images/map-icon-mesure@2x.png";

const image = new Image(60, 72);
image.src = iconMarker;
const images = ["mesure", image, { pixelRatio: 2 }];

const LayerMesures = () => {
  const { mesures } = useContext(MapContext);
  return (
    <Layer
      onMouseEnter={e => {
        e.target.getCanvas().style.cursor = "pointer";
      }}
      onMouseLeave={e => {
        e.target.getCanvas().style.cursor = "grab";
      }}
      type="symbol"
      id="mesure"
      images={images}
      layout={{ "icon-image": "mesure" }}
    >
      {mesures.map(mesure => {
        return <Feature key={mesure.id} coordinates={[mesure.longitude, mesure.latitude]} />;
      })}
    </Layer>
  );
};

export default LayerMesures;
