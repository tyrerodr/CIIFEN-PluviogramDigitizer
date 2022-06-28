from marshmallow import fields

from ...ext import ma


class ProductoSchema(ma.Schema):
    codigo_barra = fields.String(dump_only=True)
    codigo_local = fields.String()
    detalle = fields.String()
    cant = fields.Integer()
    precio = fields.Float()
    porcentaje_ganancia = fields.Float()
    grupo_id = fields.Integer()


class GrupoSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    nombre = fields.String()
    #productos = fields.Nested('ProductoSchema', many=True)


class DocumentoSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    hora = fields.Time()
    subtotal = fields.Float()
    desc = fields.Float()
    cliente_id = fields.String()
    jornada_id = fields.Integer()


class PersonaSchema(ma.Schema):
    cedula = fields.String(dump_only=True)
    ruc = fields.String()
    nombre = fields.String()
    direccion = fields.String()
    telefono = fields.String()


class JorandaSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    fecha_inicio = fields.DateTime()
    fecha_fin = fields.DateTime()
    activa = fields.Boolean()
    id_usuario = fields.String()
    documentos = fields.Nested('DocuemntosSchema', many=True)


class UsuarioSchema(ma.Schema):
    username = fields.String(dump_only=True)
    clave = fields.Integer()
    persona_id = fields.String()
    rol = fields.Integer()


class RolSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    nombre = fields.String()
    usuarion = fields.Nested('UsuarioSchema', many=True)


class OrdenCompraSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    costo_transporte = fields.Float()
    costo_seguro = fields.Float()
    observacion = fields.String()
    proveedor_id = fields.Integer()
    documento_id = fields.Integer()
    productos = fields.Nested('DetalleOrdenSchema', many=True)


class ProveedorSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    razon_social = fields.String()
    costo_transporte = fields.Float()
    datos_contacto = fields.String()


class DetalleOrdenSchema(ma.Schema):
    id = fields.Integer(dump_only= True)
    cant = fields.Integer()
    precio = fields.Float()
    desc = fields.Float()
    entregado = fields.Boolean()
    producto_id = fields.String()
    orden_de_compra= fields.Integer()


class TipoSchema(ma.Schema):
    id = fields.Integer(dump_only= True)
    nombre = fields.String()
    ventas = fields.Nested('Venta',many=True)


class VentaSchema(ma.Schema):
    id = fields.Integer(dump_only= True)
    tipo = fields.Integer()
    documento = fields.Integer()
    productos = fields.Nested('DetalleVentaSchema', many=True)


class DetalleVentaSchema(ma.Schema):
    id = fields.Integer()
    cant = fields.Integer()
    precio = fields.Float()
    desc = fields.Float()
    venta = fields.Integer()
    producto = fields.String()
