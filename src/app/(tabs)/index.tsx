import { ActivityIndicator, FlatList} from 'react-native';
import PostListItem from '@/components/PostListItem';
//import posts from '../../../assets/data/posts.json';
import { gql, useQuery } from '@apollo/client';
import {Text} from 'react-native';

// const firstPost = posts[0];

const postList = gql`
  query PostListQuery {
    postList {
      id
      content
      image
      profile {
        id
        position
        name
        image
      }
    }
  }
`; 

export default function HomeScreen() {
  const {loading, error, data} = useQuery(postList);

  if (loading) {
    return <ActivityIndicator /> //display the circle while loading 
  } 

  if (error) {
    console.log(error);
    return <Text>Something went wrong! </Text>
  }

  console.log(data);

  return (
    <FlatList 
      data = {data.postList}
      renderItem={({item}) => <PostListItem post={item}/>} 
      // keyExtractor={ (post) => post.id } //it doesn't need when array object has id or key 
      showsVerticalScrollIndicator = {false}
      contentContainerStyle = {{gap: 10}}
    />
  );
}
