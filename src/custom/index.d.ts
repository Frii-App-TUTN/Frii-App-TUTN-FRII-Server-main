
declare global {
    declare namespace Custom {
        export interface Res {
            error: boolean;
            message?: string;
            data?: any;
        }
    }
}
export = Custom;