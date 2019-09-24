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
        airing_start = bangumi['airing_start']
        if (bangumi['airing_start'] is None) {
            
        }
        bangumi.clear()
        bangumi['anime_id'] = anime_id
        bangumi['title'] = title
        bangumi['image_url'] = image_url
        bangumi['synopsis'] = synopsis
        bangumi['airing_start'] = airing_start
        requests.post(database_url, bangumi)

def main():                        
    ## some examples for using postAnimeList
    postAnimeList('2019', 'fall')
    postAnimeList('2019', 'summer')
    postAnimeList('2019', 'winter')
        
if __name__ == '__main__':
    main()