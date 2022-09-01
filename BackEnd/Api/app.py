from flask_mysqldb import MySQL
import digitalizacion
import json
from datetime import time
from flask import Flask,request,jsonify,make_response
#from flask_mysqldb import MySQL
#import digitalizacion
from flask_cors import CORS
import mysql.connector


app = Flask(__name__)
CORS(app)
# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = ''
# app.config['MYSQL_DB'] = 'prueba'
# mysql = MySQL(app)

mydb=mysql.connector.connect(host="localhost",user="root",passwd="",database="ciifen",auth_plugin='mysql_native_password')



@app.route('/login')
def obtener_usuarios():	
	cur=mydb.cursor()
	cur.execute('''SELECT * FROM ciifen.usuario''')
	results= cur.fetchall()
	response = jsonify(results)
	return response

def timeDeltaToTime(td):
	return time(td.seconds//3600,(td.seconds//60)%60,00)

@app.route('/users')
def obtener_users():	
	# mydb=mysql.connector.connect(host="localhost",user="root",passwd="",database="ciifen",auth_plugin='mysql_native_password')
	cur=mydb.cursor()
	cur.execute('''SELECT * FROM ciifen.users''')
	results= cur.fetchall()
	response = jsonify(results)
	return response


@app.route('/estacion/<id>')
def obtener_estacion(id):	
	# mydb=mysql.connector.connect(host="localhost",user="root",passwd="",database="ciifen",auth_plugin='mysql_native_password')
	cur=mydb.cursor()
	cur.execute("SELECT * FROM ciifen.estacion where id_estacion=\'"+id+"\'")
	results= cur.fetchall()
	response = jsonify(results)
	return response

@app.route('/estacion/pluviograma/<id>')
def obtener_pluviograma(id):	
	# mydb=mysql.connector.connect(host="localhost",user="root",passwd="",database="ciifen",auth_plugin='mysql_native_password')
	cur=mydb.cursor()
	cur.execute("SELECT * FROM ciifen.pluviograma where id_estacion=\'"+id+"\'")
	results= cur.fetchall()
	response = jsonify(results)
	return response


@app.route('/pluviograma/<id>')
def obtener_pluviogramas(id):	
	# mydb=mysql.connector.connect(host="localhost",user="root",passwd="",database="ciifen",auth_plugin='mysql_native_password')
	cur=mydb.cursor()
	cur.execute("SELECT * FROM ciifen.pluviograma where id_pluviograma=\'"+id+"\'")
	results= cur.fetchall()
	response = jsonify(results)
	return response


@app.route('/estacion')
def obtener_estaciones():	
	# mydb=mysql.connector.connect(host="localhost",user="root",passwd="",database="ciifen",auth_plugin='mysql_native_password')
	cur=mydb.cursor()
	cur.execute('''SELECT * FROM ciifen.estacion''')
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

'''@app.route('/digitalizar', methods=['POST','GET'])
def save_band():
	if request.method == 'POST':
		print("Procesando request")
		img= request.get_data()
		model_id =request.args['model']
		with open("pluviogramas/img1.png","wb") as  f:
			f.write(img)
		img= digitalizacion.openImg('pluviogramas/img.png')
		cur= mysql.connection.cursor()
		cur.execute('SELECT * FROM modelo where idModelo = {}'.format(model_id))
		model_data=cur.fetchall()[0]
		model={'min_precipitation': model_data[4],
		'max_precipitation' : model_data[5],
		'min_time' : timeDeltaToTime(model_data[2]),
		'max_time' : timeDeltaToTime(model_data[3])}
		values = digitalizacion.digitalization(img,model)
		cur.execute('INSERT INTO pluviograma(modelo) values ({})'.format(model_id))
		mysql.connection.commit()
		cur.execute('SELECT idPluviograma FROM pluviograma ')
		pluviogram_id= cur.fetchall()[-1]
		for value in values:
			print(pluviogram_id[0])
			cur.execute('INSERT INTO dato(precipitacion,hora,pluviogramaid) values ({},"{}",{})'.format(value[1],str(value[0]),pluviogram_id[0]))
		mysql.connection.commit()
		return "Ingresado"
	return "Error"'''


if __name__ == '__main__':
	app.run(port=3000, debug=True)