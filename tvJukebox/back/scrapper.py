import re
from bs4 import BeautifulSoup
from httpFuncs import RequestHandler
from tunefindApi import SeasonEpisQueryUrl, SeasonEpisQueryUrlPattern
from enum import Enum

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

category = 'show'
entityTimeIndex = 'season'
entityTimeIndexValue = 1
entityIndex = 123456
entityFriendlyName = 'Sons of Anarchy'

def ScrapSeasonIndexes(seriesName, season):
    url = SeasonEpisQueryUrl(seriesName, season)
    pattern = SeasonEpisQueryUrlPattern(seriesName, season)
    content = RequestHandler(url)
    soup = BeautifulSoup(content, features="html5lib")
    pattern = pattern + '/'
    indexes = []
    for link in soup.find_all('a', {'href': re.compile(pattern)}):
        href = link.get("href")
        regex = r'\{pattern}(\d+)'.format(pattern=pattern)
        result = re.match(regex, href)
        if not result and result.group(1) is None:
            continue
        linkName = link.contents[0]
        resultEpiNumber = re.match(r'E\d', linkName)
        epiNumber = None
        if resultEpiNumber and resultEpiNumber.group(1) is not None:
            epiNumber = resultEpiNumber[1]
        if result[1] not in indexes:
            indexes.append((epiNumber, result[1]))
    return indexes

def ScrapeForMusic(epiNumberIndexList):
    musicList
    pass
# returns: [(epiNumber, [MusicObj, MusicObj, MusicObj, [...] ]), [...]]

def Scrapper(entityType, entityName, season, episode):

    # ### WebPage scrapping
    # step 1: definition of "what" to scrap (entityType)
    # step 1.1: define the entity type (series, movie, etc) (entityType)
    # step 1.2: name of the entity and season (if any) (entityName, entitySeason)

    # step 2: find the index (direct link to the web page to be scrapped for content)
    if (entityType is EntityType.SEASON):
        epiNumbersAndIndexes = ScrapSeasonIndexes(entityName, season)

    # step 2.1: match the epi number with the index to allow querying by episode number
    # step 2.1 (optional): by name?
    if episode is not None:
        epiNumberIndex = [tupl for tupl in epiNumbersAndIndexes if tupl[0] == episode]
        epiNumbersAndIndexes = [epiNumberIndex]

    # step 3: with the page(s) in hands, obtain music info !

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

def TestScrapper():
    Scrapper(category, entityFriendlyName, entityTimeIndexValue)