import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import InputBtn from '../components/InputBtn';
import { TouchableOpacity,Image, TextInput } from 'react-native';


describe('Sample Test Suite', () => {
    
    test('Navigation Button Loaded', done => {
       
        const wrapperMount = mount(<InputBtn />);
        expect(wrapperMount.state().inputModal).toEqual(false);
        expect(wrapperMount.find(TouchableOpacity)).toHaveLength(1); 
        expect(wrapperMount.find(Image)).toHaveLength(1); 
        done();
      });
  
      test('Inputs Loaded', () => {
        const wrapperButton = shallow (<InputBtn />);
        expect(wrapperButton.state().inputModal).toEqual(false);

          wrapperButton
            .find('[testID="navBtn"]')
            .props()
            .onPress();
            expect(wrapperButton.state().inputModal).toEqual(true);
            expect(wrapperButton.find(TouchableOpacity)).toHaveLength(3); 
            expect(wrapperButton.find(Image)).toHaveLength(9); 
            expect(wrapperButton.find(TextInput)).toHaveLength(2); 
      });
      test('Return Loaded', () => {
        const wrapperReturn = shallow (<InputBtn />);
        wrapperReturn.setState({ inputModal: true });
        expect(wrapperButton.find(Image)).toHaveLength(9); 
        expect(wrapperReturn.find(TouchableOpacity)).toHaveLength(3); 

          wrapperReturn
            .find('[testID="returnBtn"]')
            .props()
            .onPress();
            expect(wrapperReturn.state().inputModal).toEqual(false);
            expect(wrapperReturn.find(TouchableOpacity)).toHaveLength(1); 
            expect(wrapperButton.find(Image)).toHaveLength(); 
            expect(wrapperReturn.find(TextInput)).toHaveLength(0); 

      });
});
