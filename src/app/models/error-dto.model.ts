export interface ErrorDTO {
    id?:number
    title:string
    category:string
    howToFix:string
    beforeExample:string
    afterExample:String
    notes:string
    stacktrace?:string
}
