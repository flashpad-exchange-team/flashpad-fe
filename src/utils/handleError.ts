import customToast from "@/components/notification/customToast"

export const handleError = (error: any) => {
    console.log(
        '🚀 ~ file: contract.ts:86 ~ handleError ~ error:',
        error?.message, error
    )
    if (error.includes('INSUFFICIENT_OUTPUT_AMOUNT')) {
        customToast({ type: 'error', message: 'Insufficient Output Amount' })
        return
    }
    if (error.includes('User rejected the request')) {
        customToast({ type: 'error', message: 'User rejected the request' })
        return
    }
    if (error.includes('transfer amount exceeds balance')) {
        customToast({ type: 'error', message: 'Transfer amount exceeds balance' })
        return
    }
    if (error.includes('Job is Close')) {
        customToast({ type: 'error', message: 'Job is Close' })
        return
    }

}