export function output(
    data: object | null,
    code: number | null,
    msg: string): object {
    return {
        status: code,
        message: msg,
        result: data,
    };
}