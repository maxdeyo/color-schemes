import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import { Appbar, Button, Provider, ActivityIndicator } from 'react-native-paper';

import { storeData, getData } from '../storage/async_storage';
import Slider from '../components/Slider';
import SchemeVariationPickers from '../components/SchemeVariationPickers';
import SaveSchemeModal from '../components/SaveSchemeModal';
import ColorScroller from '../components/color-scrollers/ColorScroller';
import HorizontalColorScroller from '../components/color-scrollers/HorizontalColorScroller';
import ViewColor from '../components/ViewColor';
import { filterDuplicates } from '../util/helperFunctions';

const colorGenerator = require('../util/colorGenerator');

var ColorScheme = require('color-scheme');

export default function HomeScreen() {

    const [hue, setHue] = React.useState(0);
    const [myScheme, setMyScheme] = React.useState('mono');
    const [myVariation, setMyVariation] = React.useState('default');
    const [distance, setDistance] = React.useState(1);
    const [distanceDisabled, setDistanceDisabled] = React.useState(true);
    const [saveModalVisible, setSaveModalVisible] = React.useState(false);
    const [title, setTitle] = React.useState('My Colors');
    const [turned, toggleTurned] = React.useState(false);
    const [selectedColorIndex, setSelectedColorIndex] = React.useState(0);
    const [colorEditorModal, toggleColorEditorModal] = React.useState(false);
    const [colors, setColors] = React.useState();
    const [savedSchemes, setSavedSchemes] = React.useState([]);
    const [contrast, setContrast] = React.useState('white');

    //load from async storage on mount
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
    }, []);

    //init curr color scheme and update when one of 4 criteria changes
    React.useEffect(() => {
        let scheme = new ColorScheme;
        scheme.from_hue(hue).scheme(myScheme).variation(myVariation).distance(distance);
        let colors = scheme.colors();
        colors = filterDuplicates(colors);
        setColors(colors);
        setContrast(colorGenerator.hexSetContrast('#' + colors[0]));
    }, [hue, myScheme, myVariation, distance]);

    React.useEffect(() => {
        if (myScheme == 'triade' || myScheme == 'tetrade' || myScheme == 'analogic') {
            setDistanceDisabled(false);
        } else {
            setDistanceDisabled(true);
        }
    }, [myScheme]);

    const deleteColor = (index) => {
        if (colors.length === 1) {
            //if only one color left, reset all values in generator
            setHue(0);
            setMyScheme('mono');
            setMyVariation('default');
            setDistance(1);
        } else {
            let arr = colors;
            arr.splice(index, 1);
            setColors(arr);
            setSelectedColorIndex(0);
            toggleColorEditorModal(!colorEditorModal);
        }
    }

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
    const editColor = (index, color) => {
        let colorArr = colors;
        colorArr[index] = color;
        setColors(colorArr);
        toggleColorEditorModal(!colorEditorModal);
    }
    const selectColor = (index) => {
        setSelectedColorIndex(index);
        toggleColorEditorModal(!colorEditorModal);
    }

    return (
        <View style={styles.container}>
            {colors ?
                <Provider>
                    <Appbar style={[styles.appbar, { backgroundColor: '#' + colors[0] }]}>
                        <Appbar.Content title="Color Schemes" subtitle="Color Scheme Generator" />
                        <Appbar.Action icon={turned ? 'rotate-left' : 'rotate-right'} onPress={() => toggleTurned(!turned)} />
                    </Appbar>
                    <SaveSchemeModal
                        title={title}
                        saveModalVisible={saveModalVisible}
                        hideSaveModal={hideSaveModal}
                        setTitle={(title)=>setTitle(title)}
                        onSaveScheme={onSaveScheme}
                        colors={colors}
                    />
                    <ViewColor
                        selectedColorIndex={selectedColorIndex}
                        colors={colors}
                        visible={colorEditorModal}
                        hideModal={() => toggleColorEditorModal(!colorEditorModal)}
                        setColor={(color) => editColor(selectedColorIndex, color)}
                        deleteColor={() => deleteColor(selectedColorIndex)}
                    />
                    <View style={[styles.mainContainer, { backgroundColor: '#' + colors[0] }]}>
                        <Slider
                            setValue={setHue}
                            disabled={false}
                            maxValue={359}
                            color={contrast}
                            value={hue}/>
                        <Slider
                            setValue={setDistance}
                            disabled={distanceDisabled}
                            maxValue={1}
                            color={contrast}
                            value={distance}/>
                        <SchemeVariationPickers
                            myScheme={myScheme}
                            myVariation={myVariation}
                            setMyScheme={setMyScheme}
                            setMyVariation={setMyVariation}
                            color={contrast} />
                        {
                            turned ?
                                <HorizontalColorScroller colors={colors} selectColor={(index) => selectColor(index)} />
                                : <ColorScroller colors={colors} selectColor={(index) => selectColor(index)} />
                        }
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
                : <ActivityIndicator animating={true} />
            }
        </View >
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