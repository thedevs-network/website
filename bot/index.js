const axios = require('axios');
const groups = require('./groups.json');

const requestCount = (token, id) => {
    return axios.get(`https://api.telegram.org/bot${token}/getChatMembersCount?chat_id=${id}`);
}

module.exports = (token) => {
    return new Promise((resolve, reject) => {
        const groupWithCounts = groups.map(async group => {
            const { displayName, name, id, link } = group;
            const count = await requestCount(token, group.id);
            return {
                displayName,
                id,
                name,
                link,
                count: count.data.result
            }
        })
        Promise.all(groupWithCounts)
            .then(result => resolve(result));
    });
}