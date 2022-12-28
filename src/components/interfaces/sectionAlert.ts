export interface IPropsSectionAlert{
   isError: boolean,
   alertMsg: string,
   status: "info" | "error" | "success" | "warning" | "loading" | undefined
}