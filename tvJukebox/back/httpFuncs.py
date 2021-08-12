import requests

def RequestHandler(url):
    result = requests.get(url)

    if (result.status_code > 400):
        return None
    else:
       return result.content 



