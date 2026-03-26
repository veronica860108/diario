"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, SuperUser
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from flask_jwt_extended import create_access_token,jwt_required,get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/registro",methods=["POST"])
def register_user():
    data= request.get_json()
    nombre = data.get("nombre")
    password = data.get("password")
    
    if not nombre or not password:
        return jsonify({"error":"todos los campos son requeridos"}),400
    
    exisitin_user=db.session.execute(select(User).where(
        User.email== nombre)).scalar_one_or_none()
    
    if exisitin_user:
        return jsonify({"error":"este usuario ya existe"}),400
    new_user= User(nombre= nombre)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"enhorabuena":"te has registrado correctamente"}),201

@api.route("/login",methods=["POST"])
def login():
    data= request.get_json()
    email = data.get("nombre")
    password = data.get("password")  
   
    if not email or not password:
        return jsonify({"error":"todos los campos son requeridos"}),400
    user=db.session.execute(select(User).where(
        User.email== email)).scalar_one_or_none()
   
    if user is None:
        return jsonify({"msg":"correo o password invalido"}),400
   
    if user.check_password(password):
        access_token= create_access_token(identity=str(user.id))
        return jsonify({"msg":"login esxitoso","token":access_token}),200
    else:
        return jsonify({"msg":"correo o password invalido"}),400
