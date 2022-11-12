import json
import os
import requests
from time import sleep
from configparser import ConfigParser
from urllib.parse import quote

def main(filename):
    with open(filename, 'r', encoding="utf8") as f:
        data = json.load(f)
        for player in data['players']:
            for account in player['accounts']:
                if (account['puuid'] == ""):
                    info_puuid, info_profileicon = getInfo(account['region'], account['name'])
                    account['puuid'] = info_puuid
                    account['profileIcon'] = info_profileicon
                    sleep(0.03)

    os.remove(filename)
    with open(filename, 'w', encoding='utf8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

def getInfo(region, summonerName):
    global url, req
    useUrl = url.format(region, quote(summonerName))
    r = req.get(useUrl)

    if (r.status_code == 200):
        accInfo = r.json()
        print('200: ', summonerName, accInfo['puuid'], accInfo['profileIconId'])
        return (accInfo['puuid'], accInfo['profileIconId'])
    else:
        print("{}: {}".format(r.status_code, summonerName))
    
    return ('', 29)

if __name__ == "__main__":
    url = 'https://{}.api.riotgames.com/lol/summoner/v4/summoners/by-name/{}'
    file = '../src/data/players/lck.json'

    config = ConfigParser()
    config.read('../config.ini')
    ORIGIN = config.get('API', 'ORIGIN')
    API_KEY = config.get('API', 'API_KEY')

    req = requests.Session()
    req.headers.update({
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": ORIGIN,
        "X-Riot-Token": API_KEY
    })

    main(file)