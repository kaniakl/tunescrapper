from setuptools import setup, find_packages

setup(
    name='tvJukebox',
    version='0.0.1',
    packages=find_packages(),
    package_dir={'tvJukeboxBackend': 'tvJukeboxBackend'},
    install_requires=[
        'beautifulsoup4',
        'requests',
        'flask',
        'html5lib',
        'setuptools',
    ],
)