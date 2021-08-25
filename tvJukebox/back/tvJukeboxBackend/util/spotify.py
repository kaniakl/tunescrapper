baseUrl = 'https://api.spotify.com'
version = '/v1/'
authUrl = 'https://accounts.spotify.com'

class MusicObj:
    def __init__(self, trackName, artist, album=None, year=None):
        self.trackName = trackName
        self.artist = artist
        self.album = album
        self.year = year # ?

    def __str__(self):
        printable = 'TRK: {track}; ATS: {artist};'.format(track=self.trackName, artist=self.artist)
        if self.album is not None:
            printable = printable + ' ALB: {album};'.format(album=album)
        if self.year is not None:
            printable = printable + ' Y: {year};'.format(year=year)
        return printable

    def __repr__(self):
        printable = 'TRK: {track}; ATS: {artist};'.format(track=self.trackName, artist=self.artist)
        if self.album is not None:
            printable = printable + ' ALB: {album};'.format(album=album)
        if self.year is not None:
            printable = printable + ' Y: {year};'.format(year=year)
        return printable

def SpotifyBaseUrlAssembler(resource, params=[], offset=None, limit=None):
    return (baseUrl
            + version    
            + resource
            + ''.join(params)
            +  '&offset={o}'.format(o=offset) if offset is not None else ''
            +  '&limit={l}'.format(l=limit) if limit is not None else '')

def SpotifyAuthUrlAssembler(resource, params=[]):
    return (authUrl
            + resource
            + ''.join(params)) 