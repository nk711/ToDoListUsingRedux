import { createSlice } from '@reduxjs/toolkit';

export interface CardItem {
    key: number,
    todo: string,
    isComplete: boolean,
}

export const cardsSlice = createSlice({
    name: 'cards',
    initialState: [],
    reducers: {
        addCard: (state, action) => {
            const newCard = {
                key: action.payload.key,
                todo: action.payload.todo,
                isComplete: action.payload.isComplete
            }
            state.push(newCard);
        },
        deleteCard: (state, action) => {
            return state.filter((item)=> item.key !==action.payload.key);
        },
        // editCard: (state,action) => {
        //     return state.filter((item)=> )
        // }
    }
});


export const {addCard, deleteCard} = cardsSlice.actions;

export default cardsSlice.reducer;

