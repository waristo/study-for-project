"""
Collect all available unique internal URLs from a website using asyncio,
and save them to a file.
Note: downloadable URLs are processed in a more time-consuming,
but safer manner (by reading the request's headers). For much faster
performance, recognition by a URL extension may be used, but
it is less safe.
"""
from aiohttp import ClientSession
from contextlib import suppress
from urllib.parse import urljoin, urlparse
import aiofiles
import argparse
import asyncio
import bs4
import time


class SiteMap:
    """
    Build a site map by using async requests and selecting unique
    internal URLs.
    """

    def __init__(self, site_url: str):
        self.base_url = site_url.rstrip('/')
        self.queue = asyncio.Queue()
        self.map = set()

    def _is_valid_url(self, url: str) -> bool:
        """ Make sure is URL is an internal web page. """
        if '#' in url:
            return False
        if not url.startswith(self.base_url):
            return False
        return True

    def _url_shortener(self, url: str) -> str:
        parsed_object = urlparse(url)
        short_url = parsed_object.path
        return short_url

    async def _url_processor(self, session: ClientSession):
        """
        Process the enqueued URLs, enqueue the newly found valid
        URLs, and app the results to the map. If URLs is a downloadable,
        just add it to the map without trying to process it.
        """
        while not self.queue.empty():
            parent_url = await self.queue.get()

            # Request a webpage from a URL
            try:
                response = await session.request(method='GET', url=parent_url)
                response.raise_for_status()
            except:
                continue

            # Recognize a downloadable, add to the map, and continue.
            # Downloadable URLs can be tossed aside by extension
            # recognition, but it less safe than using the response
            # headers. This is way is more time-consuming, though
            try:
                if response.headers['content-type'].startswith('application/'):
                    self.map.add(parent_url)
                    continue
            except KeyError:
                continue

            # Extract html from the response
            try:
                html = await response.text()
            except:
                continue

            # Parse the extracted html for eligible URLs
            soup = bs4.BeautifulSoup(html, 'html.parser')
            for ref in soup.findAll('a', href=True):  # parse for URLs
                full_url = urljoin(self.base_url,
                                   ref['href'].strip().rstrip('/'))

                if not self._is_valid_url(full_url):
                    continue

                # if a URL has not been enmapped to the results,
                # schedule it for processing
                if full_url not in self.map:
                    self.map.add(full_url)
                    await self.queue.put(full_url)
                else:
                    continue

    async def build_site_map(self):
        """
        Using an aiohttp session, enqueue the base URL and trigger
        processing.
        """
        async with ClientSession() as session:
            await self.queue.put(self.base_url)
            await self._url_processor(session)
        return self.map


async def main(url: str):
    """ Run the code. """
    mapper = SiteMap(url)
    site_map = await mapper.build_site_map()
    return site_map


def crawl(url):
    site_map = asyncio.run(main(url))
    return site_map
    #site_map = sorted(list(site_map))
