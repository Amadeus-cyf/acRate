import json
import requests
import pandas as pd
import numpy as np
import bs4

def getAnime(year, season):
    headers = {
        'Content-Type': 'application/json',
    }
    api_url = ' https://api.jikan.moe/v3/season/' + year + '/' + season
    response = requests.get(api_url, headers = headers)
    if response.status_code == 200:
        content = json.loads(response.content.decode('utf-8'))
        for anime in content['anime']:
            anime['anime_id'] = anime.pop('mal_id')
            anime.pop('score')
            anime.pop('members')
            anime['year'] = year
            anime['season'] = season
            if (anime['continuing'] == True):
                anime['continuing'] = 'true'
            else:
                anime['continuing'] = 'false'
            if (len(anime['producers']) > 0):
                producers = []
                for producer in anime['producers']:
                    producers.append(producer['name'])
            anime['producers'] = producers
            if (len(anime['genres']) > 0):
                genres = []
                for genre in anime['genres']:
                    genres.append(genre['name'])
            anime['genres'] = genres  
        return content['anime']
    else:
        return None

def postAnime(year, season):
    bangumiList = getAnime(year, season)
    if (bangumiList ==  None):
        return
    database_url = 'http://localhost:4000/api/bangumi'
    for bangumi in bangumiList:
        if (bangumi['r18'] or bangumi['kids']):
            continue
        bangumi.pop('r18')
        bangumi.pop('kids')
        requests.post(database_url, bangumi)

    
def main():
    seasons = ['spring', 'summer', 'fall', 'winter']
    #2019 winter, spring
    #2018 winter, fall, summer, spring
    #2017 winter fall summer, spring
    #2016 winter, fall, summer, spring
    #2015 winter, fall, summer, spring
    #2014 winter, fall, summer, spring
    #2013 winter, fall, summer, spring
    #2012 winter, fall, summer, spring
    #2011 winter, fall, summer,spring
    #2010 winter, fall, summer, spring
    #2009 winter, fall, summer, spring
    #2008 winter, fall, summer, spring
    #2007 winter, fall，summer, spring
    postAnime('2007', 'spring')

if __name__ == '__main__':
    main()