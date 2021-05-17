import requests

baseURL = 'tunefind.com'

def ParseName(name):
    return name.lower().replace(' ', '-')

def RequestHandler(url):
    result = requests.get(url)

    if (result.status_code > 400):
        return None
    else:
       return result.content 

def RedirectSpotifyUrlAssembler():
    pass

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
