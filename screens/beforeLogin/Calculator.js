import React from "react"

import {useTheme,Text} from "react-native-paper"
import {View,Platform,SafeAreaView,KeyboardAvoidingView,TouchableOpacity} from "react-native"


export default function Calculator() {

    return (
        <SafeAreaView style={{flex:1,backgroundColor:"#17181A"}}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1, alignItems: 'center',justifyContent: 'center',backgroundColor:"#17181A"}}>

              <View style={{backgroundColor:"blue",width:"100%", height:"30%"}}>
                    {/*screnn */}
              </View>
              <View style={{backgroundColor:"transparent",width:"90%",height:"70%"}}>
            
                {/*keypad*/}
                <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",height:"13%"}}>
                       <TouchableOpacity style={{display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"#303136", width:"20%",height:"100%",borderRadius:"10%"}}>
                            <Text style={{color:"#29A8FF"}}>Ac</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={{display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"#303136", width:"20%",height:"100%",borderRadius:"10%"}}>
                            <Text style={{color:"#29A8FF"}}>Del</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={{display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"#005DB2", width:"20%",height:"100%",borderRadius:"10%"}}>
                            <Text style={{color:"#339DFF"}}>*</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={{display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"#005DB2", width:"20%",height:"100%",borderRadius:"10%"}}>
                            <Text style={{color:"#339DFF"}}>/</Text>
                       </TouchableOpacity>
                </View>
                <View style={{display:"flex",flexDirection:"row",width:"100%",height:"87%"}}>
                    <View style={{backgroundColor:"transparent",width:"73%",height:"100%",display:"flex",justifyContent:"space-around"}}>
                        <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",height:"16%"}}>
                            <TouchableOpacity style={{display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"#303136", width:"26%",height:"100%",borderRadius:"10%"}}>
                                    <Text style={{color:"#29A8FF"}}>Ac</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"#303136", width:"26%",height:"100%",borderRadius:"10%"}}>
                                    <Text style={{color:"#29A8FF"}}>Del</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"#005DB2", width:"26%",height:"100%",borderRadius:"10%"}}>
                                    <Text style={{color:"#339DFF"}}>*</Text>
                            </TouchableOpacity>
                        
                        </View>
                        <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",height:"16%"}}>
                            <TouchableOpacity style={{display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"#303136", width:"26%",height:"100%",borderRadius:"10%"}}>
                                    <Text style={{color:"#29A8FF"}}>Ac</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"#303136", width:"26%",height:"100%",borderRadius:"10%"}}>
                                    <Text style={{color:"#29A8FF"}}>Del</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"#005DB2", width:"26%",height:"100%",borderRadius:"10%"}}>
                                    <Text style={{color:"#339DFF"}}>*</Text>
                            </TouchableOpacity>
                        
                        </View>
                        <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",height:"16%"}}>
                            <TouchableOpacity style={{display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"#303136", width:"26%",height:"100%",borderRadius:"10%"}}>
                                    <Text style={{color:"#29A8FF"}}>Ac</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"#303136", width:"26%",height:"100%",borderRadius:"10%"}}>
                                    <Text style={{color:"#29A8FF"}}>Del</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"#005DB2", width:"26%",height:"100%",borderRadius:"10%"}}>
                                    <Text style={{color:"#339DFF"}}>*</Text>
                            </TouchableOpacity>
                        
                        </View>
                        <View style={{display:"flex",flexDirection:"row",justifyContent:"space-around",height:"16%"}}>
                            <TouchableOpacity style={{display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"#303136", width:"40%",height:"100%",borderRadius:"10%"}}>
                                    <Text style={{color:"#29A8FF"}}>Ac</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={{display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"#005DB2", width:"26%",height:"100%",borderRadius:"10%"}}>
                                    <Text style={{color:"#339DFF"}}>*</Text>
                            </TouchableOpacity>
                        
                        </View>
                    </View>
                    <View style={{backgroundColor:"green",height:"100%",width:"27%"}}></View>
                </View>
              </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}