import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { Appbar, Portal, Modal, Provider, ActivityIndicator } from 'react-native-paper';
import Constants from 'expo-constants';
import SchemeModal from '../components/scheme-components/SchemeModal';
import SchemeCard from '../components/scheme-components/SchemeCard';

import { getData, storeData } from '../storage/async_storage';

export default function SavedSchemesScreen(props) {
    const [colorSchemes, setColorSchemes] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [activeScheme, setActiveScheme] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

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
                setActiveScheme(colorSchemes[0]);
                setLoading(false);
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
        setActiveScheme(colorSchemes[0]);
        setModalVisible(false);
    }

    const updateScheme = async (id, scheme) => {
        let index = colorSchemes.findIndex((x)=>{
            return x.id === id;
        });
        let temp = colorSchemes;
        temp[index] = scheme;
        setColorSchemes(temp);
        await storeData(temp);
        setActiveScheme(colorSchemes[index]);
        setModalVisible(false);
    }
    if(loading){
        return <ActivityIndicator animating={true} style={{marginTop: 100}} />
    }
    return (
        <View style={styles.container}>
            <Provider>
            <Appbar style={[styles.appbar, { backgroundColor: activeScheme ? '#' + activeScheme.colors[0] : '#ff0000' }]}>
                <Appbar.Content title="Color Schemes" subtitle="Color Scheme Generator" />
            </Appbar>
                <Portal>
                    <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                        <SchemeModal colorScheme={activeScheme} deleteScheme={deleteScheme} updateScheme={updateScheme} />
                    </Modal>
                </Portal>
                <SafeAreaView style={styles.safeAreaContainer}>
                    <ScrollView>
                        {
                            (colorSchemes.length > 0 && colorSchemes !== null) ? colorSchemes.map((colors) => {
                                return (
                                    <SchemeCard key={colors.id} colors={colors.colors} openModal={() => openModal(colors)} />
                                )
                            })
                                :
                                <View style={{ padding: 30 }}>
                                    <Text style={{ justifyContent: 'center', alignContent: 'center', fontSize: 20 }}>No Schemes Saved!</Text>
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
    appbar: {
    },
    modal: {
        flex: 1,
        backgroundColor: 'white'
    }

});