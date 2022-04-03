import React from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CardItem, deleteCard, editCard, setCompletedOnCard } from "../redux/cardsSlice";


export const Card = ({item} : any) => { 
    const dispatch = useDispatch();
    const cardList = useSelector((state:any)=> {
        return state.cards.items
    })
    
    const index= cardList.findIndex((card: CardItem)=> card === item)

    const editItemText = (text: string) => {
        dispatch(
            editCard({
                key:item.key,
                todo: text
            })
        )
    }

    const toggleComplete = () => {
        dispatch(
            setCompletedOnCard({
                key: item.key,
                isComplete: !item.isComplete
            })
        )
    };

    const deleteItem = () => {
        dispatch(
            deleteCard({
                key: item.key
            })
        )
    }

    return ( 
        <View style = {styles.container}>
            <TextInput
                testID= {`Card-Input-`+ item.key}
                style = {styles.textInput}
                value ={item.todo} 
                multiline = {true}
                onChangeText={ text => editItemText(text) }
                />
            <View style={styles.row}>
                <TouchableOpacity
                    testID= {`Card-Delete-`+ item.key}
                    style = {styles.delete}
                    accessible={true}
                    accessibilityLabel="Press to delete this Task"
                    onPress= {deleteItem}>
                        <Text style = { styles.buttonText}>Delete</Text>
                </TouchableOpacity> 
                <TouchableOpacity
                    testID={`Card-IsComplete-`+ item.key}
                    style = {
                        item.isComplete ? (styles.statusComplete) : (styles.statusInProgress)
                    }
                    accessible={true}
                    accessibilityLabel = {item.isComplete ? "Press to set task to in progress" : "Press to set task to completed"}
                    onPress= {toggleComplete}
                    >
                        <Text style = { styles.buttonText}>{ item.isComplete ? ('Completed') : ('In Progress')}</Text>
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

