import React from "react";
import { Text, View, StyleSheet} from "react-native";
import ClickableButton from "../util/ClickableButton"

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <ClickableButton onPress={()=>{}} color={'#fff'} tintColor={'#000'} title={"Buy skins"}/>
        <ClickableButton onPress={()=>{}} color={'#fff'} tintColor={'#000'} title={"Buy more skins"}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#222",
    }
  });

export default Settings;
