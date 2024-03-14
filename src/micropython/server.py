from flask import Flask, request

app = Flask(__name__)

conf = None

@app.route('/manda', methods=['POST'])
def manda():
    global conf
    conf = request.get_json()
    return "OK"


@app.route('/recebe')
def recebe():
    return conf

app.run(host="0.0.0.0", port="5000")