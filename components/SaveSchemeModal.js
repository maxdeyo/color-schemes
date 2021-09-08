import React from 'react';
import { View, StyleSheet } from 'react-native';
import {  Portal, Modal, TextInput, Button} from 'react-native-paper';

export default function SaveSchemeModal(props) {
    return (
        <Portal>
            <Modal visible={props.saveModalVisible} onDismiss={props.hideSaveModal} contentContainerStyle={styles.saveModal}>
                <TextInput
                    style={styles.titleInput}
                    multiline={false}
                    value={props.title}
                    onChangeText={(inp) => props.setTitle(inp)}
                    maxLength={30}
                    placeholder={props.title}
                />
                <Button
                    onPress={() => props.onSaveScheme(props.colors)}
                >Save</Button>
            </Modal>
        </Portal>
    )
}

const styles = StyleSheet.create({
    saveModal: {
        flex: 0.3,
        backgroundColor: 'white',
        padding: 20,
        margin: 40
    },
    titleInput: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
        textAlign: 'center'
    }
})