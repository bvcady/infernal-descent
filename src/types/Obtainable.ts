export type Obtainable = {
    name: string
    rarity: number
    type: "Obtainable"
    weight?: number
    canShovel?: boolean
    value?: number
}

export type Unobtainable = {
    name: string
    rarity: number
    type: "Unobtainable"
    weight?: number
    canShovel?: boolean
}