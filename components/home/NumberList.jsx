import React, { Component } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import {getWidth} from '../util/Width'

class NumberList extends Component {
  constructor(props) {
    super(props);
  }
  renderItem = ({ item }) => {
    if (item.isLastItem) {
      if (item.length === 0) {
        return <Text style={styles.emptyListText}>Drück!</Text>;
      }
      let sepWidth = getWidth() / 2 - 20;
      return <View style={{ width: sepWidth }} />;
    }
    return <Text style={styles.number}>{item.value}</Text>;
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          inverted
          data={[
            { isLastItem: true, length: this.props.numbers.length, id: "last" },
            ...this.props.numbers,
          ]}
          renderItem={this.renderItem}
          horizontal={true}
          extraData={this.props}
          keyExtractor={(item) => item.id}
          maxToRenderPerBatch={20}
          style={[
            this.props.numbers.length !== 0 && { width: getWidth() },
            styles.flatlist,
          ]}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
  },
  flatlist:{
    flexGrow: 0,
  },
  number: {
    color: "#fff",
    fontSize: 60,
    fontFamily: "Roboto",
  },
  emptyListText: {
    color: "#fff",
    fontSize: 60,
    fontFamily: "Roboto",
  },
});

export default NumberList;
