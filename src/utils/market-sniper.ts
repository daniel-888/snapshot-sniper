import * as anchor from "@project-serum/anchor";
import nacl from "tweetnacl";

import * as web3 from "@solana/web3.js";
import {
  Token,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { sendTransactions, getUnixTs } from "./connection";
import { MAGICEDEN_API, CORS_BUY_PROXY } from "../config/prod";

import axios from "axios";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export const quickOneBuy = async (
  listedInfo: any,
  walletAddr: any,
  provider: any,
  connection: anchor.web3.Connection
) => {
  console.log("listedInfo", listedInfo);
  const ata = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    new web3.PublicKey(listedInfo.mintAddress),
    new web3.PublicKey(listedInfo.owner)
  );
  console.log("ata = ", ata.toBase58());
  // const query = `${
  //   MAGICEDEN_API.BUY_V2
  // }&buyer=${walletAddr.toString()}&seller=${
  //   listedInfo.owner
  // }&auctionHouseAddress=${listedInfo.v2.auctionHouseKey}&tokenMint=${
  //   listedInfo.mintAddress
  // }&tokenATA=${ata.toBase58()}&price=${listedInfo.price}&buyerReferral=${
  //   listedInfo.v2.buyerReferral
  // }&sellerReferral=${
  //   listedInfo.v2.sellerReferral
  // }&buyerExpiry=-1&sellerExpiry=${listedInfo.v2.expiry}`;
  // console.log("query", query);

  const query = `${MAGICEDEN_API.BUY_V2}buyer=${walletAddr.toString()}&seller=${
    listedInfo.owner
  }&auctionHouseAddress=${listedInfo.v2.auctionHouseKey}&tokenMint=${
    listedInfo.mintAddress
  }&tokenATA=${ata.toBase58()}&price=${listedInfo.price}&sellerReferral=${
    listedInfo.v2.sellerReferral
  }&sellerExpiry=${listedInfo.v2.expiry}`;
  console.log("query", query);

  let tx = await axios({
    // headers: { Authorization: "Bearer 233da3c4-4c8b-4dc9-801a-73afde2f436b" },
    method: "GET",
    url: `${query}`,
  });

  console.log("tx", tx.data.txSigned.data);
  console.log("provider", provider);

  // try {
  // const keyPair = anchor.web3.Keypair.fromSecretKey(bs58.decode(""));

  // origin code
  // let s = await provider.send(anchor.web3.Transaction.populate(anchor.web3.Message.from(Buffer.from(tx.data.tx.data))));
  // await provider.connection.confirmTransaction(s)
  // console.log(s)

  let txn = anchor.web3.Transaction.from(Buffer.from(tx.data.txSigned.data));
  let keys: any = [];
  for (let i = 0; i < 3; i++) {
    keys.push(
      txn.instructions[i].keys.map((item: any) => item.pubkey.toBase58())
    );
  }
  console.log("keys = ", keys);
  let signData = txn.serializeMessage();
  console.log(
    "1 = ",
    nacl.sign.detached.verify(
      signData,
      txn.signatures[1].signature as Buffer,
      txn.signatures[1].publicKey.toBuffer()
    ),
    txn.compileMessage()
  );
  txn = await provider.wallet.signTransaction(txn);
  // txn.partialSign(keyPair);

  signData = txn.serializeMessage();
  console.log(
    "1 = ",
    nacl.sign.detached.verify(
      signData,
      txn.signatures[1].signature as Buffer,
      txn.signatures[1].publicKey.toBuffer()
    ),
    txn.compileMessage()
  );
  console.log("after sign tx = ", txn);
  const rawTx = txn.serialize();
  try {
    const sendOptions = provider.opts && {
      skipPreflight: provider.opts.skipPreflight,
      preflightCommitment:
        provider.opts.preflightCommitment || provider.opts.commitment,
    };
    return await connection.sendRawTransaction(rawTx, sendOptions);
  } catch (err) {
    console.log("err = ", err);
  }
  // let s = await provider.sendAndConfirm(txn);
  // await provider.connection.confirmTransaction(s);
  // provider.wallet.signTransaction(txn);
  // anchor.web3.sendAndConfirmRawTransaction(
  //   provider.connection,
  //   txn.serialize()
  // );

  // ME community
  // const signedTx = anchor.web3.Transaction.from(Buffer.from(tx.data.txSigned.data))
  // signedTx.partialSign(keyPair)
  // const s = await connection.sendRawTransaction(signedTx.serialize(), { skipPreflight: true })
  // console.log(s)

  // github
  // const transactionHash = "YOUR_TRANSACTION_HASH";
  // const rawTransaction = Buffer.from(transactionHash, 'base64');
  // const newTrx = web3.Transaction.from(rawTransaction);
  // const newTrx = anchor.web3.Transaction.from(Buffer.from(tx.data.txSigned.data, 'base64'))

  // console.log(`Transaction before partial sign ${JSON.stringify(newTrx)}`)

  // // make sure we have immutable array
  // const originalSignatures = Object.assign([], newTrx.signatures) as web3.SignaturePubkeyPair[];
  // const filteredSignatures = originalSignatures.filter(item => item.signature != null);

  // console.log(`Original signatures are ${JSON.stringify(originalSignatures)}`);
  // console.log(`Filtered signatures are ${JSON.stringify(filteredSignatures)}`);

  // newTrx.partialSign(keyPair);

  // filteredSignatures.forEach(sign => {
  //   newTrx.addSignature(sign.publicKey, sign.signature as Buffer);
  // });

  // console.log("=============================================================");
  // console.log(`After add ${JSON.stringify(newTrx.signatures)}`);

  // const serialTx = newTrx.serialize(
  //   {
  //     requireAllSignatures: false,
  //     verifySignatures: false,
  //   }
  // );

  // console.log("=============================================================");
  // console.log(`Full transaction ${JSON.stringify(web3.Transaction.from(serialTx))}`)

  // const id = await web3.sendAndConfirmRawTransaction(connection, serialTx, { skipPreflight: true });

  // console.log(`Complete transaction: ${id}`);

  // customized origin
  // const signedTx = anchor.web3.Transaction.from(Buffer.from(tx.data.txSigned.data))
  // const s = await provider.send(signedTx)
  // await provider.connection.confirmTransaction(s)
  // console.log(s)

  // } catch (e) {
  //   console.log('error in quickBuy', e)
  // }
};

export const quickMultiBuy = async (
  items: any,
  walletAddr: any,
  provider: any
) => {
  console.log(items);
  try {
    let txsMatrix: web3.Transaction[] = [];
    for (let i = 0; i < items.length; i++) {
      const query = `${
        MAGICEDEN_API.BUY_V2
      }&buyer=${walletAddr.toString()}&seller=${
        items[i].owner
      }&auctionHouseAddress=${items[i].v2.auctionHouseKey}&tokenMint=${
        items[i].mintAddress
      }&tokenATA=${items[i].id}&price=${items[i].price}&sellerReferral=${
        items[i].v2.sellerReferral
      }&sellerExpiry=${items[i].v2.expiry}`;

      let decodedTx = await axios({
        method: "GET",
        url: `${CORS_BUY_PROXY}${query}`,
      });
      console.log("decodedTx", decodedTx);
      let tx = anchor.web3.Transaction.populate(
        anchor.web3.Message.from(decodedTx.data.tx.data)
      );
      console.log(anchor.web3.Message.from(decodedTx.data.tx.data));
      txsMatrix.push(tx);
    }
    let block = await provider.connection.getRecentBlockhash("singleGossip");
    for (let i = 0; i < items.length; i++) {
      txsMatrix[i].recentBlockhash = block.blockhash;
      txsMatrix[i].setSigners(
        // fee payed by the wallet owner
        provider.wallet.publicKey
      );
    }

    console.log(txsMatrix);
    const signedTxns = await provider.wallet.signAllTransactions(txsMatrix);
    console.log(signedTxns);
    const txsId: any[] = [];
    for (let i = 0; i < signedTxns.length; i++) {
      const sendTx = signedTxns[i].serialize({ verifySignatures: !1 });
      const startTime = getUnixTs();
      let slot = 0;
      const txid: any = await provider.connection.sendRawTransaction(sendTx, {
        skipPreflight: true,
      });
      txsId.push(txid);
      console.log("Started awaiting confirmation for", txid);

      let done = false;
      (async () => {
        while (!done && getUnixTs() - startTime < 15000) {
          provider.connection.sendRawTransaction(sendTx, {
            skipPreflight: true,
          });
          await sleep(500);
        }
      })();
    }
    console.log(txsId);
  } catch (err) {
    console.log(err);
  }
};
