import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useState } from "react";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import axios from "axios";

interface JsonRPCbody{
    "jsonrpc": string, 
    "id": number,
    "method": string,
    "params": string[]
}

export default function SolanaWallet({neumonic}: {neumonic : string}){
    const [currentIndex, setCurrentIndex] = useState(0);
    const [walletKeys, setWalletKeys] = useState<Keypair[]>([]);
    const [balanceAddress, setBalanceAddress] = useState("");
    const [accountBalance, setAccountBalance] = useState(0);
    const [isLoading,setIsLoading] = useState(false);
    const handleAddWallet =()=>{
        const seed = mnemonicToSeedSync(neumonic);
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);
        setCurrentIndex(currentIndex + 1);
        setWalletKeys([...walletKeys,keypair]);
    }

    const handleGetBalance = async ()=>{
        if(balanceAddress.length == 0){
            return;
          }
        const data: JsonRPCbody = {
            "jsonrpc": "2.0", 
            "id": 1,
            "method": "getBalance",
            "params": [balanceAddress]
        }
        setIsLoading(true);
        await axios.post('https://api.devnet.solana.com',data)
        .then((res)=>{
            setAccountBalance((res.data.result.value)/1000000000); 
            setIsLoading(false);
        })
        .catch((err)=>{
            setIsLoading(false);
            alert("Error: " + err);
        })
    }

    const handleOnchangeInput=(e:any)=>{
        setBalanceAddress(e.target.value);
    }

    return (
        <div>
            <div className="flex justify-between">
                <input type="text" onChange={(e)=> handleOnchangeInput(e)} placeholder="Enter the public key to check balance" className="text-sm bg-transparent p-1 border border-slate-700 rounded-md mt-5 w-3/5"/>
                <input type="text" value={"SOL " + accountBalance} placeholder="Balance" className="text-sm bg-transparent p-1 border border-slate-700 rounded-md mt-5" readOnly  />
                <button onClick={handleGetBalance} className="mt-5 text-sm bg-slate-700 px-3 py-1 rounded-md hover:bg-slate-900 text-white"> {isLoading ? "Fetching..." : "Get Balance"} </button>
            </div>
            <button onClick={handleAddWallet} className="mt-5 bg-slate-700 px-3 py-2 text-sm rounded-md hover:bg-slate-900 text-white">Add Wallet</button>
            <div>
                {walletKeys.map((walletKey,index)=>{
                    return (<div key={index}>
                        <div className="border border-slate-700 p-5 my-5 rounded-md">
                            <div>
                                <div>Public Key:</div>
                                <div>{walletKey.publicKey.toBase58()}</div>
                            </div>
                        </div>
                    </div>)
                })}
            </div>
        </div>
    );
}