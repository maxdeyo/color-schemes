import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import HomeScreen from './screens/HomeScreen';
import SavedSchemesScreen from './screens/SavedSchemesScreen';
import { LogBox } from 'react-native';

const App = () => {
  React.useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, [])

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'savedSchemes', title: 'Saved Schemes', icon: 'folder' }
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: () => <HomeScreen />,
    savedSchemes: () => <SavedSchemesScreen />
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