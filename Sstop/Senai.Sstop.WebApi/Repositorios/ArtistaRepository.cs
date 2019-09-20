using Senai.Sstop.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.Sstop.WebApi.Repositorios
{
    public class ArtistaRepository
    {
        private string StringConexao = "Data Source=.\\SqlExpress;Initial Catalog=T_SStop;User Id=sa;Pwd=132;";
        
        public List<ArtistaDomain> Listar()
        {
            List<ArtistaDomain> artistas = new List<ArtistaDomain>();


            string Query = "Select A.IdA, A.Nome, E.IdE, E.Nome AS NomeEstilo FROM Artistas A INNER JOIN Estilos E ON A.IdE = E.IdE;";

            using (SqlConnection con = new SqlConnection(StringConexao))
            {
                con.Open();
                SqlDataReader sdr;

                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    sdr = cmd.ExecuteReader();

                    while (sdr.Read())
                    {
                        ArtistaDomain artista = new ArtistaDomain
                        {
                            IdArtista = Convert.ToInt32(sdr["IdA"]),
                            Nome = sdr["Nome"].ToString(),
                            Estilo = new EstiloDomain
                            {
                                IdEstilo = Convert.ToInt32(sdr["IdE"]),
                                Nome = sdr["NomeEstilo"].ToString(),
                            }
                        };

                        artistas.Add(artista);
                    }
                }
            }
            return artistas;
        }

        public void Cadastrar(ArtistaDomain artistaDomain)
        {
            using (SqlConnection con = new SqlConnection(StringConexao))
            {
                string Query = "INSERT INTO Artistas(Nome, IdE) VALUES(@Nome, @IdE);";

                SqlCommand cmd = new SqlCommand(Query, con);

                cmd.Parameters.AddWithValue("@Nome", artistaDomain.Nome);
                cmd.Parameters.AddWithValue("@IdE", artistaDomain.EstiloId);

                con.Open();
                cmd.ExecuteNonQuery();
            }
        }
    }
}
