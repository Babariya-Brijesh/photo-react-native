import { Button, StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { launchImageLibrary } from 'react-native-image-picker';

const App = () => {
  const [imageArray, setImageArray] = useState([]);

  const permissionFunction = () => {
    request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES)
      .then(result => {
        console.log('result===>', result);
        if (result === RESULTS.GRANTED) {
          Image();
        }
      })
      .catch(error => {
        console.log('Error==>', error);
      });
  };

  const Image = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImageArray([response.uri, ...imageArray]);
      }
    });
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>Select Photo Here</Text>
      <Button title="Select Photo" onPress={permissionFunction} />
      {imageArray.length > 0 && (
        <FlatList
          data={imageArray}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={{ width: 200, height: 200 }} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 25,
  },
  text: {
    marginTop: 40,
    fontSize: 30,
  },
});

export default App;
