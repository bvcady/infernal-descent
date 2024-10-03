import { Cell } from "./Cell";
import { ItemType } from "./Obtainable";

export type Item = {item: ItemType }& Partial<Cell>