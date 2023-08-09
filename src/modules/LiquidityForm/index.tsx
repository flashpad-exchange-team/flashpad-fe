import QuestionIcon from "@/icons/QuestionIcon"
import ReloadIcon from "@/icons/ReloadIcon"
import SettingIcon from "@/icons/SettingIcon"
import SwapLeftIcon from "@/icons/SwapLeft"
import SwapRightIcon from "@/icons/SwapRight"
import TokenForm from "../TokenForm"
import DividerIcon from "@/icons/DividerIcon"
import { Button } from "@/components/button/Button"
import ButtonStyle from "@/icons/ButtonStyle"


const LiquidityForm = () => {

    return <div
        className="w-[648px] bg-[#00000080] rounded-lg h-auto my-[96px] mx-auto py-4 px-[24px]"
    >
        <div className="text-[24px] text-bold mx-auto ] w-fit flex items-center gap-3">
            <SwapLeftIcon />
            SWAP
            <SwapRightIcon />
        </div>
        <div className=" flex items-center gap-2 mt-8 justify-between">
            <div className="text-[#FFAF1D] text-semibold flex items-center gap-2 ">V2 MODE
                <QuestionIcon />
            </div>

            <div className="flex items-center gap-6">
                <ReloadIcon />
                <SettingIcon />
            </div>
        </div>
        <TokenForm />
        <div className="mx-auto w-fit my-2">
            <DividerIcon />
        </div>
        <TokenForm />
        <Button onClick={() => { }} className="w-full justify-center bg-[#1D2939] text-[#98A2B3] mb-2"> Add Liquidity</Button>
        <ButtonStyle />

    </div>
}

export default LiquidityForm