import React from 'react';
import { View, Modal, Text, TextInput, Button, StyleSheet } from 'react-native';

const UpdateUserModal = ({ visible, onClose, onUpdate, updateUser, setUpdateUser }) => (
  <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Update User</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={updateUser.username}
          onChangeText={(text) => setUpdateUser({ ...updateUser, username: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={updateUser.firstName}
          onChangeText={(text) => setUpdateUser({ ...updateUser, firstName: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={updateUser.lastName}
          onChangeText={(text) => setUpdateUser({ ...updateUser, lastName: text })}
        />
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={onClose} />
          <Button title="Update" onPress={onUpdate} />
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

export default UpdateUserModal;
