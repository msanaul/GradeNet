from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from database import db
import os
app=Flask(__name__)
app.app_context().push()
basedir = os.path.abspath(os.path.dirname(__file__))

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(basedir, "database_files/cma_db.db")
app.config["JWT_SECRET_KEY"]="supersecretkey"
db.init_app(app)

CORS(app)
jwt=JWTManager(app)
app.app_context().push()


from api import *


if __name__=="__main__":
    app.run(port=8080, debug=False, host="localhost")