import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Flex } from "rebass";

import { LayoutMagistrat } from "../../src/components-v2/Layout";
import { MagistratFilters } from "../../src/components-v2/MagistratFilters";
import { FiltersContextProvider } from "../../src/components-v2/MagistratFilters/context";
import { MagistratMesures } from "../../src/components-v2/MagistratMesures";
import { withAuthSync } from "../../src/util/auth";

const Mesures = () => {
  return (
    <FiltersContextProvider>
      <LayoutMagistrat>
        <BoxWrapper mt={6} px="1">
          <Heading1>Toutes vos mesures</Heading1>
          <MagistratFilters />
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2"
            }}
          >
            <MagistratMesures />
          </Flex>
        </BoxWrapper>
      </LayoutMagistrat>
    </FiltersContextProvider>
  );
};

export default withAuthSync(Mesures);
