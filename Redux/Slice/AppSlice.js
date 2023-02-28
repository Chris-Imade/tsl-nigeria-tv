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
    accessToken: "",
    refreshToken: "",
    videoId: 1,
    categoryDetailsPage: {},
    videoList: [],
    profilePhoto: "",
    googleAuth: null,
    comingSoon: []
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
      state.videoDownloadData = [...state.videoDownloadData, action.payload];
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
      // state.videoList = [action.payload];
    },
    setProfilePhoto: (state, action) => {
      state.profilePhoto = action.payload;
    },
    setGoogleAuth: (state, action) => {
      state.googleAuth = action.payload;
    },
    setComingSoon: (state, action) => {
      state.comingSoon = action.payload;
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
    setVideoList,
    setProfilePhoto,
    setGoogleAuth,
    setComingSoon
 } = appSlice.actions

export default appSlice.reducer;