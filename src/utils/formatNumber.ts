const formatNumber = (input: number | string) => {
    let num = typeof input === 'string' ? parseFloat(input) : input;
    if (isNaN(num)) {
        return '0.00';
    }

    const units = ['K', 'M', 'B', 'T'];
    let unitIndex = 0;

    while (num >= 1000 && unitIndex < units.length) {
        num /= 1000;
        unitIndex++;
    }

    return num.toFixed(2).replace(/\.00$/, '') + units[unitIndex - 1];
}


export { formatNumber }