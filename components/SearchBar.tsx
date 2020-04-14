import React, { Component } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { REACT_APP_GOOGLE_PLACES_API } from 'react-native-dotenv';
import Location from '../classes/location';
import styles from '../constants/SearchBarStyling';
import locationToGooglePlaceString from '../services/LocationService';
import CampusLocations from '../constants/CampusLocations';

const apiKey = REACT_APP_GOOGLE_PLACES_API;
type searchBarProps = {
  setMapLocation(location: Location): void;
};

type searchBarState = {};

class SearchBar extends Component<searchBarProps, searchBarState> {
  setMapLocation = (lat, lng) => {
    const { setMapLocation } = this.props;
    setMapLocation(new Location(lat, lng));
  };

  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={2} // minimum length of text to search
        autoFocus={false}
        listViewDisplayed="false"
        keyboardShouldPersistTaps="always"
        returnKeyType="search" // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        keyboardAppearance="light" // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
        fetchDetails
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          this.setMapLocation(details.geometry.location.lat, details.geometry.location.lng);
        }}
        getDefaultValue={() => ''}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: apiKey,
          language: 'en', // language of the results
          location: locationToGooglePlaceString(CampusLocations.SGW.getLocation()), // Centered around hall building
          radius: '400000',
        }}
        styles={styles}
        currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current Location"
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={
          {
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }
        }
        GooglePlacesSearchQuery={{
          /* Will be useful for Issue #37 */
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          type: 'cafe',
        }}
        GooglePlacesDetailsQuery={
          {
            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
            // fields: 'formatted_address',
          }
        }
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        // predefinedPlaces={[homePlace, workPlace]}
        clearButtonMode="always"
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />
    );
  }
}
export default SearchBar;
