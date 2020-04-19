import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render } from "enzyme";

import { TouchableOpacity, Image, Modal } from "react-native";
import Menu from "../components/Menu";

describe("Sample Test Suite", () => {
  test("all menu loaded", (done) => {
    const wrapperMount = mount(<Menu />);
    expect(wrapperMount.find(TouchableOpacity)).toHaveLength(9);
    expect(wrapperMount.find(Image)).toHaveLength(5);
    expect(wrapperMount.find(Modal)).toHaveLength(3);
    done();
  });

  test("open/close menu test", () => {
    const wrapperButton = shallow(<Menu />);
    expect(wrapperButton.state().showMenu).toEqual(false);
    expect(wrapperButton.state().showEvent).toEqual(false);
    expect(wrapperButton.state().showSettings).toEqual(false);

    wrapperButton
      .find('[testID="menuModal"]')
      .props()
      .onPress();
    expect(wrapperButton.state().showMenu).toEqual(true);
    expect(wrapperButton.state().showEvent).toEqual(false);
    expect(wrapperButton.state().showSettings).toEqual(false);

    wrapperButton
      .find('[testID="closeMenuModal"]')
      .props()
      .onPress();
    expect(wrapperButton.state().showMenu).toEqual(false);
    expect(wrapperButton.state().showEvent).toEqual(false);
    expect(wrapperButton.state().showSettings).toEqual(false);
  });

  test("open/close events test", () => {
    const wrapperButton = shallow(<Menu />);
    expect(wrapperButton.state().showMenu).toEqual(false);
    expect(wrapperButton.state().showEvent).toEqual(false);
    expect(wrapperButton.state().showSettings).toEqual(false);
    wrapperButton.setState({ showMenu: true });
    wrapperButton
      .find('[testID="eventModal"]')
      .props()
      .onPress();
    expect(wrapperButton.state().showMenu).toEqual(false);
    expect(wrapperButton.state().showEvent).toEqual(true);
    expect(wrapperButton.state().showSettings).toEqual(false);

    wrapperButton
      .find('[testID="closeEventModal"]')
      .props()
      .onPress();
    expect(wrapperButton.state().showMenu).toEqual(false);
    expect(wrapperButton.state().showEvent).toEqual(false);
    expect(wrapperButton.state().showSettings).toEqual(false);
  });

  test("open/close settings test", () => {
    const wrapperButton = shallow(<Menu />);
    expect(wrapperButton.state().showMenu).toEqual(false);
    expect(wrapperButton.state().showEvent).toEqual(false);
    expect(wrapperButton.state().showSettings).toEqual(false);
    wrapperButton.setState({ showMenu: true });
    wrapperButton
      .find('[testID="settingsModal"]')
      .props()
      .onPress();
    expect(wrapperButton.state().showMenu).toEqual(false);
    expect(wrapperButton.state().showEvent).toEqual(false);
    expect(wrapperButton.state().showSettings).toEqual(true);

    wrapperButton
      .find('[testID="closeSettingsModal"]')
      .props()
      .onPress();
    expect(wrapperButton.state().showMenu).toEqual(false);
    expect(wrapperButton.state().showEvent).toEqual(false);
    expect(wrapperButton.state().showSettings).toEqual(false);
  });
});
