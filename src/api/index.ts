const apiEndpoint = "http://api.arthur.exchange/total-volume/lp?address=0xD3438AEE1685EE8685f419F355b89302CA18e767&last24h=true";

export const fetch24hVol = async () => {
    try {
        const response = await fetch(apiEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }

        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        return data.data
    } catch (error) {
        console.error('Error:', error);
    }

}

