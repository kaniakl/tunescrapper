import argparse
from scrapper import Scrapper, EntityType, ScrapperParams, ConvertToEnumEntityType


def InteractiveMenuHeader():
    return r"""
  _______                _____                                        ___   ___   ___ ___  
 |__   __|              / ____|                                      |__ \ / _ \ / _ \__ \ 
    | |_   _ _ __   ___| (___   ___ _ __ __ _ _ __  _ __   ___ _ __     ) | | | | | | | ) |
    | | | | | '_ \ / _ \\___ \ / __| '__/ _` | '_ \| '_ \ / _ \ '__|   / /| | | | | | |/ / 
    | | |_| | | | |  __/____) | (__| | | (_| | |_) | |_) |  __/ |     / /_| |_| | |_| / /_ 
    |_|\__,_|_| |_|\___|_____/ \___|_|  \__,_| .__/| .__/ \___|_|    |____|\___/ \___/____|
                                             | |   | |                                     
                                             |_|   |_|                                     

    Extraindo tunes de conteudos para o spotify since 2002.


    """

def InteractiveMenuType():
    typeInput = input("""

    Qual o tipo de conteudo quer extrair a musica?
    - [S]eries, [S]eriados ou [S]eries
    - [G]ames ou [J]ogos
    - [M]ovies ou [F]ilmes

    """).lower()

    if 's' in typeInput:
        type = 'season'
    elif 'g' in typeInput or 'j' in typeInput:
        type = 'game'
    elif 'm' in typeInput or 'f' in typeInput:
        type = 'movie'
    else:
        type = None
        print('Opcao invalida !')
    return type

def InteractiveMenuEntityName():
    return input('Informe o nome do conteudo (serie, jogo, filme) para extrair: ')

def InteractiveMenuSeason():
    season = None
    inputSeason = input('Informe a temporada (season) da serie: ')
    try:
        season = int(inputSeason)
    except ValueError:
        print('oo digita um numero ai vei')
    return season



def Interactive():

    type = None
    season = None
    entityName = None

    print(InteractiveMenuHeader())

    while not type:
        type = InteractiveMenuType()

    while not entityName:
        entityName = InteractiveMenuEntityName()

    if 'season' in type:
        while not season:
            season = InteractiveMenuSeason()

    return ScrapperParams(entityType=type, name=entityName, season=season)


def Main():
    parser = argparse.ArgumentParser(description='Scrapper do site tunefind para obter as musicas no spotify.')
    parser.add_argument('--interactive', help='usar versao interativa do programa',
        action='store_const', const=Interactive)
    parser.add_argument('-t', help='tipo do conteudo', type=str, choices=['series', 'jogos', 'filmes'])
    parser.add_argument('-n', help='nome do conteudo', type=str)
    parser.add_argument('-s', help='season da serie (opcional, 0 por padrao)', type=int, default=0)

    args = parser.parse_args()
    if args.t is None and args.n is None:
        parser.exit(status=1, message='O nome e o tipo do conteudo sao obrigatorios')

    scrapperParams = ScrapperParams(entityType=args.t, name=args.n, season=args.s)
    if args.interactive is not None:
        scrapperParams = args.interactive()
    Scrapper(ConvertToEnumEntityType(scrapperParams.type), scrapperParams.name, scrapperParams.season)

if __name__ == "__main__":
    Main()
