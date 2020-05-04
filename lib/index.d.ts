export declare function spring({ from, to }: Props, options?: Partial<Options>): string[];
export interface Props {
    from: Partial<Css>;
    to: Partial<Css>;
}
interface Css {
    x: number;
    y: number;
    scale: number;
    opacity: number;
}
interface Options {
    stiffness: number;
    damping: number;
    precision: number;
    unit: string;
}
export default function ({ from, to }: Props, options?: Partial<Options>): string;
export {};
//# sourceMappingURL=index.d.ts.map