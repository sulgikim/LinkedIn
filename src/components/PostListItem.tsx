import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import { Post } from '@/types';

import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

type PostListItemProps = {
    post: Post;
}

type FooterButtonProps = {
    text: string;
    icon: React.ComponentProps<typeof FontAwesome>['name'];
}

function FooterButton({ text, icon }: FooterButtonProps) {
    return (
        <View style={{flexDirection: 'row'}}>
            <FontAwesome name={icon} size={16} color="grey" />
            <Text style={{marginLeft: 5, color: 'grey', fontWeight: '500',}}>
                {text}
            </Text>
        </View>
    );
}

export default function PostListItem({ post }: PostListItemProps) {
    return (
        <Link href={`/posts/${post.id}`} asChild>
            <Pressable style={styles.container}>
                {/* Header */}
                <View style={styles.header}> 
                    <Image 
                        source={{ uri: post.author.image }} // inline object
                        style={styles.userImage}
                    />
                    <View>
                        <Text style={styles.userName}>{post.author.name}</Text>
                        <Text>{post.author.position}</Text>
                    </View>
                </View>

                {/* Text Content */}
                <Text style={styles.content}>{post.content}</Text>

                {/* Image content */}
                { post.image && ( //optionally render depends on image exists or not (js expression)
                    <Image source={{ uri: post.image }} style={styles.postImage}/>
                )} 

                {/* Footer */}
                <View style={styles.footer}>
                    {/* Like */}
                    <FooterButton text="Likes" icon="thumbs-o-up" />

                    {/* Comment */}
                    <FooterButton text="Comment" icon="comment-o"/>

                    {/* Share */}
                    <FooterButton text="Share" icon="share"/>
                </View>
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
    container: {
       backgroundColor: 'white',
       width: '100%',
       maxWidth: 500,
       alignSelf: 'center',
    },

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

    //Body
    content: {
        margin: 10,
        marginTop: 0
    },
    postImage: {
        width: '100%',
        aspectRatio: 1, //this means the image to be square (can be 1 / 2 to be rectangle (width/height))
    },

    //Footer
    footer: {
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'space-around',

        //separator line between content and footer 
        borderTopWidth: 0.5,
        borderColor: 'lightgray',
    },
});