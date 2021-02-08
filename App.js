import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import HomeScreen from './screens/HomeScreen';
import SavedSchemesScreen from './screens/SavedSchemesScreen';
import DemoScreen from './screens/DemoScreen';

import {storeData} from './storage/async_storage';

const App = () => {
  /*React.useEffect(()=>{
    const checkAsync = async () => {
      await storeData([]);
  }
  checkAsync();
  }, []);*/
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'savedSchemes', title: 'Saved Schemes', icon: 'folder' },
    { key: 'demoScreen', title: 'Demo', icon: 'folder' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: () => <HomeScreen />,
    savedSchemes: () => <SavedSchemesScreen />,
    demoScreen: () => <DemoScreen />
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default App;