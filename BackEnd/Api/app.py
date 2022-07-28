<<<<<<< HEAD
from flask import Flask,request
from flask_mysqldb import MySQL
import digitalizacion
import json
from datetime import time

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'prueba'
mysql = MySQL(app)

def timeDeltaToTime(td):
	return time(td.seconds//3600,(td.seconds//60)%60,00)



@app.route('/digitalizar', methods=['POST','GET'])
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
	return "Error"
=======
from flask import Flask,request,jsonify
#from flask_mysqldb import MySQL
#import digitalizacion
from flask_cors import CORS
import mysql.connector


app = Flask(__name__)
CORS(app)
# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = 'root'
# app.config['MYSQL_DB'] = 'ciifen'


@app.route('/login')
def obtener_usuarios():	
	mydb=mysql.connector.connect(host="localhost",user="root",passwd="root",database="ciifen",auth_plugin='mysql_native_password')
	cur=mydb.cursor()
	cur.execute('''SELECT * FROM ciifen.usuario''')
	results= cur.fetchall()
	response = jsonify(results)
	return response

#mysql = MySQL(app)

# @app.route('/digitalizar', methods=['POST','GET'])
# def save_band():
# 	if request.method == 'POST':
# 		img= request.get_data()
# 		modelo =request.args.get('modelo')
# 		with open("pluviogramas/img.png","wb") as  f:
# 			f.write(img)
# 		img= digitalizacion.openImg('pluviogramas/img.png')
# 		img = digitalizacion.showImg(img)
# 		return request.get_data()
# 	return "holis"



>>>>>>> main

if __name__ == '__main__':
	app.run(port=3000, debug=True)