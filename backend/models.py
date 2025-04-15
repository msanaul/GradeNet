from database import db

class Students(db.Model):
    __tablename__="students"
    student_email=db.Column(db.String,primary_key=True)
    student_password=db.Column(db.String , nullable=False)
    student_name=db.Column(db.String, nullable=False)

    def get_json(self):
        return {"student_email": self.student_email, "student_password": self.student_password, "student_name": self.student_name}
    

class Admins(db.Model):
    __tablename__="admins"
    admin_email=db.Column(db.String,primary_key=True)
    admin_password=db.Column(db.String , nullable=False)
    admin_name=db.Column(db.String, nullable=False)

    def get_json(self):
        return {"admin_email": self.admin_email, "admin_password": self.admin_password, "admin_name": self.admin_name}



class Questions(db.Model):
    __tablename__="questions"
    question_id=db.Column(db.Integer, primary_key=True, autoincrement=True)
    question=db.Column(db.String, nullable=False, unique=True)
    model_answer=db.Column(db.String, nullable=False)

    def get_json(self):
        return {"question_id":self.question_id, "question":self.question}
