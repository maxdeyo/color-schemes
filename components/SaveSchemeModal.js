import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import {  Portal, Modal, TextInput } from 'react-native-paper';

export default function SaveSchemeModal(props) {
    return (
        <Portal>
            <Modal visible={props.saveModalVisible} onDismiss={props.hideSaveModal} contentContainerStyle={styles.saveModal}>
                <TextInput
                    style={styles.titleInput}
                    value={props.title}
                    onChangeText={(inp) => props.setTitle(inp)}
                    maxLength={30}
                    placeholder="My Color Scheme..."
                />
                <Button
                    onPress={() => onSaveScheme(colors)}
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
        alignSelf: 'center',
        margin: 20
    }
})