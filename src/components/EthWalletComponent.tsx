import { mnemonicToSeedSync } from "bip39";
import { HDNodeWallet, Wallet } from "ethers";
import { useState } from "react";
import axios from "axios"

interface JsonRPCbody{
  "jsonrpc": string, 
  "id": number,
  "method": string,
  "params": string[]
}

export default function EthWallet({ neumonic }: { neumonic: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState<Wallet[]>([]);
  const [balanceAddress, setBalanceAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState(0);
  const [isLoading,setIsLoading] = useState(false);
  const handleAddWallet = () => {
    const seed = mnemonicToSeedSync(neumonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);
    setCurrentIndex(currentIndex + 1);
    setAddresses([...addresses,wallet]);
  };

  const handleGetBalance = async ()=>{
    if(balanceAddress.length == 0){
      return;
    }
    const data:JsonRPCbody = {
      "jsonrpc": "2.0",
      "id": 1,
      "method": "eth_getBalance",
      "params": [balanceAddress, "latest"]
    };
    setIsLoading(true);
    await axios.post('https://eth-mainnet.g.alchemy.com/v2/wC74Si5fdF4jE7IsQtAsI2QRP5qx-vHo',data)
    .then((res)=>{
      setIsLoading(false);
      const balanceInWie = (res.data.result);
      const decimalValue = BigInt(balanceInWie);
      const etherValue = Number(decimalValue) / 10**18;
      setAccountBalance(etherValue); 
      
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
                <input type="text" onChange={(e)=> handleOnchangeInput(e)} placeholder="Enter the public key to check balance" className="text-sm bg-transparent p-1 border border-slate-700 rounded-md mt-5 w-3/5" />
                <input type="text" value={"ETH " + accountBalance} placeholder="Balance" className="text-sm bg-transparent p-1 border border-slate-700 rounded-md mt-5" readOnly  />
                <button onClick={handleGetBalance} className="mt-5 text-sm bg-slate-700 px-3 py-1 rounded-md hover:bg-slate-900 text-white" >{isLoading ? "Fetching..." : "Get Balance"}</button>
            </div>
      <button
        onClick={handleAddWallet}
        className="mt-5 bg-slate-700 px-3 py-2 text-sm rounded-md hover:bg-slate-900 text-white"
      >
        Add Wallet
      </button>
      <div>
        {addresses.map((walletKey, index) => {
          return (
            <div key={index}>
              <div className="border border-slate-700 p-5 my-5 rounded-md">
                <div>
                  <div>Public Key:</div>
                  <div>{walletKey.address}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
