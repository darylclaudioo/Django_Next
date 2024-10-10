import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime, timezone
import re

def scrape_jobstreet(keyword):
    url = f"https://id.jobstreet.com/{keyword}-jobs"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    script = soup.find('script', text=lambda t: t and 'window.SEEK_REDUX_DATA' in t)
    if not script:
        raise ValueError("Could not find job data in the page")
    
    # Use regex to extract the JSON data
    match = re.search(r'window\.SEEK_REDUX_DATA\s*=\s*({.*?});', script.string, re.DOTALL)
    if not match:
        raise ValueError("Could not extract JSON data from script")
    
    json_text = match.group(1)
    data = json.loads(json_text)
    
    jobs = data.get('results', {}).get('results', {}).get('jobs', [])
    
    scraped_jobs = []
    for job in jobs[:30]:  # Get only the 30 newest jobs
        scraped_job = {
            'title': job.get('title', ''),
            'teaser': job.get('teaser', ''),
            'company_name': job.get('companyName', ''),
            'location': job.get('location', ''),
            'work_type': job.get('workType', ''),
            'salary': job.get('salary', ''),
            'role': job.get('roleId', ''),
            'keyword': keyword,
            'listing_date': datetime.strptime(job.get('listingDate', ''), "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc).date(),
            'bullet_points': '\n'.join(job.get('bulletPoints', []))
        }
        scraped_jobs.append(scraped_job)
    
    return scraped_jobs