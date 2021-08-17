import re
from bs4 import BeautifulSoup
from httpFuncs import RequestHandler
from tunefindApi import SeasonEpisQueryUrl, SeasonEpisQueryUrlPattern, RegexpSeasonURL, RegexpEpiNumber, RegexpSpotifyDisabled, RegexpSongDiv
from enum import Enum
from spotify import MusicObj

class EntityType(Enum):
    UNKNOWN = -1
    SEASON = 1
    GAME = 2
    MOVIE = 3

class ScrapperParams:
    def __init__(self, entityType, name, season):
        self.type = entityType
        self.name = name
        self.season = season

def ConvertToEnumEntityType(typeName):
    switch = typeName.lower()
    if 's' in switch:
        return EntityType.SEASON
    elif 'g' in switch or 'j' in switch:
        return EntityType.GAME
    elif 'm' in switch or 'f' in switch:
        return EntityType.MOVIE
    else:
        return EntityType.UNKNOWN

# returns [(epiNumber, hrefToEpi), (epiNumber, hrefToEpi), [...]]
def ScrapSeasonIndexes(seriesName, season):
    url = SeasonEpisQueryUrl(seriesName, season)
    pattern = SeasonEpisQueryUrlPattern(seriesName, season)
    content = RequestHandler(url)
    soup = BeautifulSoup(content, features="html5lib")
    pattern = pattern + '/'
    indexes = []
    for link in soup.find_all('a', {'href': re.compile(pattern)}):
        href = link.get("href")
        regexp = RegexpSeasonURL(pattern)
        regexpResult = re.match(regexp, href)
        if not regexpResult and regexpResult.group(1) is None:
            continue
        if regexpResult.group(2) != '':
            continue
        linkName = link.contents[0]
        regexp = RegexpEpiNumber
        resultEpiNumber = re.match(regexp, linkName)
        epiNumber = None
        if resultEpiNumber and resultEpiNumber.group(2) is not None:
            epiNumber = int(resultEpiNumber[2])
        if regexpResult[1] not in indexes:
            indexes.append((epiNumber, url + '/' + regexpResult[1]))
    return indexes

# expects: [(epiNumber, hrefToEpi), (epiNumber, hrefToEpi), [...]]
# returns: [(epiNumber, [MusicObj, MusicObj, MusicObj, [...] ]), [...]]
def ScrapeForMusic(epiNumberIndexList):

    # ### Music scrapping
    # step 1: filter which tracks are available on spotify
    # step 2: get relevant info to query for them (MusicObj)!

    for EpiNumAndHref in epiNumberIndexList:
        # trottle this (?)
        content = RequestHandler(EpiNumAndHref[1])
        soup = BeautifulSoup(content, features="html5lib")
        musicContainers = soup.find_all('div', { 'class': RegexpSongDiv })
        print(len(musicContainers))
        musicContainers = [
            m for m in musicContainers 
            if m.find('span', { 'class': RegexpSpotifyDisabled }) is None
        ]
        print(len(musicContainers))


def Scrapper(entityType, entityName, season, episode):

    # ### WebPage scrapping
    # step 1: definition of "what" to scrap (entityType)
    # step 1.1: define the entity type (series, movie, etc) (entityType)
    # step 1.2: name of the entity and season (if any) (entityName, entitySeason)

    # step 2: find the index (direct link to the web page to be scrapped for content)
    epiNumbersAndIndexes = []
    if entityType is EntityType.SEASON:
        epiNumbersAndIndexes = ScrapSeasonIndexes(entityName, season)
    elif entityType is EntityType.GAME:
        pass
    elif entityType is EntityType.MOVIE:
        pass

    # step 2.1: match the epi number with the index to allow querying by episode number
    # step 2.1 (optional): by name?
    if episode is not None:
        epiNumberAndIndex = [tupl for tupl in epiNumbersAndIndexes if tupl[0] == episode]
        epiNumbersAndIndexes = epiNumberAndIndex
    # step 3: with the link(s) to the page(s) in hands, obtain music info !

    # step 3.1: get a list with all music in the html(s)
    ScrapeForMusic(epiNumbersAndIndexes)
    # step 3.1.1: find and filter by which ones are available on spotify (search for the icon)
    # step 3.1.2: get relevant info that helps to pinpoint the search later on (artist, album, etc)
    # step 3.1.3: sanitize info (is it required? in which scenarios its required?) 

    # ### spotify
    # step 4 multiverse 1: GET da music ! (obs1: we are searching for links here) (obs2: try not to span spotify)

    # step 5 multiverse 1: create the playlist !
    # step 5.1 multiverse 1: see if needs authentication, and if it does ask here. SAVE THE AUTH ON THE APP TO NOT SPAM THE USER WITH ANNOYANCE !
    # step 5.2 multiverse 1 (optional ending): "print" information regarding the music to be saved.

    # step 4 multiverse 2: try to directly create the playlist with the -sanitized- info from step 3
    # step 4.1 multiverse 2: see if needs authentication, and if it does ask here. SAVE THE AUTH ON THE APP TO NOT SPAM THE USER WITH ANNOYANCE !
    # step 4.2 multiverse 2 (optional ending): "print" information regarding the music to be saved.

category = EntityType.SEASON
entityTimeIndex = 'season'
entityTimeIndexValue = 5
entityIndex = 6
entityFriendlyName = 'Sons of Anarchy'

def TestScrapper():
    Scrapper(category, entityFriendlyName, entityTimeIndexValue, entityIndex)

if __name__ == "__main__":
    TestScrapper()