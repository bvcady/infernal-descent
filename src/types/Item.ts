import { Cell } from "./Cell";
import { Obtainable, Unobtainable } from "./Obtainable";

export type Item = {item: (Obtainable | Unobtainable) }& Partial<Cell>