

export const actions = {
    add: (data: any) => ({ type: "ADD", payload: data}),
    delete: (data: any) => ({ type: "DELETE", payload: data}),
    filter: (data: any) => ({ type: "FILTER", payload: data}),
}