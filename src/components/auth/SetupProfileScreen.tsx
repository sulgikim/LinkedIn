import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { useUserContext } from '@/context/UserContext';

const createProfileMutation = gql`
    mutation InsertProfile($name:String, $about:String, $authid: String) {
        insertProfile(name: $name, about: $about, authid: $authid) {
        id
        name
        about
        authid
        }
  }
`;

export default function SetupProfileScreen() {

    const [ name, setName ] = useState('');
    const [ about, setAbout ] = useState('');

    const { authUser, reloadDbUser } = useUserContext();

    const [handleMutation, { loading }] = useMutation(createProfileMutation);

    const onSave = async () => {
        // console.warn('Saved', name);

        try {
            await handleMutation({ variables: {
                name,
                about,
                authid: authUser.id
            }});

            reloadDbUser();
        } catch (e) {
            console.log(e);
        }
    }
    
    
    
    return (
        <View style={ styles.container }>
            <Text>Setup Profile</Text>

            {/* Name */}
            <TextInput
                value={name}
                placeholder="Name"
                onChangeText={setName}
                style={styles.input}
            />

            {/* About */}
            <TextInput
                value={about}
                placeholder="About"
                onChangeText={setAbout}
                style={styles.input}
                multiline
                numberOfLines={3}
            />

            <TouchableOpacity onPress={onSave} style={styles.button}>
                <Text style={styles.buttonText}>{ loading ? "Saving..." : "Save"}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        borderColor: 'gray', 
        borderWidth: 1, 
        padding: 10, 
        width: '100%',
        borderRadius: 5, 
        marginVertical: 5,
    },
    button: { 
        backgroundColor: 'royalblue',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 5,
        width: '100%',
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
    },
})