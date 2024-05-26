import React from 'react';
import { View, Modal, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddUserModal = ({ visible, onClose, onSave, newUser, setNewUser, handleChooseAvatar }) => (
  <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Add New Contact</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={newUser.username}
          onChangeText={(text) => setNewUser({ ...newUser, username: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={newUser.firstName}
          onChangeText={(text) => setNewUser({ ...newUser, firstName: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={newUser.lastName}
          onChangeText={(text) => setNewUser({ ...newUser, lastName: text })}
        />
        
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={onClose} />
          <Button title="Save" onPress={onSave} />
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AddUserModal;
