import React, { useState, useEffect, useMemo } from "react";
import * as anchor from "@project-serum/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { useAppSelector } from "../redux/hooks";
import { AlertState, getNFTOwner } from "../utils/utils";
import { quickOneBuy, quickMultiBuy } from "../utils/market-sniper";
import {
  CORS_PROXY_API,
  MAGICEDEN_API,
  LOAD_COUNT,
  DEFAULT_RPC_API,
} from "../config/prod";

import styles from "../styles/LiveListing.module.scss";
import ListingTable from "../components/ListingTable";
import ListingFilter from "../components/ListingFilter";
import Alert from "../components/Alert";
import Image from "../components/Image";

interface Attr {
  key: string;
  val: string;
}

const LiveListing = () => {
  const wallet = useAnchorWallet();
  const allCollection = useAppSelector((state) => state.collection.all);
  const collectionSymbol = useAppSelector(
    (state) => state.collection.selectedSymbol
  );

  const [nfts, setNfts] = useState<any>([]);
  const [query, setQuery] = useState("");

  const [collectionInfo, setCollectionInfo] = useState<any>();
  const [collectionDetail, setCollectionDetail] = useState<any>();
  const [totalSupply, setTotalSupply] = useState(0);

  const [customRpc, setCustomRpc] = useState("");
  const [sniperMaxPrice, setSniperMaxPrice] = useState(0);
  const [sniperLimitCount, setSniperLimitCount] = useState(0);
  const [remainedCound, setRemainedCount] = useState(0);
  const [privateKey, setPrivateKey] = useState("");
  const [attributes, setAttributes] = useState<any>([]);
  const [attrSearchKey, setAttrSearchKey] = useState<Attr[]>([]);

  const [isSniping, setIsSniping] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [alertState, setAlertState] = useState<AlertState>({
    message: "",
    severity: undefined,
    open: false,
  });

  let rpcUrl = DEFAULT_RPC_API;
  let connection: any = null;
  if (customRpc.indexOf("https://") === 0) rpcUrl = customRpc;

  try {
    connection = new anchor.web3.Connection(rpcUrl);
  } catch (e) {
    setAlertState({
      message: "Please input a valid RPC url",
      severity: "error",
      open: true,
    });
  }

  const checkUserWallet = async () => {
    let connection = new anchor.web3.Connection(DEFAULT_RPC_API);
    setIsLoading(true);
    try {
      getNFTOwner(connection, wallet?.publicKey).then((result) => {
        setIsLoading(false);
        if (!result) {
          setAlertState({
            open: true,
            message: "You have not got our NFT",
            severity: "info",
          });
        }
      });
    } catch (err) {
      setAlertState({
        open: true,
        message: "Network Error",
        severity: "error",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    const getCollection = async () => {
      setIsLoading(true);
      try {
        const collectionInfo = await axios({
          method: "get",
          url: `${CORS_PROXY_API}${MAGICEDEN_API.COLLECTION}${collectionSymbol}`,
        });

        if (collectionInfo.data) {
          setCollectionInfo({ ...collectionInfo.data });
        }
        const collectStat = await axios({
          method: "get",
          url: `${CORS_PROXY_API}${MAGICEDEN_API.COLLECTION_DETAIL}${collectionSymbol}`,
        });
        if (collectStat.data?.results) {
          setCollectionDetail({ ...collectStat.data.results });

          if (collectStat.data?.results?.availableAttributes?.length > 0) {
            let attrBuffer = collectStat.data.results.availableAttributes;
            let attr: any = [];
            for (let i = 0; i < attrBuffer.length; i++) {
              let flag = 0;
              for (let j = 0; j < attr.length; j++) {
                if (attr[j].key == attrBuffer[i].attribute.trait_type) {
                  flag = 1;
                  break;
                }
              }
              if (!flag) {
                attr.push({
                  key: attrBuffer[i].attribute.trait_type,
                  val: [],
                });
              }
            }
            for (let i = 0; i < attr.length; i++) {
              for (let j = 0; j < attrBuffer.length; j++) {
                if (attr[i].key == attrBuffer[j].attribute.trait_type) {
                  attr[i].val.push(attrBuffer[j].attribute.value);
                }
              }
            }
            setAttributes([...attr]);
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(`Axios Error in getCollection! ${error}`);
        } else {
          console.log(`Unexpected error in getCollection! ${error}`);
        }
      }
      setIsLoading(false);
    };

    const getCollectionHoderStatus = async () => {
      try {
        const collectionHolder = await axios({
          method: "get",
          url: `${CORS_PROXY_API}${MAGICEDEN_API.COLLECTION_HOLDER_STATUS}${collectionSymbol}?edge_cache=true`,
        });

        if (collectionHolder?.data?.results) {
          setTotalSupply(collectionHolder.data.results.totalSupply);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(`Axios Error in getCollectionHoderStatus! ${error}`);
        } else {
          console.log(`Unexpected error in getCollectionHoderStatus! ${error}`);
        }
      }
    };

    const getNFTs = async () => {
      setIsLoading(true);
      const q = encodeURIComponent(
        `{"$match":{"collectionSymbol":"${collectionSymbol}"},"$sort":{"createdAt":-1},"$skip":${
          page == 1 ? 0 : (page - 1) * LOAD_COUNT - 1
        },"$limit":${LOAD_COUNT}}`
      );
      setQuery(q);
      try {
        setLoadMore(false);
        const resNfts = await axios({
          method: "get",
          url: `${CORS_PROXY_API}${MAGICEDEN_API.LISTED_NFTS}${q}`,
        });

        if (resNfts.data?.results?.length > 0) {
          setNfts([...resNfts.data.results]);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(`Axios Error in getNFTs! ${error}`);
        } else {
          console.log(`Unexpected error in getNFTs! ${error}`);
        }
      }
      setIsLoading(false);
    };
    if (collectionSymbol) {
      getCollection();
      getCollectionHoderStatus();
      getNFTs();
    }
    // if (loadMore) getNFTs()
  }, [collectionSymbol, loadMore]);

  const handleAttrSearch = async (insert: any) => {
    let attrBuf: any = [...attrSearchKey],
      flag = 0;
    for (let i = 0; i < attrBuf.length; i++) {
      if (attrBuf[i].key == insert.key) {
        if (insert.val == "") {
          attrBuf.splice(i, 1);
        } else {
          attrBuf[i].val = insert.val;
        }
        flag = 1;
      }
    }
    if (flag == 0) {
      attrBuf = [...attrBuf, insert];
    }
    setAttrSearchKey(attrBuf);
    let str: any = ``;
    if (attrBuf.length) {
      for (let i = 0; i < attrBuf.length; i++) {
        str += `{"$or":[{"attributes":{"$elemMatch":{"trait_type":"${attrBuf[i].key}","value":"${attrBuf[i].val}"}}}]},`;
      }
      let q =
        encodeURIComponent(`{"$match":{"collectionSymbol":"${collectionSymbol}","$and":[
        ${str.slice(0, str.length - 1)}
      ]},"$sort":{"takerAmount":1,"createdAt":-1},"$skip":0,"$limit":20}`);
      try {
        const resNfts = await axios({
          method: "get",
          url: `${CORS_PROXY_API}${MAGICEDEN_API.LISTED_NFTS}${q}`,
        });
        setQuery(q);
        setNfts([...resNfts.data.results]);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(`Axios Error in handleSearch! ${error}`);
        } else {
          console.log(`Unexpected error in handleSearch! ${error}`);
        }
      }
    } else {
      const q = encodeURIComponent(
        `{"$match":{"collectionSymbol":"${collectionSymbol}"},"$sort":{"createdAt":-1},"$skip":${
          page == 1 ? 0 : (page - 1) * LOAD_COUNT - 1
        },"$limit":${LOAD_COUNT}}`
      );
      setQuery(q);
      try {
        const resNfts = await axios({
          method: "get",
          url: `${CORS_PROXY_API}${MAGICEDEN_API.LISTED_NFTS}${q}`,
        });

        if (resNfts.data?.results?.length > 0) {
          setNfts([...resNfts.data.results]);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(`Axios Error! ${error}`);
        } else {
          console.log(`Unexpected error! ${error}`);
        }
      }
    }
  };

  const quickBuy = async (id: number) => {
    if (wallet) {
      const provider = new anchor.AnchorProvider(connection, wallet, {
        preflightCommitment: "processed",
      });
      console.log("nft data = ", nfts[id], wallet?.publicKey.toBase58());
      await quickOneBuy(nfts[id], wallet?.publicKey, provider, connection);
    }
  };

  const sniperBuyItems = async (items: any) => {
    if (wallet) {
      const provider = new anchor.AnchorProvider(connection, wallet, {
        preflightCommitment: "recent",
      });
      await quickMultiBuy(items, wallet?.publicKey, provider);
    }
  };

  useEffect(() => {
    if (isSniping) {
      myInterval();
    } else {
      setRemainedCount(sniperLimitCount);
      const timer = myInterval();
      window.clearInterval(timer);
    }
  }, [isSniping]);

  const myInterval = () => {
    const id = window.setInterval(async () => {
      try {
        if (remainedCound) {
          const resNfts = await axios({
            method: "get",
            url: `${CORS_PROXY_API}${MAGICEDEN_API.LISTED_NFTS}${query}`,
          });
          setNfts([...resNfts.data.results]);
          let snipNfts: any = [],
            count = 0;
          for (let i = 0; i < resNfts.data.results.length; i++) {
            if (resNfts.data.results[i].price <= sniperMaxPrice) {
              snipNfts.push(resNfts.data.results[i]);
              count++;
            }
            if (count === sniperLimitCount) {
              setIsSniping(false);
              break;
            }
          }
          if (count) {
            sniperBuyItems(snipNfts);
            setRemainedCount(remainedCound - count);
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(`Axios Error in myInterval! ${error}`);
        } else {
          console.log(`Unexpected error in myInterval! ${error}`);
        }
      } finally {
      }
    }, 5000);
    return id;
  };

  const convert2Number = (bigNumber) => {
    return (Number(bigNumber) / 10 ** 9).toFixed(2);
  };

  const ImageDiv = useMemo(
    () => (
      <Image
        converted={`${MAGICEDEN_API.CONVERT_IMAGE_150x150}${collectionInfo?.image}`}
        origin={collectionInfo?.image}
        alt="collection-logo"
      />
    ),
    [collectionInfo]
  );

  return (
    <div className={styles.div}>
      <div className={styles.filter}>
        <ListingFilter
          allCollection={allCollection}
          attributes={attributes}
          customRpc={customRpc}
          setCustomRpc={setCustomRpc}
          sniperMaxPrice={sniperMaxPrice}
          setSniperMaxPrice={setSniperMaxPrice}
          sniperLimitCount={sniperLimitCount}
          setSniperLimitCount={setSniperLimitCount}
          privateKey={privateKey}
          setPrivateKey={setPrivateKey}
          handleAttrSearch={handleAttrSearch}
          isSniping={isSniping}
          setIsSniping={setIsSniping}
          setAlertState={setAlertState}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          {collectionInfo?.image && ImageDiv}
          <div>
            <Box className={styles.title} color="primary.main">
              {collectionInfo?.name}
            </Box>
            <Box className={styles.text} color="primary.main">
              {collectionInfo?.description}
            </Box>
          </div>
        </div>
        <Box
          className={styles.info}
          sx={{ border: "2px solid", borderColor: "secondary.main" }}
        >
          {/* <div className={styles.item}>
            <div className={styles.title}>Scanned</div>
            <div className={styles.value}>123</div>
          </div>*/}
          <Box
            className={styles.item}
            sx={{
              color: "primary.main",
              borderRight: "2px solid",
              borderRightColor: "secondary.main",
            }}
          >
            <div className={styles.title}>Supply</div>
            <div className={styles.value}>{totalSupply}</div>
          </Box>
          <Box
            className={styles.item}
            sx={{
              color: "primary.main",
              borderRight: "2px solid",
              borderRightColor: "secondary.main",
            }}
          >
            <div className={styles.title}>Listings</div>
            <div className={styles.value}>{collectionDetail?.listedCount}</div>
          </Box>
          <Box
            className={styles.item}
            sx={{
              color: "primary.main",
              borderRight: "2px solid",
              borderRightColor: "secondary.main",
            }}
          >
            <div className={styles.title}>Floor</div>
            <div className={styles.value}>
              {convert2Number(collectionDetail?.floorPrice)} SOL
            </div>
          </Box>
          <Box
            className={styles.item}
            sx={{
              color: "primary.main",
              borderRight: "2px solid",
              borderRightColor: "secondary.main",
            }}
          >
            <div className={styles.title}>Avg Sale</div>
            <div className={styles.value}>
              {convert2Number(collectionDetail?.avgPrice24hr)} SOL
            </div>
          </Box>
          <Box
            className={styles.item}
            sx={{
              color: "primary.main",
              borderRight: "2px solid",
              borderRightColor: "secondary.main",
            }}
          >
            <div className={styles.title}>Total Vol</div>
            <div className={styles.value}>
              {convert2Number(collectionDetail?.volumeAll)} SOL
            </div>
          </Box>
          <Box
            className={styles.item}
            sx={{
              color: "primary.main",
              borderRight: "2px solid",
              borderRightColor: "secondary.main",
            }}
          >
            <div className={styles.title}>24H Vol</div>
            <div className={styles.value}>
              {convert2Number(collectionDetail?.volume24hr)} SOL
            </div>
          </Box>
        </Box>
        <div className={styles.content}>
          <ListingTable table={nfts} quickBuy={quickBuy} />
          {/* <div className={styles.loadMore} onClick={() => { setLoadMore(true); setPage(page + 1) }}>
            Load More...
          </div> */}
        </div>
      </div>
      {isLoading && (
        <div className={styles.loading}>
          <div className={styles.circle}>
            <CircularProgress />
          </div>
        </div>
      )}
      <Alert alertState={alertState} setAlertState={setAlertState} />
    </div>
  );
};

export default LiveListing;
