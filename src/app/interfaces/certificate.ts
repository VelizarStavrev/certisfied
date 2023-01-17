export interface Certificate {
    data: {
        id: string,
        name: string, 
        created: number, 
        edited: number, 
        creator_id: string, 
        notes: string,
        fields: any[],
        template_id: string
    },
    message: string,
    status: boolean,
    template_data: {
        id: string,
        name: string, 
        created: number, 
        edited: number, 
        notes: string,
        fields: any[],
        orientation: string
    }
}
