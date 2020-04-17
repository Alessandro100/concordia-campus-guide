import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
} from "react-native";
import CampusEvent from "../classes/CampusEvent";
import CampusEventWebScraper from "../classes/CampusEventWebScraper";
import CampusEventComponent from "./CampusEventComponent";

type CampusEventContainerProps = {
  buildingId: string;
};

type CampusEventContainerState = {
  campusEvents: CampusEvent[];
  buildingId: string;
};

class CampusEventContainer extends Component<
  CampusEventContainerProps,
  CampusEventContainerState
> {
  constructor(props) {
    super(props);
    const { buildingId } = this.props;
    this.state = {
      buildingId,
      campusEvents: [],
    };
  }

  componentDidMount() {
    if (!CampusEventWebScraper.instance.ready) {
      const url = "https://www.concordia.ca/events.html";
      let request = new XMLHttpRequest();
      request.open("GET", url);
      request.onreadystatechange = (e) => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          CampusEventWebScraper.instance.fillCampusEvents(request.response);
          this.updateCampusEvents();
        } else {
          console.warn("error");
        }
      };
      request.responseType = "text";
      request.send();
    } else {
      this.updateCampusEvents();
    }
  }
// this will update the state if the props changes
  componentDidUpdate(prevProps, prevState) {
    const { buildingId } = this.props;
    if (prevProps.buildingId !== buildingId) {
      this.setState({ buildingId: buildingId });
      this.setState({
        campusEvents: CampusEventWebScraper.instance.getCampusEvents(
          buildingId
        ),
      });
    }
  }

  updateCampusEvents(): void {
    const { buildingId } = this.state;
    this.setState({
      campusEvents: CampusEventWebScraper.instance.getCampusEvents(buildingId),
    });
  }

  render() {
    if (this.state.campusEvents) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            data={this.state.campusEvents}
            renderItem={({ item }) => (
              <CampusEventComponent campusEvent={item} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>
      );
    } else {
      return (
        <View>
          <Text>Loading Events...</Text>
        </View>
      );
    }
  }
}
export default CampusEventContainer;
