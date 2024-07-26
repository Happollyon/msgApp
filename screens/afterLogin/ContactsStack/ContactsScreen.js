import React from 'react';
import { useState,useContext,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Searchbar, useTheme} from 'react-native-paper';
import { View, Text, Touchable, TouchableOpacity ,KeyboardAvoidingView,SafeAreaView,Platform,ScrollView} from 'react-native';
import ContactItem from './ContactItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../AuthContext';

const appConfig = require('../../../appConf.json');
const baseurlBack = appConfig.baseurlBack;
const contacts = 
[
    {   "contact":false,
        "id": 1,
        "name": "Jhon Kiefel",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/449442715_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=FG3fexBIk1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {   "contact":false,
        "id": 2,
        "name": "Jane Doe",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/123456789_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=ABCDEFGH1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {   "contact":false,
        "id": 3,
        "name": "Alice Smith",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/987654321_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=HIJKLMNO1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {    "contact":false,
        "id": 4,
        "name": "Bob Johnson",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/1122334455_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=QRSTUVWX1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {   "contact":false,
        "id": 5,
        "name": "Charlie Brown",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/6677889900_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=YZABCDEF1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {   "contact":false,
        "id": 6,
        "name": "Daniel Clark",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/556677889_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=WXYZABCD1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {    "contact":false,
        "id": 7,
        "name": "Emily Davis",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223344556_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=HIJKLMN1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {   "contact":false,
        "id": 8,
        "name": "Michael Johnson",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223356896_18442837969012232_2135646763177655556_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=109&_nc_ohc=NOPQRST2U8FZYEVQqRcJ&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {   "contact":false,
        "id": 9,
        "name": "Sophia Martinez",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223367486_18442837969012232_2345678906788992213_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=UVWXYZ3J9oPabFYUPaG&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {   "contact":false,
        "id": 10,
        "name": "David Brown",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223378296_18442837969012232_89012345678901234_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=111&_nc_ohc=XYZABCD4PQ6nLvYQJxRV&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },{  "contact":false,
        "id": 8,
        "name": "Michael Johnson",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223356896_18442837969012232_2135646763177655556_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=109&_nc_ohc=NOPQRST2U8FZYEVQqRcJ&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {    "contact":false,
        "id": 9,
        "name": "Sophia Martinez",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223367486_18442837969012232_2345678906788992213_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=UVWXYZ3J9oPabFYUPaG&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {    "contact":false,
        "id": 10,
        "name": "David Brown",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223378296_18442837969012232_89012345678901234_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=111&_nc_ohc=XYZABCD4PQ6nLvYQJxRV&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    }
    , { "contact":false,
        "id": 11,
        "name": "Olivia Wilson",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223389546_18442837969012232_3456789123456789_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=112&_nc_ohc=ABCDWXYZ6PQ5nLvYQJxRV&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {   "contact":false,
        "id": 12,
        "name": "Liam White",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223390876_18442837969012232_2345671234567890_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=113&_nc_ohc=JKLMOPQ7RS8pWQXYQxRV&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {   "contact":false,
        "id": 13,
        "name": "Emma Harris",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223401346_18442837969012232_3456789109876543_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=114&_nc_ohc=QRSXYZA8BCD6EFXYQxRV&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {   "contact":false,
        "id": 14,
        "name": "Noah Garcia",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223412976_18442837969012232_3456789012345678_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=115&_nc_ohc=EFGHIJK9LMN7OPQXYQxRV&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {   "contact":false,
        "id": 15,
        "name": "Ava Martinez",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223423406_18442837969012232_6789012345678901_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=116&_nc_ohc=JKLMNOP0QRS8TUFXYQxRV&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {   "contact":false,
        "id": 16,
        "name": "Isabella Robinson",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223434836_18442837969012232_1234567890987654_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=117&_nc_ohc=MNOPQRS0UV9WXYQYxRV&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    }, {   "contact":true,
        "id": 17,
        "name": "James Clark",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223445266_18442837969012232_4567890123456789_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=118&_nc_ohc=QRSTUVWX1YZ0ABCPQRXYQ&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {   "contact":true,
        "id": 18,
        "name": "Mia Lopez",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223456696_18442837969012232_5678901234567890_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=119&_nc_ohc=YZABCDEF2GHIJKLMNOXYQ&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {   "contact":true,
        "id": 19,
        "name": "Elijah Lewis",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223467126_18442837969012232_6789012345678901_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=120&_nc_ohc=HIJKLMN3OPQRSXYQZ0RV&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {   "contact":true,
        "id": 20,
        "name": "Amelia Walker",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223478556_18442837969012232_7890123456789012_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=121&_nc_ohc=OPQRST4UVWX5YZABCXYQ&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {   "contact":true,
        "id": 21,
        "name": "Alexander Hall",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223489986_18442837969012232_8901234567890123_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=122&_nc_ohc=UVWXYZ5ABCD6EFGHIJKXYQ&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {   "contact":true,
        "id": 22,
        "name": "Charlotte Allen",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223501416_18442837969012232_9012345678901234_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=123&_nc_ohc=QRSTUV6ABCD7EFGHIJKXYQ&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {   "contact":true,
        "id": 23,
        "name": "Ethan King",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223512846_18442837969012232_1234567890123456_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=124&_nc_ohc=YZABCD7EFGHIJKLMNXYQ&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"
    },
    {   "contact":true,
        "id": 24,
        "name": "Avery Scott",
        "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/223524276_18442837969012232_2345678901234567_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=125&_nc_ohc=HIJKLMN8OPQRSTUVXWXYQ&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D"
    }   ]

   
    

/*
*
*/

export default function ContactsScreen({}) {
    const navigation = useNavigation();
    const theme = useTheme();
    const [state, setState] = useState({
        searchQuery: '',
        contactsToRender: []
    });

    const {contactList,setContactList} = useContext(AuthContext);
    // Inside your component
useEffect(() => {
    // Your function logic here
    // For example, you might want to call the search function with a default value or perform an initial data fetch
    setState({...state,contactsToRender:[...contactList.sort((a, b) => a.name.localeCompare(b.name))]})
    const initializeContacts = async () => {
      // Call your function here, e.g., search(""), or any other initialization logic
      const url = `${baseurlBack}/contacts/get-contacts`;
      const token = await AsyncStorage.getItem('token');

        try{
            await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`}
            }).then(async (response) => {
                if(response.status ===200){ 
                    await response.json().then(async (data) => {
                        if(!data.error){
                         
                           /* setContactList(data.data);
                            setState({...state,contactsToRender:[...data.data.sort((a, b) => a.name.localeCompare(b.name))]})
                            await AsyncStorage.setItem('contacts', JSON.stringify(data.data));
                            console.log(state.contactsToRender, "contacts to render state")
                            */


                        }else{
                            
                        }
                    }) 
                }else{
                    console.log(response.status)
                    console.log("answer not okay")
                }
            })

        }catch(e){

        }
      
    };
  
    //initializeContacts();
  }, []); // The empty dependency array ensures this runs only once when the component mounts
    /**
     * @function search 
     * @description This fucntion search for contacts by name in the contacts in local storage
     * or in the contacts in the server. in order to search for users in the database, user must know the email. 
     * calls are only made to the server if the user knows the email of the contact and a contact format is detected. 
     * @memberof ContactsScreen
     * @param {*} name // the name of the contact to search for or the email of the contact to search for
     * @returns {void}   // nothing is returned. Instead the state is updated with the contacts that match the search query
     * 
     */
    const search = async (name) => {
      
        const contactsFromStorage = await AsyncStorage.getItem('contacts');
       
        
        if(name === ""){
            const contacts = JSON.parse(contactsFromStorage);
            setState({...state, contactsToRender: contactList});//reset the contacts
            
        }else{

            const token = await AsyncStorage.getItem('token');
            // check if name is an email
            const emailFormat = /\S+@\S+\.\S+/;
            if(emailFormat.test(name)){
                // send a request to server   
                const url = `${baseurlBack}/contacts/search-user/${encodeURIComponent(name)}`;
                
                try{
                        await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`}
                        }).then(async (response) => {
                            if(response.status ===200){ 
                               await response.json().then(async (data) => {
                                if(!data.error){
                                    
                                    //const filteredMsgs = data.filter(contact => contact.name.includes(name)); //filter by name
                                    //filteredMsgs.sort((a, b) => b.contact - a.contact); //sort by if is contact or not
                                    setState({contactsToRender: data.data});//update the state
                                }else{
                                    
                                }
                               }) 
                            }else{
                                console.log(response.status)
                                console.log("answer not okay")
                            }
                        })
                }catch(e){

                }
                
            }else{
                
                //filter by name
                const filteredMsgs = state.contactsToRender.filter(contact => contact.name.includes(name)); //filter by name
                 
                filteredMsgs.sort((a, b) => b.contact - a.contact); //sort by if is contact or not
                setState({...state,contactsToRender: filteredMsgs});//update the state
                
            }
    }

       

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
             <ScrollView style={{width:"90%",height:"100%",backgroundColor:theme.colors.background}} contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: 'flex-start' }}>
                {
                    state.contactsToRender.map((contact,index) => {
                        console.log(contact, "contact")
                       return <ContactItem key={index} contact={contact} />
                    })
                    
                }
             </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
    }