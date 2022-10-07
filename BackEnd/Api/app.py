from ast import parse
from pickle import DEFAULT_PROTOCOL
import digitalizacion
from flask_mysqldb import MySQL
import digitalizacion
import json
import os
from datetime import time, datetime
from flask import Flask, request, jsonify, make_response
# from flask_mysqldb import MySQL
# import digitalizacion
from flask_cors import CORS
import mysql.connector
import string
import random
import dataProcesing as dp
import numpy as np
import matplotlib.pyplot as plt

PLU_PATH = "pluviograma"
app = Flask(__name__)
CORS(app)
# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = ''
# app.config['MYSQL_DB'] = 'prueba'
# mysql = MySQL(app)


def idpluviograma(station, fecha):
    # length_of_string = 8
    año, mes, dia = fecha.split("-")
    return 'PUVLI' + station + año[2:] + mes + dia
    # .join(random.choice(string.ascii_letters + string.digits) for _ in range(length_of_string))


@app.route('/login')	
def get_login():
    mydb = mysql.connector.connect(
        host="localhost", user="root", passwd="", database="ciifen",auth_plugin='mysql_native_password')
    cur = mydb.cursor()
    cur.execute('''SELECT * FROM ciifen.usuario''')
    results = cur.fetchall()
    response = jsonify(results)
    mydb.close()
    return response


def timeDeltaToTime(td):
    return time(td.seconds//3600, (td.seconds//60) % 60, 00)


@app.route('/users')
def get_users():
    mydb = mysql.connector.connect(
        host="localhost", user="root", passwd="", database="ciifen", auth_plugin='mysql_native_password')

    cur = mydb.cursor()
    cur.execute('''SELECT * FROM ciifen.usuario''')
    results = cur.fetchall()
    response = jsonify(results)
    mydb.close()
    return response


@app.route('/station/<id>')
def get_station(id):
    mydb = mysql.connector.connect(
        host="localhost", user="root", passwd="", database="ciifen", auth_plugin='mysql_native_password')
    cur = mydb.cursor()
    cur.execute("SELECT * FROM ciifen.estacion where id_estacion=\'"+id+"\'")
    results = cur.fetchall()
    response = jsonify(results)
    mydb.close()
    return response


@app.route('/station/pluviogram/<id>')
def get_pluviograma(id):
    mydb = mysql.connector.connect(
        host="localhost", user="root", passwd="", database="ciifen", auth_plugin='mysql_native_password')
    cur = mydb.cursor()
    cur.execute("SELECT * FROM ciifen.pluviograma where id_estacion=\'"+id+"\'")
    results = cur.fetchall()
    response = jsonify(results)
    mydb.close()
    return response


@app.route('/pluviogram/<id>')
def get_pluviogramaId(id):
    mydb = mysql.connector.connect(
        host="localhost", user="root", passwd="", database="ciifen", auth_plugin='mysql_native_password')
    cur = mydb.cursor()
    cur.execute(
        "SELECT * FROM ciifen.pluviograma where id_pluviograma=\'"+id+"\'")
    results = cur.fetchall()
    response = jsonify(results)
    mydb.close()
    return response


def timeDeltaToTime(td):
    return time(td.seconds//3600, (td.seconds//60) % 60, 00)


@app.route('/stations')
def get_stations():
    mydb = mysql.connector.connect(
        host="localhost", user="root", passwd="", database="ciifen", auth_plugin='mysql_native_password')
    cur = mydb.cursor()
    cur.execute('''SELECT * FROM ciifen.estacion''')
    results = cur.fetchall()
    response = jsonify(results)
    mydb.close()
    return response


@app.route('/modelPluviograms')
def get_pluviogramasModelo():
    mydb = mysql.connector.connect(
        host="localhost", user="root", passwd="", database="ciifen", auth_plugin='mysql_native_password')
    cur = mydb.cursor()
    cur.execute('''SELECT nombre FROM modelo''')
    results = cur.fetchall()
    response = jsonify(results)
    mydb.close()
    return response


@app.route('/pluviogram/insert', methods=['POST', 'GET'])
def savePluviograma():
    data = {'message': 'Done', 'code': 'SUCCESS'}
    if request.method == 'POST':
        mydb = mysql.connector.connect(
            host="localhost", user="root", passwd="", database="ciifen", auth_plugin='mysql_native_password')
        cur = mydb.cursor()
        info = request.get_json()
        image = info['image']
        link = info['link']
        startDate = info['endDate']
        endDate = info['startDate']
        station = info['station']
        model = info['modelo']
        cur.execute('INSERT INTO ciifen.pluviograma values(\"'+idpluviograma(station, endDate)+'\",DEFAULT,\' ' + endDate +
                    '\',\' ' + startDate+' \',curdate(),\"'+model+'\",\"'+link+'\",1,\"' + station+'\",1);')
        mydb.commit()
    mydb.close()
    return make_response(data, 201)


@app.route('/users/update/<id>', methods=['POST', 'GET'])
def update(id):
    data = {'message': 'Done', 'code': 'SUCCESS'}
    if request.method == 'POST':
        mydb = mysql.connector.connect(
            host="localhost", user="root", passwd="", database="ciifen", auth_plugin='mysql_native_password')
        cur = mydb.cursor()
        info = request.get_json()
        '''id =request.args['id']'''
        idviejo = info['idviejo']
        name = info['name']
        print(name)
        email = info['email']
        user = info['user']
        status = info['status']
        if status == "activo":
            status = '1'
        else:
            status = '0'
        tipo = info['type']
        print(idviejo)
        if (info['password'] != "*********"):
            contraseña = info['password']
            cur.execute('UPDATE ciifen.usuario SET id_usuario=\"'+id+'\",nombre=\"' + name+'\",correo=\"'+email+'\",usuario=\"'+user +
                        '\",contraseña=md5(\"'+contraseña+'\"),estado=\"'+status+'\",tipo_usuario=\"'+tipo+'\" where id_usuario='+idviejo)
        else:
            cur.execute('UPDATE ciifen.usuario SET id_usuario=\"'+id+'\",nombre=\"' + name+'\",correo=\"'+email+'\",usuario=\"'+user +
                    '\",estado=\"'+status+'\",tipo_usuario=\"'+tipo+'\" where id_usuario='+idviejo)

        mydb.commit()
    mydb.close()
    return make_response(data, 201)


@app.route('/users/delete', methods=['POST', 'GET'])
def eliminar():
    mydb = mysql.connector.connect(
        host="localhost", user="root", passwd="", database="ciifen", auth_plugin='mysql_native_password')
    data = {'message': 'Done', 'code': 'SUCCESS'}
    if request.method == 'POST':
        cur = mydb.cursor()
        info = request.get_json()
        '''id =request.args['id']'''
        id = info['id']
        cur.execute('delete from ciifen.usuario where id_usuario='+id+';')
        mydb.commit()
    mydb.close()
    return make_response(data, 201)


@app.route('/users/add', methods=['POST', 'GET'])
def add():
    mydb = mysql.connector.connect(
        host="localhost", user="root", passwd="", database="ciifen", auth_plugin='mysql_native_password')
    data = {'message': 'Done', 'code': 'SUCCESS'}
    if request.method == 'POST':
        cur = mydb.cursor()
        info = request.get_json()
        name = info['name']
        email = info['email']
        user = info['user']
        password = info['password']
        status = info['status']
        if status == "activo":
            status = '1'
        else:
            status = '0'

        tipo = info['type']
        cur.execute('INSERT INTO ciifen.usuario (usuario,correo,contraseña,nombre,tipo_usuario,estado) VALUES (\"' +
                    user+'\",\"'+email+'\",md5(\"'+password+'\"),\"'+name+'\",\"'+tipo+'\",\"'+status+'\");')
        mydb.commit()
    mydb.close()
    return make_response(data, 201)


@app.route('/digitize', methods=['POST', 'GET'])
def save_band():
    mydb = mysql.connector.connect(
        host="localhost", user="root", passwd="", database="ciifen", auth_plugin='mysql_native_password')
    if request.method == 'POST':
            print("Procesando request")
            img = request.get_data()
            # info= request.get_json()
            # name= info['name']
            # name=request.args['name']
            name = idpluviograma(
                request.args['station'], request.args['endDate'])
            
            print(name)
            # model_id= info['modelo']
            model_name = request.args['model']
            try:
                parent = os.getcwd()
                path = os.path.join(parent+"/{}".format(PLU_PATH), name)
                os.mkdir(path)
            except FileExistsError as error:
                print(error)
                # return make_response("Nombre ya existe", 400)
            with open("{}/{}/img.png".format(PLU_PATH, name), "wb") as f:
                f.write(img)
            img = digitalizacion.openImg(
                "{}/{}/img.png".format(PLU_PATH, name))
            cur = mydb.cursor()
            cur.execute(
                'SELECT * FROM modelo where nombre = \"'+ model_name+'\"')
            model_data = cur.fetchall()[0]
            model = {'min_precipitation': model_data[4],
                   'max_precipitation': model_data[5],
                   'min_time': timeDeltaToTime(model_data[2]),
                   'max_time': timeDeltaToTime(model_data[3])}
            data = digitalizacion.digitalization(
                img, model, datetime(2012, 1, 1, 6, 30, 0), 1)
            if len(data) != 0:
                dataInInterval = []
                dataInSchedule = []
                dp.planifier(data, 10, dataInInterval, dataInSchedule)
            else:
                return make_response("No se ha detectado algo para digitalizar", 422)
            try:
                path = '{}/{}/data.json'.format(PLU_PATH, name)
                with open(path, 'w') as f:
                    json.dump({'data': digitalizacion.changeRange(data),
                            'dataAcumulated': data, 'minutes': dataInInterval, 'hours': dataInSchedule}, f, default=str)

                dp.savePlot(data,'{}/{}/acumulatedPlot.png'.format(PLU_PATH,name))
                dp.savePlot(digitalizacion.changeRange(data),'{}/{}/plot.png'.format(PLU_PATH,name))

                info = request.args
                image = info['image']
                link = info['link']
                startDate = info['startDate']
                endDate = info['endDate']
                station = info['station']
                modelo = info['model']
                query= 'INSERT INTO pluviograma values(%s,DEFAULT,%s,%s,curdate(),%s,%s,%s,%s)'
                values = (name,endDate,startDate,modelo,link,1,station)
                # cur.execute('INSERT INTO pluviograma values(\"'+idpluviograma(station, endDate)+'\",DEFAULT,\' ' + endDate +
                #             '\',\' ' + startDate+' \',curdate(),\"'+modelo+'\",\"'+link+'\",1,\"' + station+'\");')
                cur.execute(query,values)
                
                mydb.commit()
                return make_response("Digitalización exitosa", 200)
            except mysql.connector.Error as error:
                print(error)
                return make_response("Error al digitalizar", 500)
            finally:
                cur.close()
    return make_response("Error con la petición", 400)


@app.route('/pluviogramaSeriedetiempo/<id>')
def get_pluviogram_data(id):
    mydb = mysql.connector.connect(host="localhost",user="root",passwd="",database="ciifen",auth_plugin='mysql_native_password')
    cur = mydb.cursor()
    try:
            # query= "SELECT nombre FROM prueba.pluviograma where idPluviograma= %s"
            # print(id)
            # values = (id,)
            # cur.execute(query,values)
            name = id
            f = open('{}/{}/data.json'.format(PLU_PATH,name))
            dataJson = json.load(f)
            f.close()
            cur.close()
            return make_response(dataJson, 200)
    except mysql.connector.Error as error:
            print(error)
            cur.close()
            return make_response("Error interno del servidor", 500)
    except IOError as error:
            print(error)
            return make_response("Error interno del servidor", 500)
    mydb.close()


if __name__ == '__main__':
    app.run(port=3000, debug=True)
