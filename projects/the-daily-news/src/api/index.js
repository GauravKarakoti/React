import axios from "axios";

const URL_SERV = "/api/the-daily-news";
export const getPosts = async (prevState, page=1 , order="asc", limit=10) => {
    try {
        const sortParam = order === "desc" ? "-id" : "id";
        // http://localhost:3004/posts?_page=1&_limit=6&_order=desc&_sort=id
        const response = await axios.get(`${URL_SERV}/posts?_page=${page}&_per_page=${limit}&_sort=${sortParam}`);
        
        console.log("Server response:", response.data);

        let newPosts = [];
        if (Array.isArray(response.data)) {
            newPosts = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
            newPosts = response.data.data;
        }

        const prevPosts = Array.isArray(prevState.posts) ? prevState.posts : [];

        return {
            posts: [...prevPosts, ...newPosts],
            page: page,
            end: newPosts.length === 0 ? true : false
        }
    } catch(error) {
        throw error;
    }
}
export const addNewsletter = async(data) => {
    try {
        const findUser = await axios.get(`${URL_SERV}/newsletter?email=${data.email}`);
        if(Array.isArray(findUser.data) && !findUser.data.length) {
            // add user
            const response = await axios({
                method: 'POST',
                url: `${URL_SERV}/newsletter`,
                data: {
                    email: data.email
                }
            });
            return {
                newsletter: "added",
                email: response.data
            }
        } else {
            // already on the db
            return {
                newsletter: "failed"
            }
        }
    } catch(error) {
        throw error;
    }
}
export const getPostById = async(id) => {
    try {
        const response = await axios.get(`${URL_SERV}/posts/${id}`);
        return response.data;
    } catch(error) {
        return '404';
    }
}
export const sendMessage = async(data) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${URL_SERV}/contact`,
            data: data
        });
        return true;
    } catch(error) {
        return false;
    }
}