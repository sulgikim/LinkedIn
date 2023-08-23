import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import { Link } from 'expo-router';

import {User} from '@/types';

type UserListItemProps = {
    user: User;
};

export default function UserListItem({user} : UserListItemProps) {

    return (
        <Link href={`/users/${user.id}`} asChild>
            <Pressable style={styles.header}> 
                <Image 
                    source={{ uri: user.image }} // inline object
                    style={styles.userImage}
                />
                <View>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text>{user.position}</Text>
                </View>
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
    //Header
    header: {
        flexDirection: 'row',
        alignItems: 'center', //align the item vertically center 
        padding: 10,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    userImage: {
        width: 50, 
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
})