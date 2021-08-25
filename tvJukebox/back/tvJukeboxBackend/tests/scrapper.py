from tvJukeboxBackend.scrapper import ScrapeForMusic, Scrapper, EntityType

category = EntityType.SEASON
entityTimeIndex = 'season'
entityTimeIndexValue = 5
entityIndex = 6
entityFriendlyName = 'Sons of Anarchy'

def TestScrapeForMusic():
    mock = [(6, 'https://tunefind.com/show/sons-of-anarchy/season-5/12178')]
    ret = ScrapeForMusic(mock)
    print(ret)

def TestScrapper():
    Scrapper(category, entityFriendlyName, entityTimeIndexValue, entityIndex)

if __name__ == "__main__":
    TestScrapeForMusic()