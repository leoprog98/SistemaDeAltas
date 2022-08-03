using ALTASAPICORE.Clases;
using ALTASAPICORE.Modelos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace ALTASAPICORE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioTiposController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UsuarioTiposController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        IList<UsuarioTipo> tipos = new List<UsuarioTipo>();

        public IEnumerable<UsuarioTipo> Get(int estado)
        {
            Conexion.CadConexion = _configuration.GetConnectionString("CadConexion");
            SqlDataReader reader;
            string strQuery;
            try
            {
                Conexion.AbrirConexion();
                if (Conexion.getConexion() != null)
                {
                    strQuery = "ApiUsuarioTipo";
                    reader = Conexion.SelectCommand(strQuery, Conexion.connection);
                    while (reader.Read())
                    {
                        UsuarioTipo usuarioTipo = new();
                        usuarioTipo.idTipo = Convert.ToInt32(reader[0].ToString());
                        usuarioTipo.DescripcionTipo = reader[1].ToString();
                        tipos.Add(usuarioTipo);
                    }
                }
                return tipos;
            }
            finally
            {
                Conexion.CerrarConexion();
            }
        }
    }
}
