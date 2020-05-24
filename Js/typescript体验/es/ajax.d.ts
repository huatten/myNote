interface AjaxConfig {
    url: string;
    type: string;
    data?: object;
    dataType: string;
    async?: boolean;
    success: Function;
    fail: Function;
}
declare function $ajax(options: AjaxConfig): void;
declare function formatParams(data: object): string;
