import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import DirectionInput from '../components/DirectionInput';
import { TouchableOpacity,Image, TextInput } from 'react-native';
import Autocomplete from '../components/AutoCompleteInput';


describe('Sample Test Suite', () => {
    
    test('Navigation Button Loaded', done => {
       
        const wrapperMount = mount(<DirectionInput />);
        expect(wrapperMount.state().inputModal).toEqual(false);
        expect(wrapperMount.find(TouchableOpacity)).toHaveLength(1); 
        expect(wrapperMount.find(Image)).toHaveLength(1);  
        done();
      });
  
      test('Inputs Loaded', () => {
        const wrapperButton = shallow (<DirectionInput />);
        expect(wrapperButton.state().inputModal).toEqual(false);

          wrapperButton
            .find('[testID="navBtn"]')
            .props()
            .onPress();
            expect(wrapperButton.state().inputModal).toEqual(true);
            expect(wrapperButton.find(TouchableOpacity)).toHaveLength(3); 
            expect(wrapperButton.find(Autocomplete)).toHaveLength(2); 
            expect(wrapperButton.find(Image)).toHaveLength(9); 
           
      });
      test('Return Loaded', () => {
        const wrapperReturn = shallow (<DirectionInput />);
        wrapperReturn.setState({ inputModal: true });
        expect(wrapperReturn.find(Autocomplete)).toHaveLength(2); 
        expect(wrapperReturn.find(TouchableOpacity)).toHaveLength(3); 
        expect(wrapperReturn.find(Image)).toHaveLength(9); 
          wrapperReturn
            .find('[testID="returnBtn"]')
            .props()
            .onPress();
            expect(wrapperReturn.state().inputModal).toEqual(false);
            expect(wrapperReturn.find(TouchableOpacity)).toHaveLength(1); 
            expect(wrapperReturn.find(Image)).toHaveLength(1); 
            expect(wrapperReturn.find(Autocomplete)).toHaveLength(0); 
         

      });
});
