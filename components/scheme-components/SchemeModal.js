import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper';
import ViewColor from '../ViewColor';
import ColorScroller from '../color-scrollers/ColorScroller';

export default function SchemeModal({ colorScheme, deleteScheme, updateScheme }) {
    const [colors, setColors] = React.useState(colorScheme.colors);
    const [title, setTitle] = React.useState(colorScheme.title);
    const [selectedColorIndex, setSelectedColorIndex] = React.useState(0);
    const [colorEditorModal, toggleColorEditorModal] = React.useState(false);

    const deleteColor = (index) => {
        if (colors.length === 1) {
            deleteScheme(colorScheme.id);
        } else {
            let arr = colors;
            arr.splice(index, 1);
            setColors(arr);
            setSelectedColorIndex(0);
            toggleColorEditorModal(!colorEditorModal);
        }
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

    const onSave = () => {
        const newScheme = {
            title: title,
            colors: colors,
            id: colorScheme.id
        }
        updateScheme(colorScheme.id, newScheme);
    }

    return (
        <View style={[styles.schemeModalContainer, { backgroundColor: '#' + colors[0] }]}>
            <TextInput
                style={[styles.textInput, {backgroundColor: '#' + colors[0]}]}
                multiline={false}
                value={title}
                onChangeText={(inp) => setTitle(inp)}
                maxLength={30}
                placeholder={title}
            />
            <ViewColor
                selectedColorIndex={selectedColorIndex}
                colors={colors}
                visible={colorEditorModal}
                hideModal={() => toggleColorEditorModal(!colorEditorModal)}
                setColor={(color) => editColor(selectedColorIndex, color)}
                deleteColor={() => deleteColor(selectedColorIndex)}
            />
            <ColorScroller colors={colors} selectColor={(index) => selectColor(index)} deleteColor={(index) => deleteColor(index)} />
            <Button
                style={styles.button}
                color={'#' + colors[colors.length - 1]}
                onPress={() => onSave()}
                mode='contained'
            >
                Save
            </Button>
            <Button
                style={styles.button}
                color={'#' + colors[colors.length - 1]}
                onPress={() => deleteScheme(colorScheme.id)}
                mode='contained'>
                Delete
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    schemeModalContainer: {
        flex: 1
    },
    button: {
        flex: 1,
        justifyContent: 'center'
    },
    textInput: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        textAlign: 'center',
        marginTop: 30,
        fontSize: 30
    }
})