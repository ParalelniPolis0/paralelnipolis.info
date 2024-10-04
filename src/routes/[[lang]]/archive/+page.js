
export function load({ url }) {
    return {
        type: url.searchParams.get('view') || 'list'
    }
}