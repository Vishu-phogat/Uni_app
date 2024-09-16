import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      signInStart: (state) => {
        state.loading = true;
      },
      signInSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = false;
      },
      signInFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      updateUserStart: (state) => {
        state.loading = true;
      },
      updateUserSuccess: (state,action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = false;
      },
      updateUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      deleteUserStart: (state) => {
        state.loading = true;
      },
      deleteUserSuccess: (state) => {
        state.currentUser = null;
        state.loading = false;
        state.error = false;
      },
      deleteUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      signOut: (state) =>{
        state.currentUser = null;
        state.loading = false;
        state.error = false;
      },
    },
  });

// Action creators are generated for each case reducer function
export const { 
    signInStart, 
    signInSuccess, 
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    updateUserFailure,
    signOut } = userSlice.actions;

export default userSlice.reducer;