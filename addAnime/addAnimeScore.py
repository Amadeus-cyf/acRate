import json;
import requests;
import pandas as pd
import bs4

def getAnimeScore(year, season):
    headers = {
        'Content-Type': 'application-json',
    }
    api_url = 'https://api.jikan.moe/v3/season/' + year + '/' + season
    response = requests.get(api_url, headers = headers)
    if response.status_code == 200:
        content = json.loads(response.content.decode('utf-8'))
        return content['anime']
    else:
        return None

def postAnimeScore(year, season):
    bangumiLists = getAnimeScore(year, season)
    if bangumiLists ==  None:
        return
    database_url = 'http://localhost:4000/api/bangumiScore'
    for bangumi in bangumiLists:
        if (bangumi['r18'] or bangumi['kids']):
            continue
        anime_id = bangumi['mal_id']
        bangumi.clear()
        bangumi['anime_id'] = anime_id
        requests.post(database_url, bangumi)

def main():
    postAnimeScore('2019', 'summer')
    postAnimeScore('2019', 'spring')
    postAnimeScore('2019', 'winter')
    seasons = ['winter', 'spring', 'summer', 'fall']
    year = 2018
    while year >= 2005:
        for season in seasons:
            postAnimeScore(str(year), season)
        year -= 1

if __name__ == '__main__':
    main()