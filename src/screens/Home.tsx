import React, { useEffect, useState } from "react";
import { Button, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { AddCard } from "../components/AddCard";
import { Card } from "../components/Card";
import { CardFilters } from "../components/CardFilters";
import { CardStats } from "../components/CardStats";
import { CardItem } from "../redux/cardsSlice";

const randomInt = (min:number, max:number): number => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

  
export const Home = () => {
    const [bg, setBg] = useState('');
    const todoList = useSelector((state:any)=> {
        switch (state.cards.filter) {
            case 'Completed':
                return state.cards.items.filter((item: CardItem) => item.isComplete) 
            case 'InComplete':
                return state.cards.items.filter((item: CardItem) => !item.isComplete) 
            default:
                return state.cards.items
        }
    })

    const arrColors = [
        '#aacaaa', // green
        '#6f8493',
        '#d4a096',
        '#bfa440',
        '#c7cf6c',
        '#aacaaa',
        '#b24b63',
        '#4d77e7',
        '#b55799',
        '#aacaaa',
        '#4ab6c2',
        '#aacaaa',
        '#cbb086',
        '#99d372',
        '#aacaaa',
    ]
    
    useEffect( () => {
        setBg(arrColors[randomInt(0,arrColors.length)])
    }, [todoList])

    return (<>
            <SafeAreaView>
                <StatusBar translucent backgroundColor= {bg}/>
            </SafeAreaView>
            <KeyboardAvoidingView
                behavior= {Platform.OS === 'ios' ? 'padding' : 'height'} 
            >
                <ScrollView testID = "Home.ScrollView" style= {[styles.background, {backgroundColor: bg}]}>
                    <Text style = {styles.title}> To Do List </Text>
                    <View style = {styles.cardList}>
                        <CardFilters />
                        <AddCard/>
                        { todoList.map((item: any)=> (
                            <Card key = {item.key} item = {item}>
                                {item}
                            </Card>
                        ))}
                    </View>
                       <CardStats/>
                </ScrollView>
            </KeyboardAvoidingView>
            </>
)
}

const styles = StyleSheet.create({
    background: {
        height: '100%',
        padding: 20,
    },
    row: {
        flexDirection: 'row'
    },
    filter: {
        width: '50%'
    },
    cardList: {
        borderRadius: 15,
        padding: 25,
        backgroundColor: '#ebecf0',
        paddingBottom: 50,
    },
    title: {
        fontWeight: '600',
        fontSize: 30,
        paddingVertical: 20,
    }
})


