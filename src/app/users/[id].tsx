import {View, Text, Image, StyleSheet, Pressable, ScrollView} from 'react-native';
import userJson from '../../../assets/data/user.json'; 
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import ExperienceListItem from '@/components/ExperienceListItem'; 

import { User } from '@/types';



type UserProps = {
    user: User;
}

export default function UserProfile() {
    const [user, setUser] = useState<User>(userJson); //whenever data has changed, it will rerender 
    
    const { id } = useLocalSearchParams(); 

    const navigation = useNavigation();

    const onConnect = () => {
        console.warn('Connect Pressed');
    };

    useLayoutEffect(() => {
        navigation.setOptions({title: user.name}); //check _layout.tsx file 
    }, [user?.name]); // only called when user name has changed 


    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                {/* Back Image  */}
                <Image 
                    source={{ uri: user.backImage }}
                    style={styles.backImage}
                />
                
                <View style={styles.headerContent}>
                    {/* Profile Image  */}
                    <Image 
                        source={{ uri: user.image }}
                        style={styles.image}
                    />

                    {/* Name and Position */}
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.position}>{user.position}</Text>

                    {/* Connect Button */}
                    <Pressable
                            style={styles.button}
                            onPress={onConnect}
                        >
                            <Text style={styles.buttonText}>Connect</Text>
                    </Pressable>
                </View>
            </View>

            {/* About */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.paragraph}>{user.about}</Text>
            </View>

            {/* Experience -- need to define type cuz the data is in array */} 
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {user.experience?.map((experience) => ( // need index for isFirst, (experience, index) like this 
                    <ExperienceListItem 
                        key={experience.id} 
                        experience={experience}
                        // isFirst={index === 0}
                    />
                ))}
            </View>
        </ScrollView>
    );
    
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        maxWidth: 500,
        alignSelf: 'center',
    },

    //Header
    header: {
        backgroundColor: 'white',
        marginBottom: 5,
    },
    backImage: {
        width: '100%',
        aspectRatio: 5 / 2,
        marginBottom: -60,
    },
    headerContent: {
        padding: 10,
        paddingTop: 0,
    },
    image: {
        width: 120,
        aspectRatio: 1,
        borderRadius: 60, //half of width 
        borderWidth: 3,
        borderColor: 'white',
    },

    name: {
        fontSize: 24,
        fontWeight: '500',
    }, 
    position: {
        
    },
    button: {
        padding: 10,
        backgroundColor: 'royalblue',
        alignItems: 'center',
        borderRadius: 25, 
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600'
    }, 

    //About & Experience
    section: {
        padding: 10,
        backgroundColor: 'white',
        marginVertical: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 5,
    },
    paragraph: {
        lineHeight: 20, //to make it more readable
        //letterSpacing: 2 
    },

});