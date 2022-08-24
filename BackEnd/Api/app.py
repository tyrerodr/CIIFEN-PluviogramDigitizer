from flask import Flask,request,jsonify
from flask_mysqldb import MySQL
import digitalizacion
import json
from datetime import time
from flask_cors import CORS,cross_origin
import mysql.connector


app = Flask(__name__)
CORS(app)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'prueba'
app.config['CORS_HEADERS'] = 'Content-Type'
conn = MySQL(app)


@app.route('/login')
def obtener_usuarios():	
	mydb=mysql.connector.connect(host="localhost",user="root",passwd="",database="ciifen")
	cur=mydb.cursor()
	cur.execute('''SELECT * FROM ciifen.usuario''')
	results= cur.fetchall()
	response = jsonify(results)
	return response



def timeDeltaToTime(td):
	return time(td.seconds//3600,(td.seconds//60)%60,00)

@app.route('/digitalizar', methods=['POST','GET'])
def save_band():
	if request.method == 'POST':
		print("Procesando request")
		img= request.get_data()
		
		#model_id =request.args['model']
		model_id= 1
		with open("pluviogramas/img1.png","wb") as  f:
			f.write(img)
		img= digitalizacion.openImg('pluviogramas/img1.png')
		cur= conn.connection.cursor()
		cur.execute('SELECT * FROM modelo where idModelo = {}'.format(model_id))
		model_data=cur.fetchall()[0]
		model={'min_precipitation': model_data[4],
		'max_precipitation' : model_data[5],
		'min_time' : timeDeltaToTime(model_data[2]),
		'max_time' : timeDeltaToTime(model_data[3])}
		cur.execute('INSERT INTO pluviograma(modelo) values ({})'.format(model_id))
		conn.connection.commit()
		cur.execute('SELECT idPluviograma FROM pluviograma ')
		pluviogram_id= cur.fetchall()[-1]
		for value in digitalizacion.digitalization(img,model):
			cur.execute('INSERT INTO dato(precipitacion,hora,pluviogramaid) values ({},"{}",{})'.format(value[2]
																								,str(value[3]),pluviogram_id[0]))
		conn.connection.commit()
		return "Ingresado"
	return "Error"

if __name__ == '__main__':
	app.run(port=5000, debug=True)