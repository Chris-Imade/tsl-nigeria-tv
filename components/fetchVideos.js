export const getData = async(url = '') => {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: 'Token 818fbb131c82e940cb22b8b348dc430af391d4d7'
        }// body data type must match "Content-Type" header
        });
        
        
    return response.json(); // parses JSON response into native JavaScript objects

    // console.log("Happy Coding --->!");
}