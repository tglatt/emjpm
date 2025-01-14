import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Flex } from "rebass";

import { LayoutServices } from "../../src/components-v2/Layout";
import { ServiceMesures } from "../../src/components-v2/ServiceMesures";
import { ServicesFilters } from "../../src/components-v2/ServicesFilters";
import { FiltersContextProvider } from "../../src/components-v2/ServicesFilters/context";
import { UserInformations } from "../../src/components-v2/UserInformations";
import { withAuthSync } from "../../src/util/auth";

const Mesures = () => {
  return (
    <FiltersContextProvider>
      <LayoutServices>
        <BoxWrapper mt={6} px="1">
          <Heading1>Toutes vos mesures en attente</Heading1>
          <UserInformations Component={props => <ServicesFilters {...props} isStatusHidden />} />
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2"
            }}
          >
            <UserInformations Component={props => <ServiceMesures isOnlyWaiting {...props} />} />
          </Flex>
        </BoxWrapper>
      </LayoutServices>
    </FiltersContextProvider>
  );
};

export default withAuthSync(Mesures);
