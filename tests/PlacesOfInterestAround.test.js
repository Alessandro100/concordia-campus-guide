import React from 'react';
import { mount } from 'enzyme';
import { TouchableOpacity,Image } from 'react-native';
import PlacesOfInterestAround from '../components/PlacesOfInterestAround';


describe('Sample Test Suite', () => {
    
    test('four options button loaded', done => {
       
        const wrapperMount = mount(<PlacesOfInterestAround />);
        expect(wrapperMount.find(TouchableOpacity)).toHaveLength(4); 
        expect(wrapperMount.find(Image)).toHaveLength(4);  
        done();
      });
  
      
});
