from tvJukeboxBackend.api.spotifyApi import ConvertToSpotifyMusic
from tvJukeboxBackend.util.spotify import MusicObj

def TestConvertToSpotifyMusic():
    mock = [
        MusicObj(r'Mañana, Mañana (Music from the TV Show "Sons of Anarchy")',
                r'Gene Casey & the Lone Sharks'),
        MusicObj(r'It\'s a Small World (Cover)',
                r'MusicBox'),
        MusicObj(r'Weight',
                r'The Howls'),
        MusicObj(r'With Our Love',
                r'Paul Rodgers'),
        MusicObj(r'Go Easy',
                r'Lucero'),
        MusicObj(r'Cold Blues',
                r'Quaker City Night Hawks'),
    ]

    res = ConvertToSpotifyMusic(mock)
    print(res)
