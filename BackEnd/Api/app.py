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




if __name__ == '__main__':
	app.run(port=3000, debug=True)