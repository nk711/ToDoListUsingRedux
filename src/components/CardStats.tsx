import { Picker } from "@react-native-picker/picker"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { useRecoilState, useRecoilValue } from "recoil"
import { todoListFilterState, todoListStatsState } from "../recoil/store"

export const CardStats = () => {

    const {
        total,
        totalCompleted,
        totalUncompleted,
        percentCompleted
    } = useRecoilValue(todoListStatsState)

    const formattedPercentCompleted = Math.round(percentCompleted)
    
    return ( 
        <View style={styles.stats}>
            <Text> * Total items: {total}</Text>
            <Text> * Items completed: {totalCompleted}</Text>
            <Text> * Items not completed: {totalUncompleted}</Text>
            <Text> * Percent completed: {formattedPercentCompleted}</Text>
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