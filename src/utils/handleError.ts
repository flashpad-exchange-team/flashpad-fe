import customToast from "@/components/notification/customToast"

const errorMappings: any = {
    'INSUFFICIENT_OUTPUT_AMOUNT': 'Insufficient Output Amount',
    'User rejected the request': 'User rejected the request',
    'INSUFFICIENT_B_AMOUNT': 'INSUFFICIENT_B_AMOUNT'

};

export const handleError = (error: any) => {
    console.log({ error })
    for (const keyword in errorMappings) {
        if (error.includes(keyword)) {
            customToast({ type: 'error', message: errorMappings[keyword] })
            return
        }
    }
    return 'An error occurred';
}

