export interface Template {
    data: {
        id: string,
        name: string, 
        created: number, 
        edited: number, 
        notes: string,
        fields: any[],
        orientation: string
    },
    message: string,
    status: boolean
}
