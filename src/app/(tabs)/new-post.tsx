import { Text ,TextInput , View, Image, StyleSheet, Pressable } from 'react-native';
import userJson from '../../../assets/data/user.json'; 
import { useLayoutEffect, useState } from 'react';

import { User } from '@/types';
import { useNavigation, useRouter } from 'expo-router';

type UserProps = {
  user: User;
}

export default function NewPostScreen() {

  const [content, setContent] = useState('');

  const navigation = useNavigation();
  const router = useRouter();

  const onPost = () => {
    console.warn(`Posting: `, content);

    router.push('/(tabs)/'); //redirect to home screen 
    setContent('');
  };


  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'New Post',
      //headerLeft: () => <Image source = {{uri : user.image}} style={styles.image} />,
      headerRight: () => (
        <Pressable onPress={onPost} style={styles.postButton}> 
          <Text style={styles.postButtonText}>Submit</Text>
        </Pressable>
      ), 
    }); //check _layout.tsx file 
  }, [onPost]); 


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


      {/* Bottom Buttons */}

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 15, 
  },
  image: {
    width: 50, 
    aspectRatio: 1,

  },
  toWho: {
    fontSize: 18,
    fontWeight: '600',
    color: 'gray',
  },
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
  }
});
