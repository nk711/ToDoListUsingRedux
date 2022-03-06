import { Picker } from "@react-native-picker/picker"
import React from "react"
import { StyleSheet, Text } from "react-native"
import { useRecoilState } from "recoil"
import { todoListFilterState } from "../recoil/store"

export const CardFilters = () => {

    const [filter, setFilter] = useRecoilState(todoListFilterState)

    const updateFilter = (value: string) => {
        setFilter(value)
    }

    return ( 
        <>
        <Text style = {styles.options}> Filter By</Text>
        <Picker
            selectedValue={filter}
            onValueChange= {(value) => updateFilter(value)}>
            <Picker.Item style={styles.options} label='Show All' value='All'/>
            <Picker.Item style={styles.options} label='Show Completed' value='Completed'/>
            <Picker.Item style={styles.options} label='Show Uncompleted' value='Uncompleted'/>
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

