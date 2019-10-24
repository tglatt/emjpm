import React from "react";
import { MagistratMandatairesMapList } from "./MagistratMandatairesMapList";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<MagistratMandatairesMapList />).toJSON();
  expect(tree).toMatchSnapshot();
});
