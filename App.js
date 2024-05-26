import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text, PermissionsAndroid, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, updateUser as updateUserAction, deleteUser } from './src/store/usersSlice'; // Renamed updateUser action creator alias
import { launchImageLibrary } from 'react-native-image-picker';
import UserList from './src/components/UserList';
import AddUserModal from './src/components/AddUserModal';
import UpdateUserModal from './src/components/UpdateUserModal';
import DeleteUserModal from './src/components/DeleteUserModal';

const App = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector(state => state.users);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteUpdate, setDeleteUpdate] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState({}); // Renamed selectedUser state variable
  const [newUser, setNewUser] = useState({
    username: '',
    firstName: '',
    lastName: '',
    avatar: null,
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddContact = () => {
    setModalVisible(true);
  };

  const handleSaveContact = () => {
    dispatch(addUser(newUser));
    setModalVisible(false);
    setNewUser({
      username: '',
      firstName: '',
      lastName: '',
      avatar: null,
    });
  };

  const handleDeleteConfirmation = (userId) => {
    setDeleteUpdate(true);
    setSelectedUserId(userId);
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(selectedUserId));
    setDeleteUpdate(false);
  };

  const handleCancelDelete = () => {
    setDeleteUpdate(false);
    setSelectedUserId(null);
  };

  const requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Gallery Permission",
          message: "This app needs access to your gallery",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const handleChooseAvatar = async () => {
    if (Platform.OS === 'android') {
      const hasPermission = await requestGalleryPermission();
      if (!hasPermission) {
        return;
      }
    }

    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.assets[0].uri };
        setNewUser({ ...newUser, avatar: source.uri });
      }
    });
  };

  const handleOpenUpdateModal = (user) => {
    setSelectedUser(user); // Renamed from setUpdateUser to setSelectedUser
    setUpdateModalVisible(true);
  };

  const handleUpdateUser = () => {
    dispatch(updateUserAction(selectedUser)); // Renamed from updateUser to updateUserAction
    setUpdateModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#25D366" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <UserList
        users={users}
        onUserLongPress={handleDeleteConfirmation}
        onUserPress={handleOpenUpdateModal}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={handleAddContact}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>

      <AddUserModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveContact}
        newUser={newUser}
        setNewUser={setNewUser}
        handleChooseAvatar={handleChooseAvatar}
      />

      <DeleteUserModal
        visible={deleteUpdate}
        onClose={handleCancelDelete}
        onDelete={handleDeleteUser}
      />

      <UpdateUserModal
        visible={updateModalVisible}
        onClose={() => setUpdateModalVisible(false)}
        onUpdate={handleUpdateUser}
        updateUser={selectedUser} // Pass selectedUser instead of updateUser
        setUpdateUser={setSelectedUser} // Rename setUpdateUser to setSelectedUser
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#25D366',
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 30,
    elevation: 8,
  },
  floatingButtonText: {
    fontSize: 30,
    color: '#fff',
  },
});

export default App;
