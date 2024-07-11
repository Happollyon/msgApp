import React from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Searchbar, useTheme} from 'react-native-paper';
import { View, Text, Touchable, TouchableOpacity ,KeyboardAvoidingView,SafeAreaView,Platform,ScrollView} from 'react-native';
import ContactItem from './ContactItem';

const contacts = 
[
    {
        "id": 1,
        "name": "Jhon Kiefel",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/449442715_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=FG3fexBIk1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {
        "id": 2,
        "name": "Jane Doe",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/123456789_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=ABCDEFGH1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {
        "id": 3,
        "name": "Alice Smith",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/987654321_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=HIJKLMNO1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {
        "id": 4,
        "name": "Bob Johnson",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/1122334455_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=QRSTUVWX1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {
        "id": 5,
        "name": "Charlie Brown",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/6677889900_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=YZABCDEF1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {
        "id": 6,
        "name": "Daniel Clark",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/556677889_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=WXYZABCD1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {
        "id": 7,
        "name": "Emily Davis",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223344556_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=HIJKLMN1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {
        "id": 8,
        "name": "Michael Johnson",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223356896_18442837969012232_2135646763177655556_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=109&_nc_ohc=NOPQRST2U8FZYEVQqRcJ&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {
        "id": 9,
        "name": "Sophia Martinez",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223367486_18442837969012232_2345678906788992213_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=UVWXYZ3J9oPabFYUPaG&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {
        "id": 10,
        "name": "David Brown",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223378296_18442837969012232_89012345678901234_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=111&_nc_ohc=XYZABCD4PQ6nLvYQJxRV&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },{
        "id": 8,
        "name": "Michael Johnson",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223356896_18442837969012232_2135646763177655556_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=109&_nc_ohc=NOPQRST2U8FZYEVQqRcJ&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {
        "id": 9,
        "name": "Sophia Martinez",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223367486_18442837969012232_2345678906788992213_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=UVWXYZ3J9oPabFYUPaG&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {
        "id": 10,
        "name": "David Brown",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223378296_18442837969012232_89012345678901234_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=111&_nc_ohc=XYZABCD4PQ6nLvYQJxRV&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    }
    , {
        "id": 11,
        "name": "Olivia Wilson",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223389546_18442837969012232_3456789123456789_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=112&_nc_ohc=ABCDWXYZ6PQ5nLvYQJxRV&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {
        "id": 12,
        "name": "Liam White",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223390876_18442837969012232_2345671234567890_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=113&_nc_ohc=JKLMOPQ7RS8pWQXYQxRV&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {
        "id": 13,
        "name": "Emma Harris",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223401346_18442837969012232_3456789109876543_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=114&_nc_ohc=QRSXYZA8BCD6EFXYQxRV&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {
        "id": 14,
        "name": "Noah Garcia",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223412976_18442837969012232_3456789012345678_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=115&_nc_ohc=EFGHIJK9LMN7OPQXYQxRV&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {
        "id": 15,
        "name": "Ava Martinez",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223423406_18442837969012232_6789012345678901_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=116&_nc_ohc=JKLMNOP0QRS8TUFXYQxRV&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {
        "id": 16,
        "name": "Isabella Robinson",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223434836_18442837969012232_1234567890987654_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=117&_nc_ohc=MNOPQRS0UV9WXYQYxRV&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    }]

export default function ContactsScreen({}) {
    const navigation = useNavigation();
    const theme = useTheme();
    const [state, setState] = useState({
        searchQuery: '',
        contactsToRender: [...contacts.sort((a, b) => a.name.localeCompare(b.name))]
    });

    const search = async (name) => {
        
        
        if(name === ""){
            setState({contactsToRender: contacts});
        }else{
            const filteredMsgs = contacts.filter(contact => contact.name.includes(name));
            setState({contactsToRender: filteredMsgs});
        }
        console.log("state")
       

    }
    return (
        <SafeAreaView style={{flex:1,backgroundColor:"transparent"}}>
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1, alignItems: 'center',justifyContent: 'center'}}>
         

             <Searchbar
               
                placeholder="Search"
                onChangeText={(text) => {search(text)}}
                style={{width:"90%",marginBottom:"4%"}}
            />
             <ScrollView style={{width:"90%",height:"100%",backgroundColor:theme.colors.background}} contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                {
                    state.contactsToRender.map((contact,index) => {
                       return <ContactItem key={index} contact={contact} />
                    })
                    
                }
             </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
    }