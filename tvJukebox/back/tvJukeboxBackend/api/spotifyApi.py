from tvJukeboxBackend.util.http import HttpVerbs, RequestHandler, CreateSession

def ConvertToSpotifyMusic(tracks):
    """Do necessary conversions to the tracks in order to get what is needed to form a playlist.

    Keyword arguments:
    tracks -- List with the tracks scrapped
    """
    ret = []
    if not isinstance(tracks, list):
        return ret
    
    # Step 1: query for the music on spotify (try to use a batch query)
    # Step 2: make sure its the same (how?)
    # Step 3: get its href and/or id
    pass

