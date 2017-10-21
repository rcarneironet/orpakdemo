using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace Orpak.Demo.Domain.Models
{
    public class Entidade
    {
        [JsonProperty(Order = -2)] 
        [Key]
        public int Id { get; protected set; }
        public bool IsDeleted { get; set; }
        public DateTime LastModification { get; set; }
    }
}
