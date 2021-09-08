import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@color_schemes';

export const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
}

export const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
      console.log(e);
    }
}