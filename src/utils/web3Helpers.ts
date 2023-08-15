import { ethers } from "ethers";
import { abi as RouterABI } from '@/resources/abis/ArthurRouter.json';

var routerContract: ethers.Contract;

export const getRouterContract = () => {
  if (!routerContract) {
    const routerContractAddress = '';
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    // const signer = provider.getSigner();

    routerContract = new ethers.Contract(routerContractAddress, RouterABI, provider);
  }
  return routerContract;
};

export const scAddLiquidity = async () => {
  const contract = getRouterContract();
  await contract.callStatic!.addLiquidity();
}
