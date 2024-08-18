'use client';
import EthWallet from "@/components/EthWalletComponent";
import SolanaWallet from "@/components/SolanaWalletComponent";
import { generateMnemonic } from "bip39"
import { useEffect, useState } from "react"
export default function Assignment2(){
    const [neumonicList, setneumonicList] = useState([""]);
    const [neumonic, setneumonic] = useState("");
    const [showNeumonic, setshowNeumonic] = useState(false);
    const [isSolanaWallet, setisSolanaWallet] = useState(true);
    useEffect(() => {
        const mnemonic = generateMnemonic();
        setneumonic(mnemonic);
        const words = mnemonic.split(' ');
        setneumonicList(words);
    }, [])
    
    const handleNeumonicView =()=>{
        setshowNeumonic(!showNeumonic);
    }

    const handleWalletType =(type: boolean)=>{
        setisSolanaWallet(type);
    }

    return (<div>
        <div className="text-4xl">
            Web based Wallet
        </div>
        <div>
            <div className="flex justify-between">
                <button className="mt-5 bg-slate-700 px-3 py-2 text-sm rounded-md hover:bg-slate-900 text-white" onClick={handleNeumonicView}>Recovery Phrase</button>
            </div>
            {showNeumonic &&
                <div className="flex flex-wrap mt-5 border border-slate-800 rounded-sm">
                    {neumonicList.map((word)=>{
                        return (
                        <div key={word} className="px-2 py-1 border border-slate-500 rounded-md mx-5 my-2" >
                            {word}
                        </div>);
                    })}
                </div>
            }
            
            <div className="mt-5">
                <button onClick={() =>handleWalletType(true)} className={"w-1/2 border border-slate-700 p-2 " + (isSolanaWallet ? "bg-slate-500 p-2 text-white" : "bg-black")}>Solana Wallets</button>
                <button onClick={() =>handleWalletType(false)} className={"w-1/2 border border-slate-700 p-2 " + (!isSolanaWallet ? "bg-slate-500 p-2 text-white" : "bg-black")}>Ethereum Wallet</button>
            </div>
            {isSolanaWallet ? <SolanaWallet neumonic={neumonic} /> : <EthWallet neumonic={neumonic} />}
            
        </div>
    </div>)
}