import React, { useState, useRef, useEffect } from "react";
import {useTheme,Text} from "react-native-paper"
import {View,Platform,SafeAreaView,KeyboardAvoidingView,TouchableOpacity,PanResponder} from "react-native"
import {useNavigation} from "@react-navigation/native"

/**
 * @module Calculator
 * @description A simple calculator component for React Native.
 * @autor Fagner Nunes
 */
export default function Calculator() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    
    const navigation = useNavigation();
    const plusPressCount = useRef(0);

    /**
     * Handles button press events.
     * @function handlePress
     * @description Handles button press events.
     * @param {string} value - The value of the button pressed.
     * @returns {void}
     */
    const handlePress = (value) => {
        if (value === "+") {
            plusPressCount.current += 1;
            if (plusPressCount.current === 5) {
                navigation.navigate('LoginOrRegister');
                plusPressCount.current = 0; // Reset the counter after navigating
            }
        } else {
            plusPressCount.current = 0; // Reset the counter if any other button is pressed
        }
        setInput((prev) => prev + value);
    };

    /**
     * Clears the input and result.
     * @function handleClear
     * @description Clears the input and result
     * @returns {void}
     */
    const handleClear = () => {
        setInput("");
        setResult("");
    };

    /**
     * Deletes the last character from the input.
     * @function handleDelete
     * @description Deletes the last character from the input.
     * @returns {void}
     */
    const handleDelete = () => {
        setInput((prev) => prev.slice(0, -1));
    };

    /**
     * Calculates the result of the input expression.
     * @function handleCalculate
     * @description Calculates the result of the input expression.
     * @returns {void}
     * @throws Will throw an error if the input expression is invalid.
     */
    const handleCalculate = () => {
        try {
            setResult(eval(input).toString());
        } catch (error) {
            setResult("Error");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#17181A" }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#17181A" }}>
                <View style={{ backgroundColor: "transparent", width: "100%", height: "30%", justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: "white", fontSize: 24 }}>{input}</Text>
                    <Text style={{ color: "white", fontSize: 32 }}>{result}</Text>
                </View>
                <View style={{ backgroundColor: "transparent", width: "90%", height: "70%" }}>
                    {/* keypad */}
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", height: "13%" }}>
                        <TouchableOpacity onPress={handleClear} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#003254", width: "20%", height: "100%", borderRadius: "10%" }}>
                            <Text style={{ color: "#29A8FF" }}>AC</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDelete} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#003254", width: "20%", height: "100%", borderRadius: "10%" }}>
                            <Text style={{ color: "#29A8FF" }}>Del</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handlePress('*')} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#005DB2", width: "20%", height: "100%", borderRadius: "10%" }}>
                            <Text style={{ color: "#339DFF" }}>*</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handlePress('/')} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#005DB2", width: "20%", height: "100%", borderRadius: "10%" }}>
                            <Text style={{ color: "#339DFF" }}>/</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", width: "100%", height: "87%" }}>
                        <View style={{ backgroundColor: "transparent", width: "73%", height: "100%", display: "flex", justifyContent: "space-around" }}>
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", height: "16%" }}>
                                <TouchableOpacity onPress={() => handlePress('7')} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#303136", width: "26%", height: "100%", borderRadius: "10%" }}>
                                    <Text style={{ color: "#29A8FF" }}>7</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handlePress('8')} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#303136", width: "26%", height: "100%", borderRadius: "10%" }}>
                                    <Text style={{ color: "#29A8FF" }}>8</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handlePress('9')} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#303136", width: "26%", height: "100%", borderRadius: "10%" }}>
                                    <Text style={{ color: "#339DFF" }}>9</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", height: "16%" }}>
                                <TouchableOpacity onPress={() => handlePress('4')} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#303136", width: "26%", height: "100%", borderRadius: "10%" }}>
                                    <Text style={{ color: "#29A8FF" }}>4</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handlePress('5')} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#303136", width: "26%", height: "100%", borderRadius: "10%" }}>
                                    <Text style={{ color: "#29A8FF" }}>5</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handlePress('6')} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#303136", width: "26%", height: "100%", borderRadius: "10%" }}>
                                    <Text style={{ color: "#339DFF" }}>6</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", height: "16%" }}>
                                <TouchableOpacity onPress={() => handlePress('1')} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#303136", width: "26%", height: "100%", borderRadius: "10%" }}>
                                    <Text style={{ color: "#29A8FF" }}>1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handlePress('2')} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#303136", width: "26%", height: "100%", borderRadius: "10%" }}>
                                    <Text style={{ color: "#29A8FF" }}>2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handlePress('3')} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#303136", width: "26%", height: "100%", borderRadius: "10%" }}>
                                    <Text style={{ color: "#339DFF" }}>3</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", height: "16%" }}>
                                <TouchableOpacity onPress={() => handlePress('0')} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#303136", width: "63%", height: "100%", borderRadius: "10%" }}>
                                    <Text style={{ color: "#29A8FF" }}>0</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handlePress('.')} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#005DB2", width: "26%", height: "100%", borderRadius: "10%" }}>
                                    <Text style={{ color: "#339DFF" }}>.</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ backgroundColor: "transparent", height: "100%", width: "27%", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "flex-end" }}>
                            <TouchableOpacity onPress={() => handlePress('-')} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#005DB2", width: "75%", height: "20%", borderRadius: "10%" }}>
                                <Text style={{ color: "#29A8FF" }}>-</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handlePress('+')} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#005DB2", width: "75%", height: "30%", borderRadius: "10%" }}>
                                <Text style={{ color: "#29A8FF" }}>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCalculate} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#1991FF", width: "75%", height: "30%", borderRadius: "10%" }}>
                                <Text style={{ color: "white" }}>=</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}