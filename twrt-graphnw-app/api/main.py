from typing import Optional
from enum import Enum
from shutil import rmtree
import os
import json

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ['https://lufergonn.com', 'https://lufergonn.github.io']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_headers=['*']
)

class TypeRT(str, Enum):
    user = 'user'
    tweet = 'tweet'

@app.get('v1/retweets/{type_rt}/{id}')
def re_main(
    type_rt: TypeRT,
    id: str,
    level: int = Query(1, gt=0, le=3),
    ctexact: Optional[str] = None,
    mention: Optional[str] = None,
    hashtag: Optional[str] = None
):
    # Clone this repository into this directory
    # https://github.com/lufergonn/twitter-nw-graph
    cmd = f'python twitter-nw-graph/main.py -t {type_rt} -v {id} -n {level}'

    if ctexact:
        cmd += f' -x "{ctexact}"'

    if mention:
        cmd += f' -m {mention}'

    if hashtag:
        cmd += f' -g {hashtag}'

    data_dir = './static/data'
    cmd += f' > log.txt'
    
    os.system(cmd)

    data = {'log': open('log.txt', 'r', encoding='utf8').read()}
    if os.path.exists(f'{data_dir}/arychart.json'):
        data['arychart'] = json.load(open(f'{data_dir}/arychart.json', 'r', encoding='utf8'))
        rmtree(data_dir)

    return data
