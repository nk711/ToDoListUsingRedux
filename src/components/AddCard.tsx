import React, { EventHandler, useState } from "react";
import { GestureResponderEvent, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { addCard } from "../redux/cardsSlice";

export const AddCard = () => {
    const [input, setInput] = useState('');
    //const setTodoList = useSetRecoilState(todoListState);

    const dispatch = useDispatch();

    const addItem = (e: GestureResponderEvent) => {
        dispatch(
            addCard({
                todo: input,
                isComplete: false
            })
        );
        setInput('')
    }

    const onChange = (val: string) => {
        setInput(val)
    }

    return (
        <View style = { styles.column }>
            <TextInput
                testID="AddCard-Input"
                style = { styles.textInput}
                placeholder = 'Add something here you need to do!'
                value ={input} 
                multiline = { true }
                onChangeText={ text => onChange(text) }/>
            <TouchableOpacity 
                testID= "AddCard-Button"
                style = { styles.addButton }
                onPress= {addItem}>
                    <Text style = {styles.addButtonText}> + Add a card </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    column : {
        maxWidth: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    textInput: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 13,
        padding: 15,
        marginTop: 10,
        lineHeight: 25,
        fontSize: 20,
        fontWeight: '300',

    },
    addButton: {
        marginVertical: 10,
    },
    addButtonText: {
        fontWeight: '300',
        fontSize: 20,
    }
})

