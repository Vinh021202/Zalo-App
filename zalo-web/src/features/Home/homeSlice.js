import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import InfoWebApi from 'api/infoWebApi';

const KEY = 'HOME';

export const fetchInfoWebs = createAsyncThunk(
    `${KEY}/fetchInfoWebApp`,
    async () => {
        const data = await InfoWebApi.getInfoWeb();
        return data;
    }
);

const homeSlice = createSlice({
    name: KEY,
    initialState: {
        developers: [],
        infoApp: {},
        isLoading: false,
        features: [],
        infoWebApps: {},
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInfoWebs.fulfilled, (state, action) => {
                const data = action.payload;
                const infowebData = data.find((ele) => ele.name === 'infoweb');
                if (infowebData) {
                    state.infoWebApps = infowebData.value;
                }
                const developersData = data.find(
                    (ele) => ele.name === 'developers'
                );
                if (developersData) {
                    state.developers = developersData.value;
                }
                const infoAppData = data.find((ele) => ele.name === 'infoapp');
                if (infoAppData) {
                    state.infoApp = infoAppData.value;
                }
                const featuresData = data.find(
                    (ele) => ele.name === 'features'
                );
                if (featuresData) {
                    state.features = featuresData.value;
                }
                state.isLoading = false;
            })
            .addCase(fetchInfoWebs.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchInfoWebs.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

const { reducer, actions } = homeSlice;
export const { setLoading } = actions;

export default reducer;
