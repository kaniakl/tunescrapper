import requests
from enum import Enum

class HttpVerbs(Enum):
    GET = 'GET'
    POST = 'POST'
    PUT = 'PUT'
    DELETE = 'DELETE'
    OPTIONS = 'OPTIONS'
    PATCH = 'PATCH'

def RequestHandler(verb, assembledUrl, session=None, body=None):
    if verb == HttpVerbs.GET:
        return Get(assembledUrl, session)
    elif verb == HttpVerbs.POST:
        return Post(assembledUrl, body, session)
    elif verb == HttpVerbs.PUT:
        return Put(assembledUrl, body, session)
    elif verb == HttpVerbs.DELETE:
        return Delete(assembledUrl, session)
    elif verb == HttpVerbs.OPTIONS:
        return Options(assembledUrl, session)
    elif verb == HttpVerbs.PATCH:
        return Patch(assembledUrl, session)
    
def ResponseHandler(response):
    if (response.status_code > 400):
        return None
    else:
       return response.content

def ResponseWrapper(httpFunc):
    def wrapper(*args, **kwargs):
        response = httpFunc(*args, **kwargs)
        return ResponseHandler(response)
    return wrapper

@ResponseWrapper
def Get(url, session=None):
    if session is not None:
        return session.get(url)
    return requests.get(url)

@ResponseWrapper
def Post(url, data, session=None):
    if session is not None:
        return session.post(url)
    return requests.post(url, data)

@ResponseWrapper
def Put(url, data, session=None):
    if session is not None:
        return session.put(url)
    return requests.put(url, data)

@ResponseWrapper
def Delete(url, session=None):
    if session is not None:
        return session.delete(url)
    return requests.delete(url)

@ResponseWrapper
def Options(url, session=None):
    if session is not None:
        return session.options(url)
    return requests.options(url)

@ResponseWrapper
def Patch(url, session=None):
    if session is not None:
        return session.patch(url)
    return requests.patch(url)



