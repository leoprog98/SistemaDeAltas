using ALTASAPICORE.Modelos;
using System.Data.SqlClient;

namespace ALTASAPICORE.Clases
{
    public class ClsCRD
    {
        public string cadenaConexion { get; set; }

        public ClsCRD(string CadenaConexion)
        {
            this.cadenaConexion = CadenaConexion;
        }

        public RespuestaApi EjecutarConsulta(string strQuery)
        {
            SqlDataReader reader;
            Conexion.CadConexion = this.cadenaConexion;
            RespuestaApi resp = new();
            try
            {
                Conexion.AbrirConexion();
                if (Conexion.getConexion() != null)
                {
                    //Ejecuta la consulta
                    reader = Conexion.SelectCommand(strQuery, Conexion.connection);
                    while (reader.Read())
                    {
                        if (Convert.ToInt32(reader[0].ToString()) == 0)
                        {
                            resp.Exito = true;
                        }
                        resp.Mensaje = reader[1].ToString();
                    }
                    reader.Close();
                }
                else
                {
                    resp.Mensaje = "No se pudo conectar a la base de datos";
                }
                Conexion.CerrarConexion();
                return resp;
            }
            finally
            {
                Conexion.CerrarConexion();
            }
        }

        public RespuestaLogin ConsultaUsuario(string strQuery)
        {
            SqlDataReader reader;
            Conexion.CadConexion = this.cadenaConexion;
            RespuestaLogin resp = new();
            try
            {
                Conexion.AbrirConexion();
                if (Conexion.getConexion() != null)
                {
                    //Ejecuta la consulta
                    reader = Conexion.SelectCommand(strQuery, Conexion.connection);
                    while (reader.Read())
                    {
                        if (Convert.ToInt32(reader[0].ToString()) == 0)
                        {
                            resp.Exito = true;
                            Usuario usuario = new();
                            usuario.TipoUsuario = Convert.ToInt32(reader[2].ToString());
                            resp.Usuario = usuario;
                        }
                        resp.Mensaje = reader[1].ToString();
                    }
                    reader.Close();
                }
                else
                {
                    resp.Mensaje = "No se pudo conectar a la base de datos";
                }
                Conexion.CerrarConexion();
                return resp;
            }
            finally
            {
                Conexion.CerrarConexion();
            }
        }
    }
}
