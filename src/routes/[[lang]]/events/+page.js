
export async function load({ url }) {
    console.log('xx')
    let onlyMajor = true;
    if (url.searchParams.get('all')) {
        onlyMajor = false;
    }
    return {
        onlyMajor
    }
}