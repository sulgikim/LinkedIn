import { Text ,TextInput , View, Image, StyleSheet, Pressable } from 'react-native';
import { useLayoutEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';

import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';

import { gql, useMutation } from '@apollo/client';

const insertPost = gql`
  mutation MyMutation($userid:ID, $image:String, $content:String) {
    insertPost(userid: $userid, image: $image, content: $content) {
      id
      content
      image
      userid
    }
  }
`;

export default function NewPostScreen() {

  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const navigation = useNavigation();
  const router = useRouter();

  const [handleMutation, { loading, error, data }] = useMutation(insertPost);


  const onPost = async () => {
    console.warn(`Posting: `, content);

    try {
      await handleMutation({variables: {
        userid: 2, 
        content
      },
      });

      router.push('/(tabs)/'); //redirect to home screen 
      setContent('');
      setImage(null);
    } catch (e) {
      console.log(e);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, //limit to images only, no video 
      allowsEditing: true,  
      // aspect: [4, 3],
      quality: 0.5, // 1 is full quality, 0 is bad quality
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'New Post',
      //headerLeft: () => <Image source = {{uri : user.image}} style={styles.image} />,
      headerRight: () => (
        <Pressable onPress={onPost} style={styles.postButton}> 
          <Text style={styles.postButtonText}>
            {loading ? 'Submitting ...' : 'Submit'}
          </Text>
        </Pressable>
      ), 
    }); //check _layout.tsx file 
  }, [onPost, loading]); 


  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}> 
        <Image 
          source = {{uri : user.image}}
          style={styles.image}
        />
        <Text style={styles.toWho}> Anyone </Text>
        <Pressable  onPress={onPost}>
          <Text> Post </Text>
        </Pressable>
      </View> */}

      {/* Content */}
      {/* <Text style={styles.placeholder}> What do you want to talk about? </Text> */}

      <TextInput 
        value={content}
        onChangeText={setContent}
        placeholder='What do you want to talk about?'
        style={styles.input}
        multiline
      />

      {image && <Image source={{uri: image}} style={styles.image} />}

      {/* Bottom Buttons */}
      <View style={styles.footer}>
        <Pressable onPress={pickImage} style={styles.iconButton}>
          <FontAwesome 
            name="image" 
            size={24} 
            color="black" />
        </Pressable>
        
        <Pressable style={styles.iconButton}>
          <FontAwesome 
            name="camera" 
            size={24} 
            color="black" />
        </Pressable>

        <Pressable style={styles.iconButton}>
          <FontAwesome 
            name="glass" 
            size={24} 
            color="black" />
        </Pressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    height: '100%',
  },
  //header 
  // header: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   padding: 10,
  //   marginBottom: 15, 
  // },
  // image: {
  //   width: 50, 
  //   aspectRatio: 1,

  // },
  // toWho: {
  //   fontSize: 18,
  //   fontWeight: '600',
  //   color: 'gray',
  // },
  postButton: {
    padding: 5, 
    paddingHorizontal: 15,
    backgroundColor: 'royalblue',
    borderRadius: 50,
    marginRight: 10,
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  //content
  input: {
    fontSize: 18, 
  },

  image: {
    width: '100%',
    aspectRatio: 1,
    marginTop: 'auto',
  },

  //footer
  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconButton: {
    backgroundColor: 'gainsboro',
    padding: 20,
    borderRadius: 100,
    //overflow: 'hidden',
  }
});
