baseUrl = 'https://api.spotify.com'
version = '/v1/'
authUrl = 'https://accounts.spotify.com/api/'

class MusicObj:
    spotifyId = None

    def __init__(self, trackName, artist, album=None, year=None):
        self.trackName = trackName
        self.artist = artist
        self.album = album
        self.year = year # ?

    def __str__(self):
        printable = 'TRK: {track}; ATS: {artist};'.format(track=self.trackName, artist=self.artist)
        if self.album is not None:
            printable = printable + ' ALB: {album};'.format(album=self.album)
        if self.year is not None:
            printable = printable + ' Y: {year};'.format(year=self.year)
        return printable

    def __repr__(self):
        printable = 'TRK: {track}; ATS: {artist};'.format(track=self.trackName, artist=self.artist)
        if self.album is not None:
            printable = printable + ' ALB: {album};'.format(album=self.album)
        if self.year is not None:
            printable = printable + ' Y: {year};'.format(year=self.year)
        return printable        

def SpotifyBaseUrlAssembler(resource: str, params: list(str)=[], offset: int=None, limit: int=None):
    return (baseUrl
            + version    
            + resource
            + ''.join(params)
            +  '&offset={o}'.format(o=offset) if offset is not None else ''
            +  '&limit={l}'.format(l=limit) if limit is not None else '')

def AddScopes(scopes: list(str)):
    return  '&scope=' + ' '.join(scopes)

def SpotifyAuthUrlAssembler(resource: str, params=[]):
    return (authUrl
            + resource
            + ''.join(params))

def SpotifyFindQueryStringParser(**kwargs):
    qsParams = []
    type = 'track'
    queryString = ''
    endpointBaseUrl = 'search?q='

    if 'artist' in kwargs:
        qsParam = 'artist:"{a}"'.format(a=kwargs['artist'])
        qsParams.append(qsParam)
    if 'album' in kwargs:
        qsParam = 'album:"{a}"'.format(a=kwargs['album'])
        qsParams.append(qsParam)
    if 'year' in kwargs:
        qsParam = 'year:"{a}"'.format(a=kwargs['year'])
        qsParams.append(qsParam)
    if 'track' in kwargs:
        qsParam = 'track:"{a}"'.format(a=kwargs['track'])
        qsParams.append(qsParam)
    
    qsParamCount = len(qsParams)
    if qsParamCount > 0:
        queryString = (
            qsParams[0] if qsParamCount == 1 
            else qsParams[0] + '&'.join(qsParams[1:]))
    
    queryString = SpotifyFindQuerySanitizeRegexp(queryString)
    return '{e}{q}&type={t}&market=US'.format(t=type, e=endpointBaseUrl, q=queryString) if queryString else None

def SpotifyFindQuerySanitizeRegexp(query: str):
    return query.replace(' ', '%20')

CreatePlaylistPublicScope = 'playlist-modify-public'
CreatePlaylistPrivateScope = 'playlist-modify-private'
    