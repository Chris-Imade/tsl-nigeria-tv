import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    searchQuery: "",
    user: {},
    lightModeEnabled: false,
    tvShowsData: [],
    searchList: false,
    searchNotification: false,
    videoIdForDownload: "",
    videoDownloadData: [],
    downloadDetails: {},
    accessToken: "818fbb131c82e940cb22b8b348dc430af391d4d7",
    refreshToken: "",
    videoId: 1,
    categoryDetailsPage: {},
    videoList: []
}

// export const getMovies = createAsyncThunk('data/getMovies', () => {
//         return;
// })

export const appSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setCategories: (state, action) => {
        state.categories = action.payload;
    },
    updateSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLightModeEnabled: (state, action) => {
      state.lightModeEnabled = !state.lightModeEnabled;
    },
    setSearchList: (state, action) => {
      state.searchList = !state.searchList;
    },
    setSearchNotification: (state, action) => {
      state.searchNotification = !state.searchNotification;
    },
    setVideoIdForDownload: (state, action) => {
      state.videoIdForDownload = action.payload;
    },
    setVideoDownloadData: (state, action) => {
      const duplicates = state.videoDownloadData.filter((item) => item.title !== action.payload.title);
      duplicates.length === 0 ? state.videoDownloadData = [...state.videoDownloadData, action.payload] : [...state.videoDownloadData];
    },
    setDownloadDetails: (state, action) => {
      action.payload === null || undefined ? state.downloadDetails = {} :  state.downloadDetails = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setVideoId: (state, action) => {
      state.videoId = action.payload;
    },
    setCategoryDetailsPage: (state, action) => {
      state.categoryDetailsPage = action.payload;
    },
    setVideoList: (state, action) => {
      state.videoList = [...state.videoList, action.payload];
    }

    // extraReducers: (builder) => {
    //   // Add reducers for additional action types here, and handle loading state as needed
    //   builder.addCase(fetchTvCategories.fulfilled, (state, action) => {
    //     // Add user to the state array
    //     state.categories = action.payload;
    //   })
    // },
  }
})
// Action creators are generated for each case reducer function
export const { 
    setCategories,
    updateSearchQuery,
    setUser,
    setLightModeEnabled,
    setSearchList,
    setSearchNotification,
    setVideoIdForDownload,
    setVideoDownloadData,
    setDownloadDetails,
    setAccessToken,
    setRefreshToken,
    setVideoId,
    setCategoryDetailsPage,
    setVideoList
 } = appSlice.actions

export default appSlice.reducer;