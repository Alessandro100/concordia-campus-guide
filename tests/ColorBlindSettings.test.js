import React from 'react';
import sinon from 'sinon';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import { RadioButton } from 'react-native-paper';
import ColorBlindSettings from '../components/ColorBlindSettings';
import colorBlindMode from '../classes/colorBlindMode';

describe('change color mode', () => {
  test('snapshot', ()=>{
    const tree = renderer.create(<ColorBlindSettings />).toJSON();
    expect(tree).toMatchSnapshot();
  })
  describe('ColorBlindSettings page tests', () => {
    const onColorBlindModeSelected = sinon.spy();
    const wrapperMount = mount(<ColorBlindSettings setColorBlindMode={onColorBlindModeSelected} colorBlindMode={colorBlindMode.normal}/>);

    const radioButtons = wrapperMount.find(RadioButton)
    test('4 radio buttons should be found', ()=>{
      expect(radioButtons).toBeDefined();
      expect(radioButtons.length).toBe(4);
    })

    const normalMode = radioButtons.at(0);
    const proMode = radioButtons.at(1);
    const deuMode = radioButtons.at(2);
    const triMode = radioButtons.at(3);

    expect(wrapperMount.state().currentColorBlindMode).toBe(colorBlindMode.normal);
    test('normal click', ()=>{
      normalMode.simulate('click');
      expect(wrapperMount.state().currentColorBlindMode).toBe(colorBlindMode.normal);
      expect(onColorBlindModeSelected.calledWith(colorBlindMode.normal)).toBe(true);
    })
    test('proMode click', ()=>{
      proMode.simulate('click');
      expect(wrapperMount.state().currentColorBlindMode).toBe(colorBlindMode.protanomaly);
      expect(onColorBlindModeSelected.calledWith(colorBlindMode.protanomaly)).toBe(true);
    })
    test('deuMode click', ()=>{
      deuMode.simulate('click');
      expect(wrapperMount.state().currentColorBlindMode).toBe(colorBlindMode.deuteranomaly);
      expect(onColorBlindModeSelected.calledWith(colorBlindMode.deuteranomaly)).toBe(true);
    })
    test('triMode click', ()=>{
      triMode.simulate('click');
      expect(wrapperMount.state().currentColorBlindMode).toBe(colorBlindMode.tritanomaly);
      expect(onColorBlindModeSelected.calledWith(colorBlindMode.tritanomaly)).toBe(true);
    })
  })

});