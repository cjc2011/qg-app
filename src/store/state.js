function getItem(key) {
    let result = localStorage.getItem(key)
    if (result) {
        result = result.charAt(0) == '{' ? JSON.parse(result) : result
        return result
    } else {
        return null
    }
}

const state = {
    title: '',
    organid: '74',
    organ: getItem('organ'),
    publickey: getItem('publickey'),
    userinfo: getItem('userinfo'),
    encryptionkey: getItem('encryptionkey'),
    courseinfo: getItem('courseinfo'),
}


export default state