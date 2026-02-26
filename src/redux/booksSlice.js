import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    items: [],
    categories: ["Fiction", "Non-Fiction", "Sci-Fi", "Mystery", "Biography"],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

const API_URL = 'http://localhost:5001/api/books/';

// Get all books
export const getBooks = createAsyncThunk('books/getAll', async (_, thunkAPI) => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get single book
export const getBook = createAsyncThunk('books/getSingle', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const response = await axios.get(API_URL + id, config);
        return response.data;
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Add new book
export const addBook = createAsyncThunk('books/addBook', async (bookData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        };

        const response = await axios.post(API_URL, bookData, config);
        return response.data;
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        reset: (state) => initialState,
        // Optional local state update if optimistic UI is needed
        addBookLocally: (state, action) => {
            state.items.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBooks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.items = action.payload;
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addBook.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.items.push(action.payload);
            })
            .addCase(addBook.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { reset, addBookLocally } = booksSlice.actions;
export default booksSlice.reducer;
