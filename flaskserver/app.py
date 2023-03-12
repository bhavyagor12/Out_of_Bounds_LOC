from flask import Flask, jsonify
from marketbasketanalysis import marketbasketanalysis
import aiohttp
import asyncio
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/support/<count>')
def support(count):
    print(count)
    data = marketbasketanalysis(count)
    # jsonify(data)
    return data


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(app.run(debug=True))
