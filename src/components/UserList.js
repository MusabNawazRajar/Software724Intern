import React from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const UserList = ({ users, onUserPress, onUserLongPress }) => (
  <View style={styles.container}>
    <Text style={styles.header}>Users</Text>
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.userContainer}
          onLongPress={() => onUserLongPress(item.id)}
          onPress={() => onUserPress(item)}
        >
          <Image style={styles.avatar} source={{ uri: item.avatar }} />
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
            <Text style={styles.userMessage}>Last message preview...</Text>
          </View>
        </TouchableOpacity>
      )}
      ListFooterComponent={() => (
        <Text style={styles.footer}>End of List</Text>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#25D366',
    color: '#fff',
    textAlign: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfoContainer: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  userMessage: {
    fontSize: 14,
    color: '#555',
  },
  footer: {
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    color: '#555',
  },
});

export default UserList;
