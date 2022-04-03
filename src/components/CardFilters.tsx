import { Picker } from "@react-native-picker/picker"
import React, { useState } from "react"
import { StyleSheet, Text } from "react-native"
import { useDispatch } from "react-redux"
import { filters } from "../redux/cardsSlice";

export const CardFilters = () => {
    const [filter, setFilter] = useState('All');

    const dispatch = useDispatch();

    const updateFilter = (value: string) => {
        dispatch (
            filters({
                filter: value
            })
        )
        setFilter(value)
    }

    return ( 
        <>
        <Text style = {styles.options}> Filter By</Text>
        <Picker
            testID= "FilterInput"
            selectedValue= { filter }
            onValueChange= {(value: string) => updateFilter(value)}
            accessible={true}
            accessibilityLabel="Pick a filter">
            <Picker.Item testID = 'FilterAll' style={styles.options} label='Show All' value='All' />
            <Picker.Item testID = 'FilterComplete' style={styles.options} label='Show Completed' value='Completed'/>
            <Picker.Item testID = 'FilterIncomplete' style={styles.options} label='Show Incomplete' value='Incomplete'/>
        </Picker>
        </>
    )
}

const styles = StyleSheet.create({
    options: {
        fontSize: 18,
        fontWeight: '300'
    }
})

