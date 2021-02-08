import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Provider, Portal, Modal, Appbar, Searchbar, Button } from 'react-native-paper';
import Constants from 'expo-constants';

import { getData } from '../storage/async_storage';

function AssignColorsContainer({ colors, assignedColors, setAssignedColors }) {
    const [currColors, setCurrColors] = React.useState(assignedColors);
    const [primary, setPrimary] = React.useState('');
    const [secondary, setSecondary] = React.useState('');
    const [tertiary, setTertiary] = React.useState('');
    const [background, setBackground] = React.useState('');
    const [headerText, setHeaderText] = React.useState('');
    const [text, setText] = React.useState('');

    React.useEffect(() => {
        if (colors != null && colors.length > 0) {
            setPrimary('#' + colors[0]);
            setSecondary('#' + colors[0]);
            setTertiary('#' + colors[0]);
            setBackground('#' + colors[0]);
            setHeaderText('#' + colors[0]);
            setText('#' + colors[0]);
        }
    }, [])

    const assignColor = (color, key) => {
        let temp = {
            ...currColors,
            [key]: color
        }
        setCurrColors(temp);
    }
    React.useEffect(() => {
        setAssignedColors({
            primary: primary,
            secondary: secondary,
            tertiary: tertiary,
            background: background,
            headerText: headerText,
            text: text
        });
    }, [primary, secondary, tertiary, background, headerText, text]);

    return (
        <View style={styles.assignColorsContainer}>
            <Picker
                selectedValue={primary}
                style={{ width: '50%' }}
                onValueChange={(itemValue) => setPrimary(itemValue)}
                prompt={'Primary'}
            >
                {
                    colors.map((color) => {
                        return (<Picker.Item label={'#' + color} value={'#' + color} color={'#' + color} />)
                    })
                }
            </Picker>
            <Picker
                selectedValue={secondary}
                style={{ width: '50%' }}
                onValueChange={(itemValue) => setSecondary(itemValue)}
                prompt={'Secondary'}
            >
                {
                    colors.map((color) => {
                        return (<Picker.Item label={'#' + color} value={'#' + color} color={'#' + color} />)
                    })
                }
            </Picker>
            <Picker
                selectedValue={tertiary}
                style={{ width: '50%' }}
                onValueChange={(itemValue) => setTertiary(itemValue)}
                prompt={'Tertiary'}
            >
                {
                    colors.map((color) => {
                        return (<Picker.Item label={'#' + color} value={'#' + color} color={'#' + color} />)
                    })
                }
            </Picker>
            <Picker
                selectedValue={headerText}
                style={{ width: '50%' }}
                onValueChange={(itemValue) => setHeaderText(itemValue)}
                prompt={'Header Text'}
            >
                {
                    colors.map((color) => {
                        return (<Picker.Item label={'#' + color} value={'#' + color} color={'#' + color} />)
                    })
                }
            </Picker>
            <Picker
                selectedValue={text}
                style={{ width: '50%' }}
                onValueChange={(itemValue) => setText(itemValue)}
                prompt={'Text'}
            >
                {
                    colors.map((color) => {
                        return (<Picker.Item label={'#' + color} value={'#' + color} color={'#' + color} />)
                    })
                }
            </Picker>
            <Picker
                selectedValue={background}
                style={{ width: '50%' }}
                onValueChange={(itemValue) => setBackground(itemValue)}
                prompt={'Background'}
            >
                {
                    colors.map((color) => {
                        return (<Picker.Item label={'#' + color} value={'#' + color} color={'#' + color} />)
                    })
                }
            </Picker>
        </View>
    )
}


const DemoComponent = ({ colorObj }) => {
    return (
        <View style={[styles.demoComponentContainer, { backgroundColor: colorObj.background }]}>
            <Appbar style={{ backgroundColor: colorObj.tertiary, flex: 1 }}>
                <Appbar.Content title="Color Schemes" subtitle="Color Scheme Generator" />
            </Appbar>
            <View style={{ flex: 1 }}>
                <Searchbar />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ color: colorObj.text }}>Lorem ipsum {'\n'} blah blah blah {'\n'} blah lorem blah lorem ipsum blah foo.</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Button mode='contained' color={colorObj.primary}>
                    Button
                </Button>
            </View>
        </View>
    )
}

export default function DemoScreen() {
    const [assignedColors, setAssignedColors] = React.useState({
        primary: '',
        secondary: '',
        tertiary: '',
        background: '',
        headerText: '',
        text: ''
    });

    const [savedSchemes, setSavedSchemes] = React.useState([]);
    const [currScheme, setCurrScheme] = React.useState([]);

    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    React.useEffect(() => {
        const checkAsync = async () => {
            const value = await getData();
            if (value !== undefined && value !== null) {
                console.log(JSON.stringify(value));
                setSavedSchemes(value);
                setCurrScheme(value[0]);
            } else {
                setSavedSchemes([]);
                setCurrScheme([]);
            }
        }
        checkAsync();
    }, []);

    return (
        <View style={styles.container}>
            <Provider>
                <Appbar style={[styles.appbar, (typeof (currScheme.colors) !== 'undefined' && currScheme.colors !== null && currScheme.colors.length > 0) ? { backgroundColor: '#' + currScheme.colors[0] } : {}]}>
                    <Appbar.Content title="Color Schemes" subtitle="Color Scheme Generator" />
                </Appbar>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'transparent', padding: 20, margin: 20, flex: 1 }}>
                        <DemoComponent colorObj={assignedColors} />
                    </Modal>
                </Portal>
                {
                    (savedSchemes.length > 0 && savedSchemes !== null) ?
                        <View style={styles.mainContainer}>
                            <Picker
                                selectedValue={currScheme}
                                style={{ height: 50, width: 150, alignSelf: 'center' }}
                                onValueChange={(itemValue) => setCurrScheme(itemValue)}
                            >
                                {
                                    savedSchemes.map((scheme) => {
                                        return <Picker.Item label={scheme.title} value={scheme} />
                                    })
                                }
                            </Picker>
                            {
                                (typeof (currScheme.colors) !== 'undefined' && currScheme.colors !== null && currScheme.colors.length > 0) ?
                                    <AssignColorsContainer colors={currScheme.colors} assignedColors={assignedColors} setAssignedColors={setAssignedColors} />
                                    : <Text>No Scheme Assigned</Text>
                            }
                        </View>
                        :
                        <Text style={styles.errorText}>No Color Schemes Saved</Text>
                }
            </Provider>
            <Button onPress={showModal}>
                Show Demo
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight
    },
    mainContainer: {
        flex: 1
    },
    errorText: {
        textAlign: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    assignColorsContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        backgroundColor: '#55555555'
    },
    demoComponentContainer: {
        flex: 1,
        padding: 20
    }
})