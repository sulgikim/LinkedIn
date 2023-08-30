import {ActivityIndicator, ScrollView, Text} from 'react-native';
// import posts from '../../../assets/data/posts.json';
import PostListItem from '@/components/PostListItem';
import { useLocalSearchParams } from 'expo-router';

import { gql, useQuery } from '@apollo/client';

const query = gql`
    query PostDetailQuery($id: ID!) {
    post(id: $id) {
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

export default function PostDetailScreen() {
    const { id } = useLocalSearchParams();

    const { loading, error, data } = useQuery(query, { variables : { id }});

    if (loading) {
        return <ActivityIndicator />
    }

    if (error) {
        console.log(error);
        return <Text>Something went wrong ... </Text>
    }

    console.log(data);

    // const post = posts.find((post) => post.id === id);

    // if (!post) {
    //     return <Text>Post not found</Text>;
    // }

    // return <PostListItem post={post} />;

    return (
        <ScrollView>
        {/* <Text>{id}</Text> */}
        <PostListItem post={data.post} />
        </ScrollView>
    );

}

