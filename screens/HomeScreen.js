import * as React from 'react';
import {  View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Appbar, Button, Provider } from 'react-native-paper';

import { storeData, getData } from '../storage/async_storage';
import HueSlider from '../components/HueSlider';
import SchemeVariationPickers from '../components/SchemeVariationPickers';
import SaveSchemeModal from '../components/SaveSchemeModal';
import ColorScroller from '../components/ColorScroller';

var ColorScheme = require('color-scheme');

export default function HomeScreen() {

    const [hue, setHue] = React.useState(0);
    const [myScheme, setMyScheme] = React.useState('mono');
    const [myVariation, setMyVariation] = React.useState('default');
    const [saveModalVisible, setSaveModalVisible] = React.useState(false);
    const [title, setTitle] = React.useState('My Colors');

    let scheme = new ColorScheme;
    scheme.from_hue(hue).scheme(myScheme).variation(myVariation);
    let colors = scheme.colors();

    const [savedSchemes, setSavedSchemes] = React.useState([]);

    React.useEffect(() => {
        const checkAsync = async () => {
            const value = await getData();
            if (value !== undefined && value !== null) {
                console.log(JSON.stringify(value));
                setSavedSchemes(value);
            } else {
                setSavedSchemes([]);
            }
        }
        checkAsync();
    }, [])

    const onSaveScheme = async (colors) => {
        let temp = savedSchemes;
        temp.push({
            title: title,
            colors: colors,
            id: savedSchemes.length == 0 ? 0 : savedSchemes[savedSchemes.length - 1].id + 1,
        });
        setSavedSchemes(temp);
        await storeData(temp);
        setSaveModalVisible(false);
    }
    const hideSaveModal = () => setSaveModalVisible(false);
    const onSavePress = () => {
        setSaveModalVisible(true);
    }

    return (
        <View style={styles.container}>
            <Provider>
                <Appbar style={[styles.appbar, { backgroundColor: '#' + colors[0] }]}>
                    <Appbar.Content title="Color Schemes" subtitle="Color Scheme Generator" />
                </Appbar>
                <SaveSchemeModal
                    title={title}
                    saveModalVisible={saveModalVisible}
                    hideSaveModal={hideSaveModal}
                    setTitle={setTitle}
                    />
                <View style={[styles.mainContainer, { backgroundColor: '#' + colors[0] }]}>
                    <HueSlider
                        setHue={setHue}/>
                    <SchemeVariationPickers
                        myScheme={myScheme}
                        myVariation={myVariation}
                        setMyScheme={setMyScheme}
                        setMyVariation={setMyVariation}/>
                    <ColorScroller colors={colors} />
                    <Button
                        style={styles.saveButton}
                        color={'#' + colors[colors.length - 1]}
                        onPress={() => onSavePress(colors)}
                        mode='contained'
                    >
                        Save Color Scheme
                    </Button>
                </View>
            </Provider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    appbar: {
        flex: 1,
        backgroundColor: '#000000'
    },
    mainContainer: {
        flex: 9
    },
    saveButton: {
        flex: 1,
        justifyContent: 'center'
    },
    sliderContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    }
});