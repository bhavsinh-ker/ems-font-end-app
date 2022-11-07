import { getCookie  } from 'cookies-next';

const apiCall = (apiConfig = {}) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = apiConfig.endpoint ? apiConfig.endpoint : '';
    let apiEndPoint = apiUrl+endpoint;
    const method = apiConfig.method ? apiConfig.method : 'GET';
    const includeToken = apiConfig.includeToken ? true : false;
    const headers = apiConfig.headers ? apiConfig.headers : {};
    const body = apiConfig.body ? serialize(apiConfig.body) : "";

    if( includeToken ) {
        const token = getCookie("ems-next-app");
        headers = {
            ...headers,
            'Authorization': 'Bearer '+token
        }
    }
    
    if( method != "GET" ) {
        headers = {
            ...headers,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        
    }

    const fetchConfig = {
        method,
        headers
    };

    if( method!= "GET" ) {
        fetchConfig = {
            ...fetchConfig,
            body
        }
    } else {
        apiEndPoint+= '?'+body;
    }
    
    return fetch(apiEndPoint, fetchConfig)
    .then((response)=> response.json())
    .then((data)=>{
        return data;
    })
    .catch((error)=>{
        console.log(error);
        return false
    });
}

const serialize = (obj) => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
}

export default apiCall;