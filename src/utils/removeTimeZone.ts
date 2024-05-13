export function removeTimeZone(date: Date): string {
    if (date instanceof Date) {
        console.log("É UMA DATA");
    }

    const dateString = date.toISOString();

    return dateString.split("T")[0];
}
