import re
from sanitizer import ParseName

baseURL = 'https://tunefind.com'

def EntityUrlAssembler(category, entityFriendlyName, **kwargs):
    entityName = ParseName(entityFriendlyName)
    seasonIndex = kwargs.get('seasonIndex', None)
    seasonNumber = kwargs.get('seasonNumber', None)
    url = '{baseUrl}/{category}/'.format(baseUrl=baseURL, category=category)
    if 'show' not in category:
        return url + entityName
    else:
        return url + '{name}/season-{seasonNumber}/{index}'.format(
            name=entityName,
            seasonNumber=seasonNumber,
            index=seasonIndex)

def SeasonsQueryUrlPattern(entityFriendlyName):
    entityName = ParseName(entityFriendlyName)
    return '/show/{name}'.format(name=entityName)

def SeasonsQueryUrl(entityName):
    return '{baseUrl}'.format(baseUrl=baseURL) + SeasonsQueryUrlPattern(entityName)

def SeasonEpisQueryUrlPattern(entityFriendlyName, seasonNumber):
    return SeasonsQueryUrlPattern(entityFriendlyName) + '/season-{index}'.format(index=seasonNumber)

def SeasonEpisQueryUrl(entityFriendlyName, seasonNumber):
    return '{baseUrl}'.format(baseUrl=baseURL) +  SeasonEpisQueryUrlPattern(entityFriendlyName, seasonNumber)

def RegexpSeasonURL(urlPattern):
    return r'\{pattern}(\d+)(.*)'.format(pattern=urlPattern)

RegexpEpiNumber = r'(.*)E(\d+)'

RegexpSpotifyDisabled = re.compile('StoreLinks_spotify.*StoreLinks_disabled__.*')

RegexpSongContainer = re.compile('SongRow_container__.*')

RegexpSongTitle = re.compile('SongTitle_link__')

RegexpSongArtist = re.compile('/artist/')

