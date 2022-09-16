import digitalizacion
from flask_mysqldb import MySQL
import digitalizacion
import json,os
from datetime import time,datetime
from flask import Flask,request,jsonify,make_response
#from flask_mysqldb import MySQL
#import digitalizacion
from flask_cors import CORS
import mysql.connector
import string
import random
import dataProcesing as dp
import numpy as np

PLU_PATH="pluviograma"
app = Flask(__name__)
CORS(app)
#app.config['MYSQL_HOST'] = 'localhost'
#app.config['MYSQL_USER'] = 'root'
#app.config['MYSQL_PASSWORD'] = ''
#app.config['MYSQL_DB'] = 'prueba'
#app.config['CORS_HEADERS'] = 'Content-Type'
#mysql = MySQL(app)

mydb=mysql.connector.connect(host="localhost",user="root",passwd="",database="prueba")


@app.route('/login')
def obtener_usuarios():	
	cur=mydb.cursor()
	cur.execute('''SELECT * FROM usuario''')
	results= cur.fetchall()
	response = jsonify(results)
	return response

@app.route('/users')
def obtener_users():	
	# mydb=mysql.connector.connect(host="localhost",user="root",passwd="",database="ciifen",auth_plugin='mysql_native_password')
	cur=mydb.cursor()
	cur.execute('''SELECT * FROM users''')
	results= cur.fetchall()
	response = jsonify(results)
	return response


@app.route('/estacion/<id>')
def obtener_estacion(id):	
	# mydb=mysql.connector.connect(host="localhost",user="root",passwd="",database="ciifen",auth_plugin='mysql_native_password')
	cur=mydb.cursor()
	cur.execute('''SELECT * FROM estacion where id_estacion= \"'+id+'\"''')
	results= cur.fetchall()
	response = jsonify(results)
	return response



def timeDeltaToTime(td):
	return time(td.seconds//3600,(td.seconds//60)%60,00)


@app.route('/estacion')
def obtener_estaciones():	
	mydb=mysql.connector.connect(host="localhost",user="root",passwd="",database="ciifen")
	cur=mydb.cursor()
	cur.execute('''SELECT * FROM prueba.estacion''')
	results= cur.fetchall()
	response = jsonify(results)
	return response


@app.route('/users/update/<id>', methods=['POST','GET'])
def update(id):
	data = {'message': 'Done', 'code': 'SUCCESS'}
	if request.method == 'POST':
		# mydb=mysql.connector.connect(host="localhost",user="root",passwd="",database="ciifen",auth_plugin='mysql_native_password')
		cur=mydb.cursor()
		print(id)
		info=request.get_json()
		'''id =request.args['id']'''
		idviejo= info['idviejo']
		nombre =info['nombre']
		print(nombre)
		email =info['email']
		usuario =info['usuario']
		contraseña =info['contraseña']
		estado =info['estado']
		
		cur.execute('UPDATE users SET idusers=\"'+id+'\",nombre=\"'+ nombre+'\",correo=\"'+email+'\",usuario=\"'+usuario+'\",contrasena=\"'+contraseña+'\",estado=\"'+estado+'\" where idusers='+idviejo)
	return make_response(data,201)

@app.route('/digitalizar', methods=['POST','GET'])
def save_band():
	if request.method == 'POST':
		print("Procesando request")
		img= request.get_data()
		#info= request.get_json()
		#name= info['nombre']
		name=request.args['nombre']
		name= name.split()[0]
		#model_id= info['modelo']
		model_id =request.args['modelo']
		try:
			parent= os.getcwd()
			path=os.path.join(parent+"/{}".format(PLU_PATH),name)
			os.mkdir(path)
		except FileExistsError as error:
			print(error)
			return make_response("Nombre ya existe",400)
		with open("{}/{}/img.png".format(PLU_PATH,name),"wb") as  f:
			f.write(img)
		img= digitalizacion.openImg("{}/{}/img.png".format(PLU_PATH,name))
		cur= mydb.cursor()
		cur.execute('SELECT * FROM prueba.modelo where idModelo = {}'.format(model_id))
		model_data=cur.fetchall()[0]
		model={'min_precipitation': model_data[4],
		'max_precipitation' : model_data[5],
		'min_time' : timeDeltaToTime(model_data[2]),
		'max_time' : timeDeltaToTime(model_data[3])}
		data = digitalizacion.digitalization(img,model,datetime(2012,1,1,6,30,0),1)
		if len(data) != 0 :
			dataInInterval=[]
			dataInSchedule=[]
			dp.planifier(data,10,dataInInterval,dataInSchedule)
		else:
			return make_response("No se ha detectado algo para digitalizar",422)
		try:
			path='{}/{}/data.json'.format(PLU_PATH,name)
			with open(path,'w') as f:
				json.dump({'data': digitalizacion.changeRange(data),
					'dataAcumulated':data,'minutes':dataInInterval,'hours':dataInSchedule},f)

			query='''INSERT INTO prueba.pluviograma(modelo,nombre)
							VALUES (%s,%s)'''
			values=(model_id,name)
			cur.execute(query,values)																							
			mydb.commit()
			return make_response("Digitalización exitosa",200)
		except mysql.connector.Error as error:
			print(error)
			return make_response("Error al digitalizar",500)
		finally:
			cur.close()
	return make_response("Error con la petición",400)

@app.route('/pluviograma/<id>')
def get_pluviogram_data(id):
	cur= mydb.cursor()
	try:
		query= "SELECT nombre FROM prueba.pluviograma where idPluviograma= %s"
		print(id)
		values = (id,)
		cur.execute(query,values)
		name= cur.fetchall()[0][0]
		f= open('{}/{}/data.json'.format(PLU_PATH,name))
		dataJson=json.load(f)
		f.close()
		cur.close()
		return make_response(dataJson,200)
	except mysql.connector.Error as error:
		print(error)
		cur.close()
		return make_response("Error interno del servidor",500)
	except IOError as error:
		print(error)
		return make_response("Error interno del servidor",500)
		

if __name__ == '__main__':
	app.run(port=3000, debug=True)