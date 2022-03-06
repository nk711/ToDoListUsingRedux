import React from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CheckBox from '@react-native-community/checkbox'
import { useRecoilState } from "recoil";
import { todoListState } from "../recoil/store";
import { CardItem } from '../recoil/store'

const replaceItemAtIndex = (arr: CardItem[], index: number, val: CardItem) => {
    return [...arr.slice(0, index), val, ...arr.slice(index+1)];
}

const removeItemAtIndex = (arr: CardItem[], index: number) => {
    return [...arr.slice(0, index), ...arr.slice(index+1)]
}

export const Card = ({item} : any) => {
    const [cardList, setCardList] = useRecoilState(todoListState);
    const index= cardList.findIndex((card: CardItem)=> card === item)

    const editItemText = (text: string) => {
        const newList = replaceItemAtIndex(cardList, index, {
            ...item,
            todo: text,
        });

        setCardList(newList)
    }

    const toggleComplete = () => {
        const newList = replaceItemAtIndex(cardList, index, {
            ...item,
            isComplete: !item.isComplete,
        });
        setCardList(newList);
    };

    const deleteItem = () => {
        const newList = removeItemAtIndex(cardList, index);
        setCardList(newList)
    }

    return ( 
        <View style = {styles.container}>
            <TextInput
                style = {styles.textInput}
                value ={item.todo} 
                multiline = {true}
                onChangeText={ text => editItemText(text) }/>
            <View style={styles.row}>
                <TouchableOpacity
                    style = {styles.delete}
                    onPress= {deleteItem}>
                        <Text style = { styles.buttonText}>Delete</Text>
                </TouchableOpacity> 
                <TouchableOpacity
                    style = {
                        item.isComplete ? (styles.statusComplete) : (styles.statusInProgress)
                    }
                    onPress= {toggleComplete}>
                        <Text style = { styles.buttonText}>{ item.isComplete ? ('Is Complete') : ('In Progress')}</Text>
                </TouchableOpacity> 
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    container : {
        backgroundColor: '#fff',
        maxWidth: '100%',
        flexDirection: 'column',
        borderRadius: 13,
        marginVertical:10,
        paddingHorizontal: 10,
        paddingBottom: 10,
        justifyContent: 'space-between',
    },

    textInput: {
        width: '100%',
        color: '#000',
        fontWeight: '300',
        backgroundColor: '#fff',
        borderRadius: 13,
        padding: 15,
        lineHeight: 30,
        fontSize: 18,
    },
    delete: {
        borderRadius: 10,
        width: 70,
        height: 30,
        backgroundColor: '#b24b63',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,

    },
    buttonText: {
        color:'#fff',
        fontSize: 15,
        fontWeight: '300',
    },
    statusComplete: {
        backgroundColor: '#99d372',
        borderRadius: 10,
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusInProgress: {
        backgroundColor: 'orange',
        borderRadius: 10,
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: "row"
    }
})

