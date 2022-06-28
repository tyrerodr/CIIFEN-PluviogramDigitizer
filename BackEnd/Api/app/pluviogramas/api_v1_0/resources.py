from flask import request, Blueprint
from flask_restful import Api, Resource

from .schemas import *
from ..models import *

sistema_integrado_v1_0_bp = Blueprint('sistema_integrado_v1_0_bp', __name__)
producto_schema = ProductoSchema()

api = Api(sistema_integrado_v1_0_bp)


# -------------------------------------------Producto--------------------------#


class ListaProductoResource(Resource):

    def get(self):
        productos = Producto.get_all()
        result = producto_schema.dump(productos, many=True)
        return result

    def post(self):
        data = request.get_json()
        producto_dict = ProductoSchema().load(data)
        producto = Producto(codigo_barra=producto_dict['codigo_barra'],
                            codigo_local=producto_dict['codigo_local'],
                            detalle=producto_dict['detalle'],
                            cant=producto_dict['cant'],
                            precio=producto_dict['cant'],
                            porcentaje_ganancia=producto_dict['porcentaje_ganancia'],
                            grupo_id=producto_dict['grupo_id'])
        producto.save()
        resp = producto_schema.dump(producto)
        return resp, 201


class CoincidenciaProductosResource(Resource):
    def get(self, codigo):
        result = None
        try:
            productos = Producto.query.filter(Producto.codigo_barra.like('%' + codigo + '%')).all()
            result = producto_schema.dump(productos, many=True)
        except Exception as e:
            print(e)
        return result


class ProductoCodResource(Resource):
    def get(self, identificador):
        producto = Producto.query.filter(Producto.codigo_local.like('%' + identificador + '%')).all()
        resultado = ProductoSchema().dump(producto, many=True)
        return resultado


class ProductoDetResource(Resource):
    def get(self, identificador):
        producto = Producto.query.filter(Producto.detalle.like('%' + identificador + '%')).all()
        resultado = ProductoSchema().dump(producto, many=True)
        return resultado


class ProductoCanResource(Resource):
    def get(self, identificador):
        producto = Producto.query.filter(Producto.cant.like('%' + identificador + '%')).all()
        resultado = ProductoSchema().dump(producto, many=True)
        return resultado


class ProductoPreResource(Resource):
    def get(self, identificador):
        producto = Producto.query.filter(Producto.precio.like('%' + identificador + '%')).all()
        resultado = ProductoSchema().dump(producto, many=True)
        return resultado


class ProductoPorResource(Resource):
    def get(self, identificador):
        producto = Producto.query.filter(Producto.porcentaje_ganancia.like('%' + identificador + '%')).all()
        resultado = ProductoSchema().dump(producto, many=True)
        return resultado


class ProductoGruResource(Resource):
    def get(self, identificador):
        producto = Producto.query.filter(Producto.grupo_id.like('%' + identificador + '%')).all()
        resultado = ProductoSchema().dump(producto, many=True)
        return resultado


# -----------------------------------------------------Grupo---------------------------------------


class ListaGrupoResource(Resource):
    def get(self):
        grupos = Grupo.get_all()
        result = GrupoSchema().dump(grupos, many=True)
        return result

    def post(self):
        data = request.get_json()
        grupo_dict = producto_schema.load(data)
        grupo = Grupo(nombre=grupo_dict['nombre'])
        grupo.save()
        resp = GrupoSchema.dump(grupo)
        return resp, 201


class GrupoResource(Resource):
    def get(self, identificador):
        grupo = Grupo.get_by_id(identificador)
        result = GrupoSchema().dump(grupo)
        return result


class GrupoNomResource(Resource):
    def get(self, identificador):
        grupo = Grupo.query.filter(Grupo.nombre.like('%' + identificador + '%')).all()
        resultado = GrupoSchema().dump(grupo, many=True)
        return resultado


# --------------------------------------------------Documento-----------------------------------

class ListaDocumentoResource(Resource):
    def get(self):
        documento = Documento.get_all()
        resultado = DocumentoSchema().dump(documento)
        return resultado

    def post(self):
        data = request.get_json()
        documento_dict = DocumentoSchema().load(data)
        documento = Documento(hora=documento_dict['hora'],
                              subtotal=documento_dict['subtotal'],
                              desc=documento_dict['desc'],
                              cliente_id=documento_dict['cliente_id'],
                              jornada_id=documento_dict['jornada_id'])
        documento.save()
        resp = DocumentoSchema().dump(documento)
        return resp, 201


class DocumentoResource(Resource):
    def get(self, identificador):
        documento = Documento.get_by_id(identificador)
        result = DocumentoSchema().dump(documento)
        return result


class DocumentoHorResource(Resource):
    def get(self, identificador):
        documento = Documento.query.filter(Documento.hora.like('%' + identificador + '%')).all()
        resultado = DocumentoSchema().dump(documento, many=True)
        return resultado


class DocumentoCliResource(Resource):
    def get(self, identificador):
        documento = Documento.query.filter(Documento.cliente_id.like('%' + identificador + '%')).all()
        resultado = DocumentoSchema().dump(documento, many=True)
        return resultado


class DocumentoJorResource(Resource):
    def get(self, identificador):
        documento = Documento.query.filter(Documento.jornada_id.like('%' + identificador + '%')).all()
        resultado = DocumentoSchema().dump(documento, many=True)
        return resultado


# ---------------------------------------------------Persona-------------------------------------

class ListaPersonaResource(Resource):
    def get(self):
        persona = Persona.get_all()
        resultado = PersonaSchema().dump(persona)
        return resultado

    def post(self):
        data = request.get_json()
        persona_dict = PersonaSchema().load(data)
        persona = Persona(cedula=persona_dict['cedula'],
                          ruc=persona_dict['ruc'],
                          nombre=persona_dict['nombre'],
                          direccion=persona_dict['direccion'],
                          telefono=persona_dict['telefono'])
        persona.save()
        resp = PersonaSchema().dump(persona)
        return resp, 201


class CoincidenciaPersonaResources(Resource):
    def get(self, identificador):
        persona = Persona.query.filter(Persona.cedula.like('%' + identificador + '%')).all()
        resultado = PersonaSchema().dump(persona)
        return resultado


class PersonaResources(Resource):
    def get(self, identificador):
        persona = Persona.get_by_id(identificador)
        resultado = PersonaSchema().dump(persona)
        return resultado


class PersonaRucResource(Resource):
    def get(self, identificador):
        persona = Persona.query.filter(Persona.ruc.like('%' + identificador + '%')).all()
        resultado = PersonaSchema().dump(persona, many=True)
        return resultado


class PersonaNomResource(Resource):
    def get(self, identificador):
        persona = Persona.query.filter(Persona.nombre.like('%' + identificador + '%')).all()
        resultado = PersonaSchema().dump(persona, many=True)
        return resultado


class PersonaDirResource(Resource):
    def get(self, identificador):
        persona = Persona.query.filter(Persona.direccion.like('%' + identificador + '%')).all()
        resultado = PersonaSchema().dump(persona, many=True)
        return resultado


# class ProductoResource(Resource):
#     def get(self, parametro):
#         producto = Producto.query.filter_by(codigo_local=parametro).all()
#         resultado = producto_schema.dump(producto)
#         return resultado

# -------------------------------------------------------Jornada----------------------

class ListaJornadaResource(Resource):
    def get(self):
        jornada = Jornada.get_all()
        resultado = JorandaSchema().dump(jornada)
        return resultado

    def post(self):
        data = request.get_json()
        jornada_dict = JorandaSchema().load(data)
        jornada = Jornada(fecha_inicio=jornada_dict['fecha_inicio'],
                          id_usuario=jornada_dict['id_usuario'],
                          )
        jornada.save()
        resp = JorandaSchema().dump(jornada)
        return resp, 201


class JornadaResources(Resource):
    def get(self, identificador):
        jornada = Jornada.get_by_id(identificador)
        resultado = JorandaSchema().dump(jornada)
        return resultado


class JornadaIniResource(Resource):
    def get(self, identificador):
        jornada = Jornada.query.filter(Jornada.fecha_inicio.like('%' + identificador + '%')).all()
        resultado = JorandaSchema().dump(jornada, many=True)
        return resultado


class JornadaActResource(Resource):
    def get(self, identificador):
        jornada = Jornada.query.filter(Jornada.activa.like('%' + identificador + '%')).all()
        resultado = JorandaSchema().dump(jornada, many=True)
        return resultado


class JornadaUsuResource(Resource):
    def get(self, identificador):
        jornada = Jornada.query.filter(Jornada.id_usuario.like('%' + identificador + '%')).all()
        resultado = JorandaSchema().dump(jornada, many=True)
        return resultado


# -------------------------------------------------------Usuario-----------------------

class ListaUsuarioResource(Resource):
    def get(self):
        usuario = Usuario.get_all()
        resultado = UsuarioSchema().dump(usuario)
        return resultado

    def post(self):
        data = request.get_json()
        usuario_dict = UsuarioSchema().load(data)
        usuario = Usuario(username=usuario_dict['username'],
                          clave=usuario_dict['clave'],
                          persona_id=usuario_dict['persona_id'],
                          rol=usuario_dict['rol']
                          )
        usuario.save()
        resp = UsuarioSchema().dump(usuario)
        return resp, 201


class UsuarioResources(Resource):
    def get(self, identificador):
        usuario = Usuario.get_by_id(identificador)
        resultado = UsuarioSchema().dump(usuario)
        return resultado


class UsuarioRolResources(Resource):
    def get(self, identificador):
        usuario = Usuario.query.filter(Usuario.rol.like('%' + identificador + '%')).all()
        resultado = UsuarioSchema().dump(usuario)
        return resultado


# ------------------------------------------------------- Rol --------------------------------

class RolResources(Resource):
    def get(self, identificador):
        rol = Rol.get_by_id(identificador)
        resultado = RolSchema().dump(rol)
        return resultado

    def post(self):
        data = request.get_json()
        rol_dict = RolSchema().load(data)
        rol = Rol(nombre=rol_dict['nombre']
                  )
        rol.save()
        resp = RolSchema.dump(rol)
        return resp, 201


class RolNomResources(Resource):
    def get(self, identificador):
        rol = Rol.query.filter(Rol.nombre.like('%' + identificador + '%')).all()
        resultado = UsuarioSchema().dump(rol)
        return resultado


# ------------------------------------------------------Orden_Compra---------------

class ListaOrdenResource(Resource):
    def get(self):
        orden_compra = Jornada.get_all()
        resultado = OrdenCompraSchema().dump(orden_compra)
        return resultado

    def post(self):
        data = request.get_json()
        orden_compra_dict = OrdenCompraSchema().load(data)
        orden_compra = Orden_compra(costro_transporte=orden_compra_dict['costro_transporte'],
                                    costro_seguro=orden_compra_dict['costro_seguro'],
                                    observacion=orden_compra_dict['observacion'],
                                    proovedor_id=orden_compra_dict['proovedor_id'],
                                    documento_id=orden_compra_dict['documento_id']
                                    )
        for detalle in orden_compra_dict['productos']:
            orden_compra.productos.append(DetalleOrden(cant=detalle['cant'],
                                                       precio=detalle['precio'],
                                                       desc=detalle['desc'],
                                                       producto_id=detalle['producto_id'],
                                                       ))

        orden_compra.save()
        resp = OrdenCompraSchema().dump(orden_compra)
        return resp, 201


class OrdenCompraResources(Resource):
    def get(self, identificador):
        orden_compra = Orden_compra.get_by_id(identificador)
        resultado = OrdenCompraSchema().dump(orden_compra)
        return resultado


class OrdenCompraProResource(Resource):
    def get(self, identificador):
        orden_compra = Orden_compra.query.filter(Orden_compra.proveedor_id.like('%' + identificador + '%')).all()
        resultado = OrdenCompraSchema().dump(orden_compra, many=True)
        return resultado


class OrdenCompraDocResource(Resource):
    def get(self, identificador):
        orden_compra = Orden_compra.query.filter(Orden_compra.documento_id.like('%' + identificador + '%')).all()
        resultado = OrdenCompraSchema().dump(orden_compra, many=True)
        return resultado


# -----------------------------------------------Proveedor---------------------------------

class ListaProveedorResource(Resource):
    def get(self):
        proveedor = Proveedor.get_all()
        resultado = ProveedorSchema().dump(proveedor)
        return resultado

    def post(self):
        data = request.get_json()
        proveedor_dict = ProveedorSchema().load(data)
        proveedor = Proveedor(razon_social=proveedor_dict['razon_social'],
                              costo_transporte=proveedor_dict['costo_transporte'],
                              datos_contacto=proveedor_dict['datos_contacto'],
                              )
        proveedor.save()
        resp = ProveedorSchema().dump(proveedor)
        return resp, 201


class ProveedorResources(Resource):
    def get(self, identificador):
        proveedor = Proveedor.get_by_id(identificador)
        resultado = ProveedorSchema().dump(proveedor)
        return resultado


class ProveedorConResources(Resource):
    def get(self, identificador):
        proveedor = Proveedor.query.filter(Proveedor.datos_contacto.like('%' + identificador + '%')).all()
        resultado = OrdenCompraSchema().dump(proveedor, many=True)
        return resultado


# ---------------------------Detalle_Orden--------------------------------------


class ListaDetOrdenResource(Resource):
    def get(self):
        detalle_orden = DetalleOrden.get_all()
        resultado = DetalleOrdenSchema().dump(detalle_orden)
        return resultado


class DetalleOrdenResources(Resource):
    def get(self, identificador):
        detalle_orden = DetalleOrden.get_by_id(identificador)
        resultado = DetalleOrdenSchema().dump(detalle_orden)
        return resultado


class DetalleOrdenOrdResources(Resource):
    def get(self, identificador):
        detalle_orden = DetalleOrden.query.filter(DetalleOrden.orden_de_compra.like('%' + identificador + '%')).all()
        resultado = DetalleOrdenSchema().dump(detalle_orden, many=True)
        return resultado


# -----------------------------------Tipo-------------------------------------------

class ListaTipoResource(Resource):
    def get(self):
        tipo = Tipo.get_all()
        resultado = TipoSchema().dump(tipo)
        return resultado

    def post(self):
        data = request.get_json()
        tipo_dict = TipoSchema().load(data)
        tipo = Tipo(nombre=tipo_dict['razon_social']
                    )
        tipo.save()
        resp = TipoSchema().dump(tipo)
        return resp, 201


class TipoResources(Resource):

    def get(self, identificador):
        tipo = Tipo.get_by_id(identificador)
        resultado = TipoSchema().dump(tipo)
        return resultado


class TipoNomResources(Resource):
    def get(self, identificador):
        tipo = Tipo.query.filter(Tipo.nombre.like('%' + identificador + '%')).all()
        resultado = TipoSchema().dump(tipo, many=True)
        return resultado


# ------------------------------------ Venta ---------------------------------------

class ListaVentaResource(Resource):
    def get(self):
        venta = Venta.get_all()
        resultado = VentaSchema().dump(venta)
        return resultado

    def post(self):
        data = request.get_json()
        venta_dict = VentaSchema().load(data)
        venta = Venta(tipo=venta_dict['tipo'],
                      documento=venta_dict['documento']

                      )
        for detalle in venta_dict['productos']:
            venta.productos.append(DetalleOrden(cant=detalle['cant'],
                                                precio=detalle['precio'],
                                                desc=detalle['desc'],
                                                producto_id=detalle['producto_id'],
                                                ))

        venta.save()
        resp = VentaSchema().dump(venta)
        return resp, 201


class VentaResources(Resource):
    def get(self, identificador):
        venta = Venta.get_by_id(identificador)
        resultado = VentaSchema().dump(venta)
        return resultado


class VentaDocResources(Resource):
    def get(self, identificador):
        venta = Venta.query.filter(Venta.datos_contacto.like('%' + identificador + '%')).all()
        resultado = VentaSchema().dump(venta, many=True)
        return resultado


# ------------------------------------- Detalle_Venta ----------------------------------

class ListaDetVenResource(Resource):
    def get(self):
        detalle_venta = Detalle_venta.get_all()
        resultado = JorandaSchema().dump(detalle_venta)
        return resultado


class DetalleVentaResources(Resource):
    def get(self, identificador):
        detalle_venta = Detalle_venta.get_by_id(identificador)
        resultado = DetalleVentaSchema().dump(detalle_venta)
        return resultado


# ------------------------------------------ Producto -------------------------------------

api.add_resource(ListaProductoResource, '/api/v1.0/sistema/productos/',
                 endpoint='lista_producto_resource')
api.add_resource(CoincidenciaProductosResource, '/api/v1.0/sistema/productos/codigo/<codigo>',
                 endpoint='coincidencia_productos_resource')
api.add_resource(ProductoCodResource, '/api/v1.0/sistema/productos/codigoLocal/<identificador>',
                 endpoint='producto_cod_resource')
api.add_resource(ProductoDetResource, '/api/v1.0/sistema/productos/detalle/<identificador>',
                 endpoint='producto_det_resource')
api.add_resource(ProductoCanResource, '/api/v1.0/sistema/productos/cantidad/<identificador>',
                 endpoint='producto_can_resource')
api.add_resource(ProductoPreResource, '/api/v1.0/sistema/productos/precio/<identificador>',
                 endpoint='producto_pre_resource')
api.add_resource(ProductoPorResource, '/api/v1.0/sistema/productos/porcentaje/<identificador>',
                 endpoint='producto_por_resource')
api.add_resource(ProductoGruResource, '/api/v1.0/sistema/productos/grupo/<identificador>',
                 endpoint='producto_gru_resource')

# -----------------------------------------------------Grupo---------------------------------------

api.add_resource(ListaGrupoResource, '/api/v1.0/sistema/grupos/',
                 endpoint='lista_grupo_resource')

api.add_resource(GrupoResource, '/api/v1.0/sistema/grupos/<identificador>',
                 endpoint='grupo_resource')

api.add_resource(GrupoNomResource, '/api/v1.0/sistema/grupos/nombre/<identificador>',
                 endpoint='grupo_nom_resource')
# --------------------------------------------------Documento-----------------------------------

api.add_resource(ListaDocumentoResource, '/api/v1.0/sistema/documentos/',
                 endpoint='lista_documento_resource')

api.add_resource(DocumentoResource, '/api/v1.0/sistema/documentos/<identificador>',
                 endpoint='documento_resource')

api.add_resource(DocumentoHorResource, '/api/v1.0/sistema/documentos/hora/<identificador>',
                 endpoint='documento_hor_resource')

api.add_resource(DocumentoCliResource, '/api/v1.0/sistema/documentos/cliente/<identificador>',
                 endpoint='documento_cli_resource')

api.add_resource(DocumentoJorResource, '/api/v1.0/sistema/documentos/jornada/<identificador>',
                 endpoint='documento_jor_resource')

# ---------------------------------------------------Persona-------------------------------------

api.add_resource(ListaPersonaResource, '/api/v1.0/sistema/personas/',
                 endpoint='lista_persona_resource')

api.add_resource(PersonaResources, '/api/v1.0/sistema/personas/<identificador>',
                 endpoint='persona_resource')

api.add_resource(PersonaRucResource, '/api/v1.0/sistema/personas/ruc/<identificador>',
                 endpoint='persona_ruc_resource')

api.add_resource(PersonaNomResource, '/api/v1.0/sistema/personas/nombre/<identificador>',
                 endpoint='persona_nom_resource')

api.add_resource(PersonaDirResource, '/api/v1.0/sistema/personas/dir/<identificador>',
                 endpoint='persona_dir_resource')

# -------------------------------------------------------Jornada----------------------

api.add_resource(ListaJornadaResource, '/api/v1.0/sistema/jornada/',
                 endpoint='lista_jornada_resource')

api.add_resource(JornadaResources, '/api/v1.0/sistema/jornada/<identificador>',
                 endpoint='jornada_resource')

api.add_resource(JornadaIniResource, '/api/v1.0/sistema/jornada/inicio/<identificador>',
                 endpoint='jornada_ini_resource')

api.add_resource(JornadaActResource, '/api/v1.0/sistema/jornada/activa/<identificador>',
                 endpoint='jornada_act_resource')

api.add_resource(JornadaUsuResource, '/api/v1.0/sistema/jornada/usuario/<identificador>',
                 endpoint='jornada_usu_resource')

# -------------------------------------------------------Usuario-----------------------

api.add_resource(ListaUsuarioResource, '/api/v1.0/sistema/usuario/',
                 endpoint='lista_usuario_resource')

api.add_resource(UsuarioResources, '/api/v1.0/sistema/usuario/<identificador>',
                 endpoint='usuario_resource')

api.add_resource(UsuarioRolResources, '/api/v1.0/sistema/usuario/rol/<identificador>',
                 endpoint='usuario_rol_resource')

# -------------------------------------------------- Rol ------------------------------

api.add_resource(RolResources, '/api/v1.0/sistema/rol/<identificador>',
                 endpoint='rol_resource')

api.add_resource(RolNomResources, '/api/v1.0/sistema/rol/nombre/<identificador>',
                 endpoint='rol_nom_resource')
# ------------------------------------------------Orden_Compra---------------

api.add_resource(ListaOrdenResource, '/api/v1.0/sistema/orden/',
                 endpoint='lista_orden_resource')

api.add_resource(OrdenCompraResources, '/api/v1.0/sistema/orden/<identificador>',
                 endpoint='orden_compra_resource')

api.add_resource(OrdenCompraProResource, '/api/v1.0/sistema/orden/proveedor/<identificador>',
                 endpoint='orden_compra_pro_resource')

api.add_resource(OrdenCompraDocResource, '/api/v1.0/sistema/orden/documento/<identificador>',
                 endpoint='orden_compra_doc_resource')

# -----------------------------------------------Proveedor---------------------------------

api.add_resource(ListaProveedorResource, '/api/v1.0/sistema/proveedor/',
                 endpoint='lista_proveedor_resource')

api.add_resource(ProveedorResources, '/api/v1.0/sistema/proveedor/<identificador>',
                 endpoint='proveedor_resource')

api.add_resource(ProveedorConResources, '/api/v1.0/sistema/proveedor/contacto/<identificador>',
                 endpoint='proveedor_contacto_resource')

# ---------------------------------------------Detalle_Orden-------------------------------

# ------------------------------------------------Tipo----------------------------
api.add_resource(ListaTipoResource, '/api/v1.0/sistema/tipo/',
                 endpoint='lista_tipo_resource')

api.add_resource(TipoNomResources, '/api/v1.0/sistema/tipo/nombre/<identificador>',
                 endpoint='tipo_nombre_resource')

# ------------------------------------------------ Venta ---------------------------------------

api.add_resource(ListaVentaResource, '/api/v1.0/sistema/venta/',
                 endpoint='tipo_venta_resource')

api.add_resource(VentaDocResources, '/api/v1.0/sistema/venta/documento/<identificador>',
                 endpoint='venta_doc_resource')
# ------------------------------------- Detalle_Venta ----------------------------------
