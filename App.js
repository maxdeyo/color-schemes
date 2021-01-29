import * as React from 'react';
import { Text, View, StyleSheet, Button, Picker } from 'react-native';
import Constants from 'expo-constants';

var ColorScheme = require('color-scheme');

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';



export default function App() {
  const [hue, setHue] = React.useState(0);
  const [myScheme, setMyScheme] = React.useState('mono');
  const [myVariation, setMyVariation] = React.useState('default');
  let scheme = new ColorScheme;
  scheme.from_hue(hue).scheme(myScheme).variation(myVariation);
  let colors = scheme.colors();
  return (
    <View style={styles.container}>
      <Button
        onPress={()=>setHue(hue+5)}
        style={{height:100}}
        title='Increment'/>
      <Picker
            selectedValue={myScheme}
            style={{ height: 50, width: 150, alignSelf: 'center'}}
            onValueChange={(itemValue) => setMyScheme(itemValue)}
          >
            <Picker.Item label="Mono" value="mono" />
            <Picker.Item label="Contrast" value="contrast" />
            <Picker.Item label="Tetrade" value="tetrade" />
            <Picker.Item label="Triade" value="triade" />
            <Picker.Item label="Analogic" value="analogic" />
      </Picker>
      <Picker
            selectedValue={myVariation}
            style={{ height: 50, width: 150, alignSelf: 'center'}}
            onValueChange={(itemValue) => setMyVariation(itemValue)}
          >
            <Picker.Item label="Default" value="Default" />
            <Picker.Item label="Pastel" value="pastel" />
            <Picker.Item label="Soft" value="soft" />
            <Picker.Item label="Light" value="light" />
            <Picker.Item label="Hard" value="hard" />
      </Picker>
      {
        colors.map((i)=>{
          return <View style={{backgroundColor:'#'+i, height: 100, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: '#afaaaaaa', width: 75, borderRadius: 50}}><Text style={{textAlign: 'center', fontWeight: 'bold', color: '#fff'}}>#{i}</Text></View>
          </View>
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});