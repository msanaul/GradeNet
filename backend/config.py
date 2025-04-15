from flask import current_app as app
import os



basedir = os.path.abspath(os.path.dirname(__file__))

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(basedir, "database_files/cma_db.db")
app.config["JWT_SECRET_KEY"]="supersecretkey"