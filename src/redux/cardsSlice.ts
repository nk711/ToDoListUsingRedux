import { createSlice } from '@reduxjs/toolkit';

export interface CardItem {
    key: number,
    todo: string,
    isComplete: boolean,
}

export const cardsSlice = createSlice({
    name: 'cards',
    initialState: {
        items: [],
        filter: 'All'
    },
    reducers: {
        addCard: (state, action) => {
            const newCard: CardItem = {
                key: action.payload.key,
                todo: action.payload.todo,
                isComplete: action.payload.isComplete
            }
            console.log('state items', state.items)
            state.items.push(newCard);
        },
        deleteCard: (state, action) => {
            return state.filter((card)=> card.key !==action.payload.key);
        },
        editCard: (state, action) => {
            state.items.map((card: CardItem)=> {
                if (card.key === action.payload.key) {
                    card.todo = action.payload.todo
                }
            })
        },
        setCompletedOnCard: (state, action) => {
            state.items.map((card:CardItem) => {
                if (card.key === action.payload.key) {
                    card.isComplete = action.payload.isComplete
                }
            })
        },
        filters: (state, action) => {
            state.filter = action.payload.filter
        }
    }
});


export const {addCard, deleteCard, editCard, setCompletedOnCard, filters} = cardsSlice.actions;

export default cardsSlice.reducer;

