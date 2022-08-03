using ALTASAPICORE.Clases;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using ALTASAPICORE.Modelos;

namespace ALTASAPICORE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UsuariosController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        IList<Usuario> usuarios = new List<Usuario>();

        public IEnumerable<Usuario> Get()
        {
            SqlDataReader reader;
            Conexion.CadConexion = _configuration.GetConnectionString("CadConexion");
            string strQuery;
            try
            {
                Conexion.AbrirConexion();
                    if(Conexion.getConexion() != null)
                    {
                        strQuery = "ApiCRUDUsuario 'R', 0";
                        reader = Conexion.SelectCommand(strQuery, Conexion.connection);
                        while (reader.Read())
                        {
                            Usuario usuario = new();
                            usuario.IdUsuario = Convert.ToInt32(reader[0].ToString());
                            usuario.CUsuario = reader[1].ToString();
                            usuario.Nombre = reader[2].ToString();
                            usuario.Direccion = reader[3].ToString();
                            usuario.Telefono = reader[4].ToString();
                            usuario.CodigoPostal = reader[5].ToString();
                            usuario.TipoUsuario = Convert.ToInt32(reader[6].ToString());
                            usuario.DescripcionTipo = reader[7].ToString();
                            usuario.Estado = Convert.ToInt32(reader[8].ToString());
                            usuario.DescripcionEstado = reader[9].ToString();
                            usuario.ciudad = Convert.ToInt32(reader[10].ToString());
                            usuario.DescripcionCiudad = reader[11].ToString();
                            usuarios.Add(usuario);
                        }
                        reader.Close();
                    }
            }
            finally
            {
                Conexion.CerrarConexion();
            }
                
            return usuarios;
        }

        [HttpPost]
        public RespuestaApi Post([FromBody] Usuario usuario)
        {
            ClsCRD Consulta = new ClsCRD(_configuration.GetConnectionString("CadConexion"));
            return Consulta.EjecutarConsulta("ApiCRUDUSuario 'C', 0,'" + usuario.CUsuario + "','" + usuario.Nombre + "','"
                + usuario.Direccion + "','" + usuario.Telefono + "','" + usuario.CodigoPostal + "'," + usuario.TipoUsuario
                + "," + usuario.Estado + "," + usuario.ciudad + ",'" + usuario.Contrasena + "', 1");
        }

        [HttpPut]
        public RespuestaApi Put([FromBody] Usuario usuario)
        {
            ClsCRD Consulta = new ClsCRD(_configuration.GetConnectionString("CadConexion"));
            return Consulta.EjecutarConsulta("ApiCRUDUSuario 'U'," + usuario.IdUsuario + ",'" + usuario.CUsuario + "','" + usuario.Nombre + "','"
                + usuario.Direccion + "','" + usuario.Telefono + "','" + usuario.CodigoPostal + "'," + usuario.TipoUsuario
                + "," + usuario.Estado + "," + usuario.ciudad + ",'" + usuario.Contrasena + "', 1");
        }

        [HttpDelete("{idUsuario}")]
        public RespuestaApi Delete(int idUsuario)
        {
            ClsCRD Consulta = new ClsCRD(_configuration.GetConnectionString("CadConexion"));
            return Consulta.EjecutarConsulta("ApiCRUDUSuario 'D'," + idUsuario);
        }
    }
}
