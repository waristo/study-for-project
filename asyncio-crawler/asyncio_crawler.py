import asyncio
import time
import requests
from bs4 import BeautifulSoup
from queue import Queue, Empty
from urllib.parse import urljoin, urlparse


class AsyncScraper:

    def __init__(self, base_url):

        self.base_url = base_url
        self.root_url = '{}://{}'.format(urlparse(self.base_url).scheme, urlparse(self.base_url).netloc)
        self.scraped_pages = set([])
        self.to_crawl = Queue()
        self.to_crawl.put(self.base_url)

    async def parse_links(self, html):
        soup = BeautifulSoup(html, 'html.parser')
        links = soup.find_all('a', href=True)
        for link in links:
            url = link['href']
            if url.startswith('/') or url.startswith(self.root_url):
                url = urljoin(self.root_url, url)
                if url not in self.scraped_pages:
                    self.to_crawl.put(url)

    async def scrape_info(self, html):
        return

    async def post_scrape_callback(self, res):
        if res and res.status_code == 200:
            self.parse_links(res.text)
            self.scrape_info(res.text)

    async def scrape_page(self, url):
        try:
            res = requests.get(url, timeout=(3, 30))
            return res
        except requests.RequestException:
            return

    async def loop(self, target_url):
        if target_url not in self.scraped_pages:
            print("Scraping URL: {}".format(target_url))
            self.scraped_pages.add(target_url)
            res = self.scrape_page(target_url)
            self.post_scrape_callback(res)

    async def run_scraper(self):
        while True:
            try:
                target_url = self.to_crawl.get(timeout=30)
                await self.loop(target_url)
            except Empty:
                return
            except Exception as e:
                print(e)
                continue


if __name__ == '__main__':
    s = AsyncScraper("https://www.naver.com/")
    start = time.time()
    asyncio.run(s.run_scraper())
    print(time.time()-start)