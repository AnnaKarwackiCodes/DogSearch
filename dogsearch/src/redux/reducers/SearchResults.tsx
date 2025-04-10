import { createSlice, configureStore } from '@reduxjs/toolkit'

const searchResults = createSlice({
  name: 'search results',
  initialState: {
    results: [],
    nextPageQuery: '',
    prevPageQuery: '' ,
    totalEntries: 0,
    totalPages: 0,
  },
  reducers: {
    setSearchResults:(state, action) => {
      state.results = action.payload.results;
    },
    setNextPage: (state, action) => {
      state.nextPageQuery = action.payload.next;
    },
    setPrevPage: (state, action) => {
      state.prevPageQuery = action.payload.prev;
    },
    setTotalEntries: (state, action)=> {
      state.totalEntries = action.payload.total;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload.value;
    },
    searchReset: (state, action) => {
      state.results = [];
      state.nextPageQuery = '';
      state.prevPageQuery = '';
      state.totalEntries = 0;
      state.totalPages = 0;
    }
  }
})

export const { setSearchResults, setNextPage, setPrevPage, searchReset, setTotalEntries, setTotalPages } = searchResults.actions

export default searchResults.reducer;