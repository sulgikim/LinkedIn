import {Text, View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
// import users from '../../assets/data/users.json';
import UserListItem from '@/components/UserListItem';
import { useNavigation } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
                        //it doesn't execute query right away 

const query = gql`
  query profileSearch($term:String) {
    profileSearch(term: $term) {
      id
      image
      name
      position
    }
  }
`;


export default function SearchScreen() {
    const [search, setSearch] = useState('');
    const {data, loading, error} = useQuery(query, {
      variables: {term: `%${search}%`}
    });

    // //only execute query when the method being called
    // const [handleSearch, {data, loading, error}] = useLazyQuery(query, {
    //   variables: {term: `%${search}%`}
    // });
    

    const navigation = useNavigation();


    useLayoutEffect(() => {
        navigation.setOptions({
          headerSearchBarOptions: {
            onChangeText: (event: { nativeEvent: { text: string } }) => setSearch(event.nativeEvent.text),
            placeholder: 'Search users',
            hideNavigationBar: false,
          },
        });
      }, [navigation]);
      if (loading && !data?.profileSearch) {
        return <ActivityIndicator />
      } 

      if (error) {
        return <Text>Something went wrong</Text>
      } 
      console.log(data.profileSearch);


    return (
        <View style={{backgroundColor: 'white', flex: 1}}>
            <FlatList 
            contentContainerStyle={{marginTop: 150}}
            data={data.profileSearch}
            renderItem={({item}) => <UserListItem user={item}/>}
            />
        </View>
    );
}