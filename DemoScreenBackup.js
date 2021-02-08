import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { getData } from '../storage/async_storage';

const AssignColorsContainer = ({ colors, assignedColors, setAssignedColors }) => {
    const [currColors, setCurrColors] = React.useState(assignedColors);
    const [primary, setPrimary] = React.useState(currColors[0]);
    const [secondary, setSecondary] = React.useState(currColors[0]);
    const [tertiary, setTertiary] = React.useState(currColors[0]);
    const [background, setBackground] = React.useState(currColors[0]);
    const [headerText, setHeaderText] = React.useState(currColors[0]);
    const [text, setText] = React.useState(currColors[0]);

    const assignColor = (color, key) => {
        let temp = {
            ...currColors,
            [key]:color
        }
        setCurrColors(temp);
    }
    React.useEffect(() => {
        setAssignedColors(currColors);
    }, [currColors])

    return (
        <View style={styles.assignColorsContainer}>
            {
                Object.keys(currColors).map((key) => {
                    return (
                    <Picker
                        selectedValue={currColors[key]}
                        style={{ height: 50, width: 150, alignSelf: 'center' }}
                        onValueChange={(itemValue) => assignColor('#' + itemValue, key)}
                        prompt={key.toString()}
                    >
                        {
                            colors.map((color) => {
                                return (<Picker.Item label={'#' + color} value={'#' + color} />)
                            })
                        }
                    </Picker>)
                })}
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
                            (currScheme.colors.length > 0 && currScheme.colors !== null) ?
                                <AssignColorsContainer colors={currScheme.colors} assignedColors={assignedColors} setAssignedColors={setAssignedColors} />
                                : <Text>Null</Text>
                        }
                    </View>
                    :
                    <Text style={styles.errorText}>No Color Schemes Saved</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        flex: 1
    }
})