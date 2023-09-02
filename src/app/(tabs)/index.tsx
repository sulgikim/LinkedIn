import { ActivityIndicator, FlatList, Text} from 'react-native';
import PostListItem from '@/components/PostListItem';
//import posts from '../../../assets/data/posts.json';
import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';

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


const postPaginatedList = gql`
  query PostPaginatedList($first: Int, $after: Int) {
    postPaginatedList(first: $first, after: $after) {
      id
      content
      image
      profile {
        id
        name
        image
        position
      }
    }
  }
`;

export default function HomeScreen() {
  const [hasMore, setHasMore] = useState(true);
  const {loading, error, data, fetchMore , refetch} = useQuery(postPaginatedList, {
    variables: {first: 2}, 
  });

  const loadMore = async () => {
    if (!hasMore) {
      return;
    }

    // console.warn('load more');
    const res = await fetchMore({ variables: {after: data.postPaginatedList.length }});
    //console.log(res.data.postPaginatedList);
    
    if(res.data.postPaginatedList.length == 0){
      setHasMore(false);
    }
  }
  

  if (loading) {
    return <ActivityIndicator /> //display the circle while loading 
  } 

  if (error) {
    console.log(error);
    return <Text>Something went wrong! </Text>
  }

  // console.log(data);

  return (
    <FlatList 
      data = {data.postPaginatedList}
      renderItem={({item}) => <PostListItem post={item}/>} 
      // keyExtractor={ (post) => post.id } //it doesn't need when array object has id or key 
      showsVerticalScrollIndicator = {false}
      contentContainerStyle = {{gap: 10}}
      onEndReached={loadMore}

      refreshing={loading}
      onRefresh={refetch}


      // ListFooterComponent={() => (
      // <Text
      //   onPress={loadMore}
      //   style={{
      //     alignSelf: 'center',
      //     fontWeight:'600',
      //     fontSize: 16,
      //     color: 'royalblue',
      //   }}
      // >  
      //   Load More
      // </Text>
      // )}
    />
  );
}
