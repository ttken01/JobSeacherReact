import axios from 'axios'




export const endpoints = {
    "categories": "/categories/",
    "majors": "/majors/",
    "posts":`/posts/`,
    "users": "/users/",
    "posts-page":(page)=> `/posts/?page=${page}`,
    "post-detail": (postId) => `/posts/${postId}/`,
    "post-detail-applies": (postId) => `/posts/${postId}/applies/`,
    "token":"/o/token/",
    "getUser":"/users/current-user/",
    "myPost":"/my-posts/",
    "myPostDelete": (postId) => `/posts/${postId}/`,
    "waits": "/waits/",
    "applies":"/applies/",
    "applies-detail": (id) => `/applies/${id}/`,
    "user-detail": (userId) => `/users/${userId}/`,
    "user-rating": (userId) => `/users/${userId}/rating/`,
    "user-comments": (userId) => `/users/${userId}/comments/`,
    "my-applies":"/my-applies/",
    "hirer":"/users/hirer-user/",
    "hirer-posts":(id)=> `/my-posts/hirer-post/?id=${id}`,
    "comments":"/comments/",
    "comment-detail": (id) => `/comments/${id}/`,
 
}


export const client = {
    // "clientId" :"6BWELa46xitqudxnPl6pbtEk7qlXqb2RRemJnNd3",
    // "clientSecret" :"IsX5DexNhy5cxQOQalpiMDEjjLgMbgKxdbHYdPXJQ0YikEkf7IwjRtYEfci7q7cOAK64KOaZTS7JnRRUEEw0UCDyRegqZSAeGOFwUxIIxbILVbZJ70aP1cSkJ02Nd6Ss"
    "clientId" :"KXfGCQFdtYVSSppBfpYfj11GtbRLR5seplh85BYW",
    "clientSecret" :"UknUQiLOnzpg9m8wOPaBhzIOyYoiyD0B30julpHvEgmbndkjtOJ4b2ra5S36GxyLytXAW6G3FuWj59TqpU9g03mDb8PDWW5DJqOs2vrz3wlSRi6yh9IHcHHKprCs55kO"

}


export default axios.create({
    baseURL: "https://ttken01.pythonanywhere.com"
    // baseURL: "http://127.0.0.1:8000"
})



