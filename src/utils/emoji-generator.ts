export const getEmojis = (): string[] => {
    const emoji = '😀'
    const emojis: string[] = []
    const emojiCode = emoji.codePointAt(0)

    for (let i = 0; i < 200; i++) {
        if (emojiCode)
            emojis.push(String.fromCodePoint(emojiCode + i))
    }

    return emojis
}