import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cards: []
}

const cardsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "ADD":
            return {
                ...state,
                cards: [
                    ...state.cards,
                    {
                        value: action.payload
                    }
                ]
            }
        default:
            return state;
    }
}

export default cardsReducer