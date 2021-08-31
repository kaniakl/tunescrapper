import base64
import json
from tvJukeboxBackend.util.http import HttpVerbs, RequestHandler, CreateSession, HeaderBearerToken
from tvJukeboxBackend.util.spotify import SpotifyBaseUrlAssembler, SpotifyFindQueryStringParser, SpotifyAuthUrlAssembler, MusicObj

class SpotifyApi:

    httpSession = None

    def CreateSpotifyServerSession(clientId: str, clientSecret: str):
        encoded = base64.b64encode('{c}:{s}'.format(c=clientId, s=clientSecret))
        body = { 'grant_type': 'client_credentials' }
        authHeader = HeaderBearerToken(encoded)
        tempSession = CreateSession(authHeader, body)
        isAuth = RequestHandler(HttpVerbs.POST, SpotifyAuthUrlAssembler('token'), tempSession, json.dumps(body)))

        if isAuth:
            httpSession = tempSession

    def FindMusic(trackName: str, artist: str, album: str=None, year: str=None):

        queryParams = {}
        if trackName is not None:
            queryParams['track'] = trackName
        if trackName is not None:
            queryParams['artist'] = artist
        if trackName is not None:
            queryParams['album'] = album
        if trackName is not None:
            queryParams['year'] = year

        queryString = SpotifyFindQueryStringParser(queryParams)
        query = SpotifyBaseUrlAssembler(queryString)
        content = RequestHandler(HttpVerbs.GET, query, httpSession)
        trackResponse = ConvertToSearchTrackResponse(json.loads(content))
        return trackResponse

    def ConvertToSearchTrackResponse(jsonResponse):
        response = SearchResponseModel(**jsonResponse)
        response.items = TrackResponseObject(**json.loads(response.items))
        for item in response.items:
            item.external_urls = ExternalUrlResponseObject(**json.loads(item.external_urls))
    
        return response


class SearchResponseModel:

    def __init__(self, href, items, limit, next, offset, previous, total):
        self.href = href
        self.items = items
        self.limit = limit
        self.next = next
        self.offset = offset
        self.previous = previous
        self.total = total
    
class TrackResponseObject:

    def __init__(self, id, href, external_urls, name, uri):
        self.id = id
        self.href = href
        self.external_urls = external_urls
        self.name = name
        self.uri = uri

class ExternalUrlResponseObject:

    def __init__(self, spotify):
        self.spotify = spotify

def ConvertToSpotifyMusic(tracks: list[MusicObj], spotifyApi: SpotifyApi):
    """Do necessary conversions to the tracks in order to get what is needed to form a playlist.

    Keyword arguments:
    tracks -- List with the tracks scrapped
    spotifyApi -- spotifyApi Object to control requests and response
    """
    ret = []
    if not isinstance(tracks, list):
        return ret
    
    for music in tracks:
        spotifyMusic = spotifyApi.FindMusic(music.trackName, music.artist, music.album, music.year)
        
    
    # Step 1: query for the music on spotify (try to use a batch query)
    # Step 2: make sure its the same (how?)
    # Step 3: get its href and/or id
    pass
