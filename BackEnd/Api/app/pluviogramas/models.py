from ..db import db, BaseModelMixin


class Producto(db.Model, BaseModelMixin):
	codigo_barra = db.Column(db.String(12), primary_key=True)
	codigo_local = db.Column(db.String(5), unique=True)
	detalle = db.Column(db.String(100), unique=True)
	cant = db.Column(db.Integer, nullable=False)
	precio = db.Column(db.Float, nullable=False)
	porcentaje_ganancia = db.Column(db.Float, server_default='0')
	grupo_id = db.Column(db.Integer, db.ForeignKey('grupo.id'))

	def __init__(self, codigo_barra, codigo_local, detalle, cant, precio, porcentaje_ganancia, grupo_id):
		self.codigo_barra = codigo_barra
		self.codigo_local = codigo_local
		self.detalle = detalle
		self.cant = cant
		self.precio = precio
		self.porcentaje_ganancia = porcentaje_ganancia
		self.grupo_id = grupo_id

	def __repr__(self):
		return f'Producto({self.detalle})'

	def __str__(self):
		return f'{self.detalle}'


class Grupo(db.Model, BaseModelMixin):
	id = db.Column(db.Integer, primary_key=True)
	nombre = db.Column(db.VARCHAR(length=50), nullable=False, unique=True)
	productos = db.relationship('Producto', backref='grupo', lazy=False, cascade='all, delete-orphan')

	def __init__(self, nombre):
		self.nombre = nombre


class Documento(db.Model, BaseModelMixin):
	id = db.Column(db.Integer, primary_key=True)
	hora = db.Column(db.Time, nullable=False)
	subtotal = db.Column(db.Float, nullable=False)
	desc = db.Column(db.Float, server_default='0')
	cliente_id = db.Column(db.String(10), db.ForeignKey('persona.cedula'))
	jornada_id = db.Column(db.Integer, db.ForeignKey('jornada.id'))

	def __init__(self, hora, subtotal, desc, cliente_id, jornada_id):
		self.hora = hora
		self.subtotal = subtotal
		self.desc = desc
		self.cliente_id = cliente_id
		self.jornada_id = jornada_id


class Persona(db.Model, BaseModelMixin):
	cedula = db.Column(db.String(10), primary_key=True)
	ruc = db.Column(db.String(13))
	nombre = db. Column(db.VARCHAR(length=50))
	direccion = db.Column(db.VARCHAR(length=100))
	telefono = db.Column(db.String(10))

	def __init__(self, cedula, ruc, nombre, direccion, telefono):
		self.cedula = cedula
		self.ruc = ruc
		self.nombre = nombre
		self.direccion = direccion
		self.telefono = telefono


class Jornada(db.Model, BaseModelMixin):
	id = db.Column(db.Integer, primary_key=True)
	fecha_inicio = db.Column(db.DateTime, nullable=False)
	fecha_fin = db.Column(db.DateTime, nullable=False)
	activa = db.Column(db.Boolean, nullable=False)
	id_usuario = db.Column(db.VARCHAR(length=50), db.ForeignKey('usuario.username'))
	documentos = db.relationship('Documento', backref='jornada')

	def __init__(self, fecha_inicio, id_usuario):
		self.fecha_inicio = fecha_inicio
		#self.fecha_fin = fecha_fin
		self.activa = True
		self.id_usuario = id_usuario
		#self.documentos = documentos


class Usuario(db.Model, BaseModelMixin):
	username = db.Column(db.VARCHAR(length=50), primary_key=True)
	clave = db.Column(db.VARCHAR(length=12), primary_key=True)
	persona_id = db.Column(db.String(10), db.ForeignKey('persona.cedula'))
	rol = db.Column(db.Integer, db.ForeignKey('rol.id'))

	def __init__(self, username, clave, persona_id, rol):
		self.username = username
		self.clave = clave
		self.persona_id = persona_id
		self.rol = rol


class Rol(db.Model, BaseModelMixin):
	id = db.Column(db.Integer, primary_key=True)
	nombre = db.Column(db.VARCHAR(length=15))
	usuarios = db.relationship('Usuario', backref='rol_usuario', lazy='select')

	def __init__(self, nombre):
		self.nombre = nombre
	


class Orden_compra(db.Model, BaseModelMixin):
	id = db.Column(db.Integer, primary_key=True)
	costo_transporte = db.Column(db.Float, nullable=False)
	costo_seguro = db.Column(db.Float, nullable=False)
	observacion = db.Column(db.VARCHAR(300), nullable=True)
	proveedor_id = db.Column(db.Integer, db.ForeignKey('proveedor.id'))
	documento_id = db.Column(db.Integer, db.ForeignKey('documento.id'))
	productos = db.relationship('DetalleOrden', backref='ordenCompra', lazy='select', cascade='all, delete-orphan')

	def __init__(self, costro_transporte, costro_seguro, observacion, proovedor_id, documento_id):
		self.costo_transporte = costro_transporte
		self.costo_seguro = costro_seguro
		self.observacion = observacion
		self.proveedor_id = proovedor_id
		self. documento_id = documento_id
		self.productos = []


class Proveedor(db.Model, BaseModelMixin):
	id = db.Column(db.Integer, primary_key=True)
	razon_social = db.Column(db.VARCHAR(100), nullable=False)
	costo_transporte = db.Column(db.Float)
	datos_contacto = db.Column(db.String(10), db.ForeignKey('persona.cedula'))

	def __init__(self, razon_social, costo_transporte, datos_contacto):
		self.razon_social = razon_social
		self.costo_transporte = costo_transporte
		self.datos_contacto = datos_contacto


class DetalleOrden(db.Model, BaseModelMixin):
	id = db.Column(db.Integer, primary_key=True)
	cant = db.Column(db.Integer, nullable=False)
	precio = db.Column(db.Float, nullable=False)
	desc = db.Column(db.Float, server_default='0')
	entregado = db.Column(db.Boolean, nullable=False)
	producto_id = db.Column(db.VARCHAR(length=10), db.ForeignKey('producto.codigo_barra'))
	orden_de_compra = db.Column(db.Integer, db.ForeignKey('orden_compra.id'))

	def __init__(self, cant, precio, desc, producto_id):
		self.cant = cant
		self.precio = precio
		self.desc = desc
		self.entregado = False
		self.producto_id = producto_id



class Tipo(db.Model, BaseModelMixin):
	id = db.Column(db.Integer, primary_key=True)
	nombre = db.Column(db.VARCHAR(length=15), nullable=False)
	ventas = db.relationship('Venta', backref='tipo_venta', lazy='select')

	def __init__(self, nombre):
		self.nombre = nombre
		#self.ventas = ventas


class Venta(db.Model, BaseModelMixin):
	id = db.Column(db.Integer, primary_key=True)
	tipo = db.Column(db.Integer, db.ForeignKey('tipo.id'))
	documento = db.Column(db.Integer, db.ForeignKey('documento.id'))
	productos = db.relationship('Detalle_venta', backref='prodcutos_venta', lazy='select', cascade='all, delete-orphan')

	def __init__(self, tipo, documento):
		self.tipo = tipo
		self.documento = documento
		self.productos = []


class Detalle_venta(db.Model, BaseModelMixin):
	id = db.Column(db.Integer, primary_key=True)
	cant = db.Column(db.Integer, nullable=False)
	precio = db.Column(db.Float, nullable=False)
	desc = db.Column(db.Float, server_default='0')
	venta = db.Column(db.Integer, db.ForeignKey('venta.id'))
	producto = db.Column(db.String(12), db.ForeignKey('producto.codigo_barra'))

	def __init__(self, cant, precio, desc, producto):
		self.cant = cant
		self.precio = precio
		self.desc = desc
		self.producto = producto
