import * as React from 'react';
import { useState,useEffect } from 'react';
import { View,SafeAreaView,KeyboardAvoidingView,Platform, TouchableOpacity,ScrollView,Animated} from 'react-native';
import {Text,useTheme,Icon,Avatar,Banner,Switch, Button} from 'react-native-paper';


const ExpandableView = ({ expanded = false }) => {
    const [height] = useState(new Animated.Value(0));
  
    useEffect(() => {
      Animated.timing(height, {
        toValue: !expanded ? 200 : 0,
        duration: 150,
        useNativeDriver: false
      }).start();
    }, [expanded, height]);
  
    // console.log('rerendered');
  
    return (
      <Animated.View
        style={{ height, backgroundColor: "orange" }}
      ></Animated.View>
    );
  };
  
export default function ChatComponent({navigation}) {
    const theme = useTheme();
    const [state, setState] = React.useState({
        visible: true,
        switchOne: false,
    });
    const setVisible = (visible) => {
        setState({ ...state, visible:visible});
    }
    const setSwitch = () => {
        setState({ ...state, switchOne:!state.switchOne});
    }
    return (
        <SafeAreaView style={{flex:1}}>
            {/* Header */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: theme.colors.background, flex: 1, alignItems: 'center',justifyContent: 'center'}}>
            <ExpandableView expanded={state.visible} />
           {/* <Banner style={{width:400}}  visible={state.visible} > 
                    <Button mode="contained" icon="lock" textColor={theme.colors.primary} style={{backgroundColor:theme.colors.background,color:"black"}}onPress={() => setVisible(false)}>Block</Button>
                    <View style={{backgroundColor:"blue", display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                        <Text  style={{color:theme.colors.onPrimary}}>Disappearing message</Text>
                        <Switch color="#06D6A0" disabled={false} style={{}} value={state.switchOne} onValueChange={setSwitch} />
                    </View>
            </Banner>*/}


                <View style={{width:"100%",height:"15%",backgroundColor:theme.colors.primary, display:"flex", flexDirection:"row",justifyContent:"space-between", alignItems:"center"}}>
                   
                   <TouchableOpacity onPress={()=>{navigation.goBack()}}> 
                        <Icon
                            source="arrow-left"
                            color={theme.colors.onPrimary}
                            size="35%"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                        <Avatar.Image size={64} source={{"uri": "https://scontent.cdninstagram.com/v/t39.30808-6/449442715_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=FG3fexBIk1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b"}} />
                        <Text variant="titleLarge" style={{color:theme.colors.onPrimary, marginLeft:"5%"}}>Fagner Nunes</Text>
                        </TouchableOpacity>
                    <TouchableOpacity onPress={() => setVisible(true)}>

                    <Icon
                        source="dots-vertical"
                        color={theme.colors.onPrimary}
                        size="35%"/>
                    </TouchableOpacity>
                </View>

                {/* Chat content */}
                <ScrollView style={{width:"90%",height:"50%"}} contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
              </ScrollView>
                {/* messeging components */}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
</svg>
