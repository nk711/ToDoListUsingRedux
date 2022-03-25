import { createSlice } from '@reduxjs/toolkit';

export interface CardItem {
    key: number,
    todo: string,
    isComplete: boolean,
}

export interface State {
    cards: {
        filter: string,
        items: CardItem []
    }
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
                key: state.items.length+1,
                todo: action.payload.todo,
                isComplete: action.payload.isComplete
            } 
            state.items.push(newCard);
        },
        deleteCard: (state, action) => {
            state.items = state.items.filter((card: CardItem)=> card.key !==action.payload.key);
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

