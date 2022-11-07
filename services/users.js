import apiCall from "./apicall"

const getUsers = (page = 1, limit = 10) => {
    const apiConfig = {
        endpoint: "users",
        includeToken: true,
        body: {
            page,
            limit
        }
    }
    return apiCall(apiConfig)
    .then(data => {
        return data;
    });
}

const getUser = (userId) => {
    const apiConfig = {
        endpoint: "users/"+userId,
        includeToken: true
    }
    return apiCall(apiConfig)
    .then(data => {
        return data;
    });
}

const createUser = (useData) => {
    const apiConfig = {
        endpoint: "users",
        method: "POST",
        includeToken: true,
        body: useData
    }
    return apiCall(apiConfig)
    .then(data => {
        return data;
    });
}

const updateUser = (userId, updateFields) => {
    const apiConfig = {
        endpoint: "users/"+userId,
        method: "PUT",
        includeToken: true,
        body: updateFields
    }
    return apiCall(apiConfig)
    .then(data => {
        return data;
    });
}

const deleteUser = (userId) => {
    const apiConfig = {
        endpoint: "users/"+userId,
        method: "DELETE",
        includeToken: true,
    }
    return apiCall(apiConfig)
    .then(data => {
        return data;
    });
}

export {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}