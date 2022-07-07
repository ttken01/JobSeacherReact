const myReducer = (user, action) => {
    switch (action.type) {
        case "login": 
            return action.payload
        case "logout":
            localStorage.clear()
            return null

    }

    return user
}

export default myReducer