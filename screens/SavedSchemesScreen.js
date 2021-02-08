import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { Appbar, Portal, Modal, Provider, Button, Card } from 'react-native-paper';
import Constants from 'expo-constants';

import { getData, storeData } from '../storage/async_storage';

const SchemeComponent = ({ colors, openModal }) => {
    return (
        <View style={styles.schemeComponent}>
            <TouchableHighlight
                onPress={openModal}
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    {
                        colors.map((color) => {
                            return (
                                <View
                                    style={[styles.individualColor, { backgroundColor: '#' + color, flex: 1 }]}
                                />
                            )
                        })
                    }
                </View>
            </TouchableHighlight>
        </View>
    )
}

const SchemeModal = ({ colors, deleteScheme }) => {
    return (
        <View style={styles.schemeModalContainer}>
            {/*<TextInput
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
                multiline={false}
                value={title}
                onChangeText={(inp) => setTitle(inp)}
                maxLength={30}
                placeholder={colors.title}
            />*/}
            <Text
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: 32, fontWeight: '600', marginTop:40 }}>
                {colors.title}
            </Text>
            <SafeAreaView style={{ height: '75%' }}>
                <ScrollView>
                    {
                        colors.colors.map((color) => {
                            return (
                                <View style={{ backgroundColor: '#' + color, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ backgroundColor: '#afaaaa66', width: 75, borderRadius: 50 }}>
                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#fff' }}>#{color}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </SafeAreaView>
            <Button
                onPress={()=>deleteScheme(colors.id)}>
                    Delete
            </Button>
        </View>
    )
}

export default function SavedSchemesScreen(props) {
    const [colorSchemes, setColorSchemes] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [activeScheme, setActiveScheme] = React.useState(null);

    const openModal = (scheme) => {
        setActiveScheme(scheme);
        setModalVisible(true);
    }
    const hideModal = () => setModalVisible(false);

    React.useEffect(() => {
        const checkAsync = async () => {
            const value = await getData();
            if (value !== undefined && value !== null) {
                console.log(JSON.stringify(value));
                setColorSchemes(value);
            } else {
                setColorSchemes([]);
            }
        }
        checkAsync();
    }, []);

    const deleteScheme = async (id) => {
        let temp = colorSchemes.filter(x => {
            return x.id != id;
        });
        setColorSchemes(temp);
        await storeData(temp);
        setModalVisible(false);
    }

    return (
        <View style={styles.container}>
            <Appbar style={[styles.appbar, { backgroundColor: (colorSchemes.length > 0 && colorSchemes !== null) ? '#' + colorSchemes[0].colors[0] : '#ff0000' }]}>
                <Appbar.Content title="Color Schemes" subtitle="Color Scheme Generator" />
            </Appbar>
            <Provider>
                <Portal>
                    <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                        <SchemeModal colors={activeScheme} deleteScheme={deleteScheme}/>
                    </Modal>
                </Portal>
                <SafeAreaView style={styles.safeAreaContainer}>
                    <ScrollView>
                        {
                            (colorSchemes.length > 0 && colorSchemes !== null) ? colorSchemes.map((colors) => {
                                return (
                                    <SchemeComponent colors={colors.colors} openModal={() => openModal(colors)} />
                                )
                            })
                                :
                                <View style={{ padding: 30 }}>
                                    <Text style={{justifyContent: 'center', alignContent: 'center', fontSize: 32}}>No Schemes Saved!</Text>
                                </View>
                        }
                    </ScrollView>
                </SafeAreaView>
            </Provider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    schemeComponent: {
        height: 100,
        paddingTop: 10
    },
    individualColor: {
        flex: 1
    },
    appbar: {
    },
    schemeModalContainer: {
        height: '50%',
        flex: 1
    },
    modal: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        marginTop: 100
    }

});