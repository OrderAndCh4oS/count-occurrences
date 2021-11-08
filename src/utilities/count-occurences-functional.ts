const countOccurrencesFunctional = (str: string) =>
    Object.entries<number>(
        str
            .replace(/[-’']+(?=[\p{P}\s])|(?<=[\p{P}\s])[-’']+/ug, '')
            .replace(/[^\p{L}\p{M}\p{Zs}\p{So}\s’'-]+/ug, '')
            .replace(/\s\s+/g, ' ')
            .split(/\s+/)
            .reduce((obj: any, word: string) => {
                const wordLowerCase = word.toLowerCase();
                if (wordLowerCase && wordLowerCase in obj) obj[wordLowerCase] += 1;
                else obj[wordLowerCase] = 1;
                return obj;
            }, {})
    )
        .sort((a, b) => b[1] - a[1])
        .map(x => ({word: x[0], count: x[1]}));

export default countOccurrencesFunctional;
