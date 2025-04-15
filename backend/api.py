from flask import request, jsonify
from flask import current_app as app
from flask_jwt_extended import create_access_token, jwt_required, get_jwt
from datetime import datetime
from algo import check_similarity


from datetime import timedelta
from models import *


def get_info(token):
    return (token["user_type"], token["sub"])



@app.route('/student_login',methods=["POST"])
def student_login():
    data=request.get_json()
    email=data["student_email"]
    password=data["student_password"]
    student=Students.query.get(email)
    if student:
        if password==student.student_password:
            expiration_time = timedelta(hours=3)
            access_token={"access_token":create_access_token(identity=email, additional_claims={"user_type":"student"}, expires_delta=expiration_time), 'name':student.student_name}
            return jsonify(access_token), 200
        return {"Unauthorized":"Wrong Password"}, 401
    return {"Unauthorized":"User does not exist"}, 401

@app.route("/student_register", methods=["POST"])
def student_register():
    data=request.get_json()
    email=data["student_email"]
    name=data["student_name"]
    password=data["student_password"]
    if Students.query.get(email):
        return {"error":"student already exists"}, 422
    else:
        db.session.add(Students(student_name=name, student_email=email, student_password=password))
        db.session.commit()
        expiration_time = timedelta(hours=3)
        access_token={"access_token":create_access_token(identity=email, additional_claims={"user_type":"student"}, expires_delta=expiration_time), "name":name}
        return jsonify(access_token), 200










@app.route('/admin_login',methods=["POST"])
def admin_login():
    data=request.get_json()
    email=data["admin_email"]
    password=data["admin_password"]
    admin=Admins.query.get(email)
    if admin:
        if password==admin.admin_password:
            expiration_time = timedelta(hours=3)
            access_token={"access_token":create_access_token(identity=email, additional_claims={"user_type":"admin"}, expires_delta=expiration_time), 'name':admin.admin_name}
            return jsonify(access_token), 200
        return {"Unauthorized":"Wrong Password"}, 401
    return {"Unauthorized":"User does not exist"}, 401




@app.route("/get_questions", methods=["GET"])
@jwt_required()
def get_questions():
    type, logged_libr=get_info(get_jwt())
    if type!="admin":
        return jsonify({"error":"Login as admin to access this"}), 401
    questions=[i.get_json() for i in Questions.query.all()]
    return {"questions":questions}, 200

@app.route("/check", methods=["POST"])
@jwt_required()
def check_answer():
    data=request.get_json()
    question_id=data["question_id"]
    model_answer=Questions.query.get(question_id).model_answer
    student_answer=data["student_answer"]
    print(student_answer, model_answer)
    score = int(check_similarity(student_answer, model_answer)["Perfect"] * 100)
    return {"score":score}, 200

@app.route("/model_answer", methods=["POST"])
@jwt_required()
def model_answer():
    type, logged_libr=get_info(get_jwt())
    if type!="admin":
        return jsonify({"error":"Login as admin to access this"}), 401
    data=request.get_json()
    model_answer=data["model_answer"]
    quest=data["question"]
    print("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",quest,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",)
    question_obj=Questions(question=quest, model_answer=model_answer)
    try:
        db.session.add(question_obj)
        db.session.commit()
    except:
        return {"error":"question already exists"}, 409
    return {"message":"OK"}, 200

