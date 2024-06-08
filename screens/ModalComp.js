import { Text, Portal, Modal, useTheme } from 'react-native-paper';
import React from 'react';

/**
 * 
 * @module screens/ModalComp
 * @description This is the ModalComp component. It is the component that shows the modal. It is used to show messages to the user.
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object from react-navigation.
 * @param {string} props.Title - The title of the modal.
 * @param {string} props.Message - The message of the modal.
 * @param {function} props.getVisible - The function that returns the visible state of the modal.
 * @param {function} props.onHide - The function to call to hide the modal.
 * @returns {React.Element} Rendered component.
 * @author Fagner Nunes
 * 
 */

export default function ModalComp({ navigation, Title, Message, getVisible, onHide }) {
    const theme = useTheme();

    return (
        <Portal>
            <Modal visible={getVisible()} onDismiss={onHide} contentContainerStyle={{ backgroundColor: 'white', padding: 20, height: "50%", width: "90%", borderRadius: 30, alignSelf: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Text variant="displaySmall" style={{ marginBottom: "15%" }}>{Title}</Text>
                <Text variant="titleMedium" style={{ marginBottom: "15%" }}>{Message}</Text>
            </Modal>
        </Portal>
    );
}