from flask import Flask, request
from flask_restx import Api, Resource

app = Flask(__name__)
api = Api(app)


@api.route('/login')
class Login(Resource):
    def post(self):
        id = request.json.get('id')
        pw = request.json.get('pw')
        if id == 'id' and pw == 'pw':
            return {"token": "This is Token"}
        else:
            return None


if __name__ == "__main__":
    app.run()
