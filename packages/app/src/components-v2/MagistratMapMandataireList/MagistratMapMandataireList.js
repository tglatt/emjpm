import React, { useState, useContext } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { Box, Flex } from "rebass";
import { Mandatairelist } from "@socialgouv/emjpm-ui-components";
import { Button } from "@socialgouv/emjpm-ui-core";
import { Scrollbar } from "react-scrollbars-custom";

import { MapContext } from "../MagistratMandatairesMap/context";
import { formatMandatairesList } from "../MandatairesList/utils";
import { MagistratMapMandataireListStyle } from "./style";
import { MESURES_SERVICE, MESURES_MANDATAIRE, MESURES_GESTIONNAIRE } from "./queries";

const RESULT_PER_PAGE = 20;

const MagistratMapMandataireList = props => {
  const { tiId } = props;
  const [currentPage, setCurrentPage] = useState(0);
  const { setCenter, setMesures, setcurrentGestionnaire } = useContext(MapContext);

  const [getServicesMesures, { data: servicesMesures }] = useLazyQuery(MESURES_SERVICE);
  const [getMandatairesMesures, { data: mandatairesMesures }] = useLazyQuery(MESURES_MANDATAIRE);

  const { data, error, loading, fetchMore } = useQuery(
    MESURES_GESTIONNAIRE,
    {
      variables: {
        tiId: tiId,
        offset: 0,
        limit: RESULT_PER_PAGE
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

  if (servicesMesures) {
    setMesures(servicesMesures.mesures);
  }

  if (mandatairesMesures) {
    setMesures(mandatairesMesures.mesures);
  }

  const chooseMandataire = data => {
    setCenter([data.longitude, data.latitude]);
    if (data.type === "service") {
      setcurrentGestionnaire({
        id: data.serviceId,
        discriminator: "SERVICE",
        coordinates: [data.longitude, data.latitude]
      });
      getServicesMesures({ variables: { id: data.serviceId } });
    }
    if (data.type === "préposé" || data.type === "individuel") {
      setcurrentGestionnaire({
        id: data.mandataireId,
        discriminator: data.type === "préposé" ? "MANDATAIRE_PRE" : "MANDATAIRE_IND",
        coordinates: [data.longitude, data.latitude]
      });
      getMandatairesMesures({ variables: { id: data.mandataireId } });
    }
  };

  const { count } = data.count.aggregate;
  const list = formatMandatairesList(data.mandatairesList);
  return (
    <Box pt="2" px="2" sx={MagistratMapMandataireListStyle} {...props}>
      <Scrollbar style={{ width: "100%", height: "100%" }}>
        <Box mr="1">
          <Mandatairelist
            isMagistratMap
            selectCurrentMandataire={data => chooseMandataire(data)}
            mandataires={list}
          />
          {count > RESULT_PER_PAGE && count > currentPage - RESULT_PER_PAGE && (
            <Flex mt="5" mb="5" alignItem="center">
              <Button
                onClick={() => {
                  fetchMore({
                    variables: {
                      offset: currentPage + RESULT_PER_PAGE
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      setCurrentPage(currentPage + RESULT_PER_PAGE);
                      return {
                        count: fetchMoreResult.count,
                        mandatairesList: [
                          ...prev.mandatairesList,
                          ...fetchMoreResult.mandatairesList
                        ]
                      };
                    }
                  });
                }}
              >
                Afficher les mandataires suivants
              </Button>
            </Flex>
          )}
        </Box>
      </Scrollbar>
    </Box>
  );
};

export { MagistratMapMandataireList };