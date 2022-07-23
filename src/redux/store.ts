import { configureStore } from '@reduxjs/toolkit'
import collectionSlice from './slice/collectionSlice'
import pageSlice from './slice/pageSlice'
import themeSlice from './slice/themeSlice'

const store = configureStore({
  reducer: {
    collection: collectionSlice,
    page: pageSlice,
    theme: themeSlice,
  },
  // Temporary disable serialize check for redux as we store MediaStream in ComputerStore.
  // https://stackoverflow.com/a/63244831
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
