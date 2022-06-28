from flask import Flask,request
from flask_mysqldb import MySQL
import digitalizacion

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'ciifen'
mysql = MySQL(app)

@app.route('/digitalizar', methods=['POST','GET'])
def save_band():
	if request.method == 'POST':
		img= request.get_data()
		modelo =request.args.get('modelo')
		with open("pluviogramas/img.png","wb") as  f:
			f.write(img)
		img= digitalizacion.openImg('pluviogramas/img.png')
		img = digitalizacion.showImg(img)
		return request.get_data()
	return "holis"

if __name__ == '__main__':
	app.run(port=3000, debug=True)