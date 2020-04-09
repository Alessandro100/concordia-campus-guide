import colorBlindMode from '../classes/colorBlindMode';
const normal = {
  primaryColor: '#932439',
  grey: '#746D75',
  white: '#fff',
  black: 'rgba(0, 0, 0, 0.8)',
  mapMarkerColor: 'rgba(84,24,5,0.95)',
  mapsPolyline: '#6d99ec',
  tabIconDefault: '#ccc',
  tabIconSelected: '#2f95dc',
  tabBar: '#fefefe',
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: '#2f95dc',
  noticeText: '#fff',
  polygonStroke: '#a30909',
  polygonFill: 'rgba(163, 9, 9, 0.1)',
  markersPinColor: 'rgb(163, 9, 9)',
  shuttleBusMarkerPinColor: 'rgb(42,65,75)',
  searchBarPlaces: '#0041db',
}
const protanomaly = {
  primaryColor: '#6a4045',
  grey: '#716e75',
  tintColor: '#5a8fd7',
  white: '#ffffff',
  black: '#000000',
  mapMarkerColor: '#41270d',
  mapsPolyline: '#7497eb',
  tabIconDefault: '#cecbcb',
  tabIconSelected: '#5a8fd7',
  tabBar: '#fffefe',
  errorBackground: '#b75013',
  errorText: '#ffffff',
  warningBackground: '#f7e65d',
  warningText: '#6d6608',
  noticeBackground: '#5a8fd7',
  noticeText: '#ffffff',
  polygonStroke: '#753716',
  polygonFill: '#753716',
  markersPinColor: '#753716',
  shuttleBusMarkerPinColor: '#37404a',
  searchBarPlaces: '#004cbc'
}
const deuteranomaly = {
  primaryColor: '#733e36',
  grey: '#766c75',
  tintColor: '#4d90dd',
  white: '#ffffff',
  black: '#000000',
  mapMarkerColor: '#462606',
  mapsPolyline: '#6b98ec',
  tabIconDefault: '#d8c7cd',
  tabIconSelected: '#4d90dd',
  tabBar: '#fffefe',
  errorBackground: '#c34c00',
  errorText: '#ffffff',
  warningBackground: '#f7e397',
  warningText: '#76620e',
  noticeBackground: '#4d90dd',
  noticeText: '#ffffff',
  polygonStroke: '#7d3403',
  polygonFill: '#7d3403',
  markersPinColor: '#7d3403',
  shuttleBusMarkerPinColor: '#38404d',
  searchBarPlaces: '#004fac'
}
const tritanomaly= {
  primaryColor: '#922932',
  grey: '#746d75',
  tintColor: '#119abb',
  white: '#ffffff',
  black: '#000000',
  mapMarkerColor: '#551b15',
  mapsPolyline: '#5ca0c6',
  tabIconDefault: '#cdcad4',
  tabIconSelected: '#119abb',
  tabBar: '#fefeff',
  errorBackground: '#fe0f00',
  errorText: '#ffffff',
  warningBackground: '#f4e1b9',
  warningText: '#6b6343',
  noticeBackground: '#119abb',
  noticeText: '#ffffff',
  polygonStroke: '#a20f0c',
  polygonFill: '#a20f0c',
  markersPinColor: '#a20f0c',
  shuttleBusMarkerPinColor: '#2c434a',
  searchBarPlaces: '#00548f'
}

const ColorPicker = (mode: colorBlindMode) => {
    if(mode == undefined)
    {
        return normal;
    }
    else if(mode == colorBlindMode.protanomaly)
    {
        return protanomaly
    }
    else if(mode == colorBlindMode.deuteranomaly)
    {
        return deuteranomaly;
    }
    else if(mode == colorBlindMode.tritanomaly)
    {
        return tritanomaly
    }
    else return normal;


}
//for backward compatibility with code using "Colors.white" etc. Those will need to be rewritten to support color blind mode
export default normal;
export { ColorPicker }
