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