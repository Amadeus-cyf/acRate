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
    if (bangumiLists ==  None):
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
    #2019 winter, spring
    #2018 fall, summer, spring, winter
    #2017 fall， summer, spring, winter
    #2016 fall, summer, spring, winter
    ##2015 not posted to database
    postAnimeScore('2015', 'fall')
    postAnimeScore('2015', 'summer')
    
    

if __name__ == '__main__':
    main()
