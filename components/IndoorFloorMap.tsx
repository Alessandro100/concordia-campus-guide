import React, { Component } from "react";
import IndoorFloor from "../classes/indoorFloor";
import Path from "../interfaces/path";
import IndoorPOI from "../classes/indoorPOI";
import FastestPathCalculator from "../classes/fastestPathCalculator";
import transportMode from '../classes/transportMode';
import Trip from "../classes/trip";
import OutdoorPOI from "../classes/outdoorPOI";
import Location from "../classes/location";

class IndoorFloorMap extends Component<{indoorFloor: IndoorFloor, route: Path}, {trip: Trip}> {

    constructor(props) {
        super(props);
        const { indoorFloor } = this.props;

        const startLocation = new IndoorPOI('test-1', {x:5, y:27}, indoorFloor, 'test-type-1');
        // const endLocation = new OutdoorPOI(new Location(45.50349, -73.572182), 'test-end');
        const endLocation = new IndoorPOI('test-2', {x:8, y:26}, indoorFloor, 'test-type-2');
        const routeCalculator = new FastestPathCalculator(startLocation, endLocation, transportMode.walking);

        this.state = {
            trip: new Trip(startLocation, endLocation, routeCalculator),
        };

        this.loadRoute();
    }

    async loadRoute() {
        const { trip } = this.state;
    
        trip.loadRoute().then(path => {
            trip.setRoute(path);
            this.setState({ trip });
        });
    }

    render(){
        const { trip } = this.state;
        const {indoorFloor, route} = this.props;

        return(
            <>
                {indoorFloor.showFloorImage()}
                {indoorFloor.showIndoorTile()}
                {trip.getRoute() != null && (
                    <>
                        {trip.getRoute().displayPath(true, 'Hall', '1')}
                    </>
                )}
            </>
        )
    }
}

export default IndoorFloorMap;