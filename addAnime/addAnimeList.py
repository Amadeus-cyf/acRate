import json
import requests
import pandas as pd
import bs4

def getAnimeList(year, season):
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

def getSingleAnimeAiring(id):
    headers = {
        'Content-Type': 'application-json',
    }
    api_url = 'https://api.jikan.moe/v3/anime/' + str(id)
    response = requests.get(api_url, headers = headers)
    if response.status_code == 200:
        content = json.loads(response.content.decode('utf-8'))
        return content['aired']['from']
    else:
        return None

def postAnimeList(year, season):
    bangumilist = getAnimeList(year, season)
    if bangumilist == None:
        return
    database_url = 'http://localhost:4000/api/bangumiList'
    for bangumi in bangumilist:
        if bangumi['r18'] or bangumi['kids']:
            continue
        anime_id = bangumi['mal_id']
        title = bangumi['title']
        image_url = bangumi['image_url']
        synopsis = bangumi['synopsis']
        if 'airing_start' in bangumi:
            airing_start = bangumi['airing_start']
        else:
            airing_start = getSingleAnimeAiring(anime_id)
        bangumi.clear()
        bangumi['anime_id'] = anime_id
        bangumi['title'] = title
        bangumi['image_url'] = image_url
        bangumi['synopsis'] = synopsis
        bangumi['airing_start'] = airing_start
        requests.post(database_url, bangumi)

def main():                        
    ## some examples for using postAnimeList
    postAnimeList('2020', 'spring')
    #seasons = ['winter', 'spring', 'summer', 'fall']
    #year = 2018
    #while year >= 2005:
    #    for season in seasons:
    #        postAnimeList(str(year), season)
    #    year -= 1
                
if __name__ == '__main__':
    main()