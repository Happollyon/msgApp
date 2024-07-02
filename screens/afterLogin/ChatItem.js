import * as React from 'react';
import { View } from 'react-native';

import { Text,useTheme,Avatar} from 'react-native-paper';

export default function ChatItem({navigation}) {
    const theme = useTheme();

    return(
        <View style={{marginBottom: "2%", width: "100%", display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: 'space-between'}}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar.Image size={64} source={{"uri": "https://scontent.cdninstagram.com/v/t39.30808-6/449442715_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=FG3fexBIk1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"}} />
            <View style={{ flexDirection: "column", marginLeft: "1%", alignItems: "start", justifyContent: "center" }}>
                <Text variant="titleLarge">John Kiefel</Text>
                <Text variant="titleSmall" style={{ color: theme.colors.onSurface }}>Hello</Text>
            </View>
        </View>
        <View style={{ alignItems: "flex-end" }}>
            <Text>2 mins</Text>
            <Text style={{ backgroundColor: "pink", borderRadius: 100 }}>2</Text>
        </View>
    </View>
    )
}