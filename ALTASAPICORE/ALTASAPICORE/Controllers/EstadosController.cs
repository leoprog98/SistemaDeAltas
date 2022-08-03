using ALTASAPICORE.Clases;
using ALTASAPICORE.Modelos;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace ALTASAPICORE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadosController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public EstadosController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        IList<Estado> estados = new List<Estado>();

        [HttpGet]
        public IEnumerable<Estado> Get()
        {
            Conexion.CadConexion = _configuration.GetConnectionString("CadConexion");
            SqlDataReader reader;
            string strQuery;
            try
            {
                Conexion.AbrirConexion();
                if(Conexion.getConexion() != null)
                {
                    strQuery = "ApiEstado";
                    reader = Conexion.SelectCommand(strQuery, Conexion.connection);
                    while (reader.Read())
                    {
                        Estado estado = new();
                        estado.IdEstado = Convert.ToInt32(reader[0].ToString());
                        estado.DescripcionEstado = reader[1].ToString();
                        estados.Add(estado);
                    }
                }
                return estados;
            }
            finally
            {
                Conexion.CerrarConexion();
            }
        }
    }
}
