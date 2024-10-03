export type ItemType = {
    name: string
    rarity: number
    type: "Obtainable" | 'Unobtainable'
    weight?: number
    canShovel?: boolean
    value?: number
    description?: string
}
