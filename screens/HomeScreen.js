import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants';
import Slider from '@react-native-community/slider';
import { Appbar, Button, BottomNavigation, Provider, Portal, Modal, TextInput } from 'react-native-paper';

import { storeData, getData } from '../storage/async_storage';

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
            id: savedSchemes.length==0 ? 0 : savedSchemes[savedSchemes.length-1].id+1,
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
                <Portal>
                    <Modal visible={saveModalVisible} onDismiss={hideSaveModal} contentContainerStyle={styles.saveModal}>
                        <TextInput
                            style={styles.titleInput}
                            value={title}
                            onChangeText={(inp) => setTitle(inp)}
                            maxLength={30}
                            placeholder="My Color Scheme..."
                        />
                        <Button
                            onPress={()=>onSaveScheme(colors)}
                            >Save</Button>
                    </Modal>
                </Portal>
                <View style={[styles.mainContainer, {backgroundColor: '#'+colors[0]}]}>
                    <View style={styles.sliderContainer}>
                        <Slider
                            style={{ width: 200, height: 40, justifyContent: 'center' }}
                            minimumValue={0}
                            maximumValue={359}
                            minimumTrackTintColor="#000000"
                            maximumTrackTintColor="#000000"
                            onValueChange={(val) => setHue(val)}
                        />
                    </View>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={myScheme}
                            style={{ height: 50, width: 150, alignSelf: 'center' }}
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
                            style={{ height: 50, width: 150, alignSelf: 'center' }}
                            onValueChange={(itemValue) => setMyVariation(itemValue)}
                        >
                            <Picker.Item label="Default" value="Default" />
                            <Picker.Item label="Pastel" value="pastel" />
                            <Picker.Item label="Soft" value="soft" />
                            <Picker.Item label="Light" value="light" />
                            <Picker.Item label="Hard" value="hard" />
                        </Picker>
                    </View>
                    <SafeAreaView style={styles.safeAreaContainer}>
                        <ScrollView>
                            {
                                colors.map((i) => {
                                    return <View style={{ backgroundColor: '#' + i, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ backgroundColor: '#afaaaa33', flex: 1, borderRadius: 50, justifyContent: 'center', paddingLeft: 30, paddingRight: 30 }}><Text style={{ textAlignVertical: 'center', textAlign: 'center', fontWeight: 'bold', color: '#fff', fontSize: 28, fontWeight: '100' }}>#{i}</Text></View>
                                    </View>
                                })
                            }
                        </ScrollView>
                    </SafeAreaView>
                    <Button
                        style={styles.saveButton}
                        color={'#'+colors[colors.length-1]}
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
    safeAreaContainer: {
        paddingTop: 10,
        flex: 5
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
    pickerContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'center'
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
    },
    saveModal: {
        flex: 0.3,
        backgroundColor: 'white',
        padding: 20,
        margin: 40
    },
    titleInput: {
        flex: 1,
        alignSelf: 'center',
        margin: 20
    }
});