import { FlatList} from 'react-native';
import PostListItem from '@/components/PostListItem';
import posts from '../../../assets/data/posts.json';

//const firstPost = posts[0];

export default function HomeScreen() {
  return (
    <FlatList 
      data = {posts}
      renderItem={({item}) => <PostListItem post={item}/>} 
      // keyExtractor={ (post) => post.id } //it doesn't need when array object has id or key 
      showsVerticalScrollIndicator = {false}
      contentContainerStyle = {{gap: 10}}
    />
  );
}
