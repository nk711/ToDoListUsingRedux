import { Picker } from "@react-native-picker/picker"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { useSelector } from "react-redux"
import { CardItem, State } from "../redux/cardsSlice"

export const CardStats = () => {
    
    const todoList = useSelector((state: State)=> {
        switch (state.cards.filter) {
            case 'Completed':
                return state.cards.items.filter((item: CardItem) => item.isComplete) 
            case 'InComplete':
                return state.cards.items.filter((item: CardItem) => !item.isComplete) 
            default:
                return state.cards.items
        }
    })
    
    const total = todoList.length;
    const totalCompleted = todoList.filter((item: CardItem) => item.isComplete).length;;
    const totalIncomplete = todoList.filter((item: CardItem) => !item.isComplete).length;
    const percentCompleted = total === 0 ? 0 : totalCompleted / total * 100;
    const formattedPercentCompleted = Math.round(percentCompleted)

    return ( 
        <View style={styles.stats}>
            <Text testID="TotalItems"> * Total items: {total}</Text>
            <Text testID="CompletedItems"> * Items completed: {totalCompleted}</Text>
            <Text testID="IncompleteItems"> * Items not completed: {totalIncomplete}</Text>
            <Text testID="Percentage"> * Percent completed: {formattedPercentCompleted}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    stats: {
        fontWeight: '600',
        fontSize: 30,
        paddingVertical: 20,
    }
})