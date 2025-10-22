
// TradeBot/index.js
import { ethers } from "ethers";

async function trade() {
  const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const router = new ethers.Contract(process.env.ROUTER_ADDRESS, process.env.ROUTER_ABI, wallet);

  console.log("Swapping tokens...");
  const tx = await router.swapExactTokensForTokens(
    ethers.parseUnits("1", 18),
    0,
    [process.env.TOKEN_IN, process.env.TOKEN_OUT],
    await wallet.getAddress(),
    Math.floor(Date.now() / 1000) + 60 * 10
  );
  console.log("Swap tx:", tx.hash);
}

trade().catch(console.error);
