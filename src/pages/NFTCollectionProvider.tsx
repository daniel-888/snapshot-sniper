import { useEffect } from 'react'
import axios from 'axios'

import { useAppDispatch } from '../redux/hooks';
import { setAllCollection, setPopularCollection, setSelectedSymbol } from '../redux/slice/collectionSlice';

import {
  CORS_PROXY_API,
  MAGICEDEN_API,
} from "../config/prod"

function NFTCollectionProvider({ children }) {

  const dispatch = useAppDispatch()

  const getAllCollection = async () => {

    try {
      const allCollection: any = await axios({
        method: 'get',
        url: `${CORS_PROXY_API}${MAGICEDEN_API.ALL_COLLECTION}`
      });
      if (allCollection.data?.collections?.length > 0) {
        dispatch(setAllCollection([...allCollection.data?.collections]))
      }
    }
    catch (err) {
      console.log(`Can't get all collections!`, err);
    }
  }

  const getPopularCollection = async () => {

    try {
      const populars = await axios({
        method: 'get',
        url: `${CORS_PROXY_API}${MAGICEDEN_API.POPULAR_COLLECTION}`
      });
      if (populars.data?.collections?.length > 0) {
        dispatch(setPopularCollection([...populars.data.collections]));
        dispatch(setSelectedSymbol(populars.data.collections[0].symbol))
      }
    }
    catch (err) {
      console.log(`Can't get popular collections!`, err);
    }
  }

  useEffect(() => {
    getAllCollection()
    getPopularCollection()
  }, [])

  return (
    <>
      {children}
    </>
  );
}

export default NFTCollectionProvider;