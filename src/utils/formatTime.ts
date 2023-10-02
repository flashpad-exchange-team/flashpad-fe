
export default function calculateRemainingTime(timestamp: any) {
    const { differenceInMonths, differenceInDays, differenceInMinutes, differenceInSeconds } = require('date-fns');

    const targetDate = new Date(timestamp * 1000);

    // Calculate the differences
    const currentDate = new Date();
    const monthsDifference = differenceInMonths(targetDate, currentDate);
    const daysDifference = differenceInDays(targetDate, currentDate);
    const minutesDifference = differenceInMinutes(targetDate, currentDate);
    const secondsDifference = differenceInSeconds(targetDate, currentDate);

    // Format the differences into a single string
    const formattedDifference = `${monthsDifference} months ${daysDifference} days ${minutesDifference} minutes ${secondsDifference} seconds left`;


    return formattedDifference;
}

