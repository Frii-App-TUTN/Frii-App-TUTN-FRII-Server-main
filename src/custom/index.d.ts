
declare global {
    declare namespace Custom {
        interface Res {
            error: boolean;
            message?: string;
            data?: any;       
        }
        interface ReqBody {
            user?: string;
            emailAddress?: string;
            groupName?: string;
            userEmail: string;
            newName?: string;
        }
         type Req<Request, ReqBody> = Request & ReqBody;
    }
};
export = Custom;