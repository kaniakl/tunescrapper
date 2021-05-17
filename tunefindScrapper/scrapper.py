import re
from bs4 import BeautifulSoup
from httpFuncs import SeasonEpisQueryUrl, SeasonEpisQueryUrlPattern, RequestHandler
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
        if result[1] not in indexes:
            indexes.append(result[1])
    return indexes



def Scrapper(entityType, entityName, season):

    # step 1: definicao do "o que" para scrapar (entityType)
    # step 1.1: definir o tipo (seriado, filme, etc) (entityType)
    # step 1.2: nome da entidade, season (se tiver) (entityName, entitySeason)

    # step 2: achar o indice (link direto para o conteudo)
    if (entityType is EntityType.SEASON):
        indexes = ScrapSeasonIndexes(entityName, season)

    # step 3: para cada indice scrapar o(s) link(s) do spotify
    # step 3.1: chegar em um link parecido com isso: https://tunefind.com/forward/song/{index_musica}?store=spotify&referrer={idzao}&x={idzinho}&y={id}
    # step 3.1.1: descobrir o que eh cada id
    # step 3.1.2: referrer (talvez nao precisa desse):
    # step 3.1.3: x ??? (obrigatorio)
    # step 3.1.4: y ??? (obrigatorio)
    for index in indexes:


    # step 4: montar o request de redirect para obter a musica no open.spotify.com

    # step 5: span de requests de redirect /shrug

    # step 6: printar/guardar (ending 1)

    # step 6: tentar montar a lista no spotify codando (ending secreta)

    pass

def TestScrapper():
    Scrapper(category, entityFriendlyName, entityTimeIndexValue)