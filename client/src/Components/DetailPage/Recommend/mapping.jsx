// function used to get the highest total score for recommendation 
function mapping(userList, map) {
    userList.forEach(user => {
        user.scoreAnime.forEach(anime => {
            if(map[anime.anime_id]) {
                map[anime.anime_id].score += anime.score;
            } else {
                map[anime.anime_id] = {
                    anime_id: anime.anime_id,
                    image_url: anime.image_url,
                    score: anime.score,
                    title: anime.title,
                }
            }
        })
    }) 
    let ids = Object.keys(map);
    ids = ids.sort(function (first, second) {
        return map[first].score-map[second].score;
    })
    if (ids.length > 10) {
        ids = ids.slice(0, 10);
    }
    return ids;
}

export default mapping;