using System.Collections;
using System.Runtime.InteropServices;
using CDI.Data;
using CDI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.Elfie.Model.Strings;
using Microsoft.CodeAnalysis.Elfie.Serialization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

// controller to handle CRUD operations for chronic disease indicator data in db
namespace CDI.Controllers
{
    // call route to make http request
    [Route("/api/[controller]")]
    [ApiController]
    public class CdisController: ControllerBase {
        // database context connected to postgresql db
        private readonly ChronicdiseaseindicatorContext _context;
        public CdisController(ChronicdiseaseindicatorContext context) {
            _context = context;
        }
        // fetches all cdi data
        // returns list of cdi
        // GET: "/api/cdis"
        // [HttpGet]
        // public async Task<ActionResult<IEnumerable<Cdi>>> GetCdis() {
        //     if (_context.Cdis == null) {
        //         return NotFound();
        //     }
        //     return await _context.Cdis.OrderBy(c => c.Id).Take(10).ToListAsync();
        // }
        // fetches cdi data using id
        // returns cdi 
        // GET: "/api/cdis/1"
        [HttpGet("{id}")]
        public async Task<ActionResult<Cdi>> GetCdi(int id) {
            if (_context.Cdis == null) {
                return NotFound();
            }

            var cdi = await _context.Cdis.FindAsync(id);

            if (cdi == null) {
                return NotFound();
            }

            return cdi;
        }

        // [HttpGet("filter")]
        // public async Task<ActionResult<string[]>> GetFilteredCdis([FromQuery] string[]? location, string? sort) {
        //     Console.WriteLine(location);
        //     return location ?? Array.Empty<string>();
        // }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cdi>>> GetFilteredCdis([FromQuery] string[]? locations, string? sort, int? minYear, int? maxYear, [FromQuery] string[]? categories, [FromQuery]string[]? indicators, string? gender, [FromQuery]string[]? races, int? pageNumber) {            
            if (_context.Cdis == null) {
                return NotFound();
            }
            
            var cdis = _context.Cdis.Select(c => c);
    
            if (!locations.IsNullOrEmpty()) {
                cdis = cdis.Where(c => c.Locationabbr != null && locations.Contains(c.Locationabbr.ToLower()));
            }

            switch (sort) {
                case "dateDesc":
                    cdis = cdis.OrderBy(c => c.Yearstart).ThenBy(c => c.Id);
                    break;
                case "category":
                    cdis = cdis.OrderBy(c => c.Topic).ThenBy(c => c.Id);
                    break;
                default:
                    cdis = cdis.OrderByDescending(c => c.Yearstart).ThenBy(c => c.Id);
                    break;
            }

            if (minYear != null) {
                cdis = cdis.Where(c => c.Yearstart >= minYear);
            } 

            if (maxYear != null) {
                cdis = cdis.Where(c => c.Yearend <= maxYear);
            }
            
            if (!categories.IsNullOrEmpty() && !categories.Contains(null)) {
                cdis = cdis.Where(c => c != null && c.Topicid != null && categories.Contains(c.Topicid.ToLower()));
            }

            if (!indicators.IsNullOrEmpty()) {
                cdis = cdis.Where(c => indicators.Contains(c.Questionid.ToLower()));
            }

            switch (gender) {
                case "genf":
                    cdis = cdis.Where(c => c.Genderid == "GENF");
                    break;
                case "genm":
                    cdis = cdis.Where(c => c.Genderid == "GENM");
                    break;
                case "geno":
                    cdis = cdis.Where(c => c.Genderid == "GENO");
                    break;
                default:
                    break;
            }

            if (!races.IsNullOrEmpty()) {
                cdis = cdis.Where(c => races.Contains(c.Raceid.ToLower()));
            }
            // Console.WriteLine("pageNumber: " + pageNumber);
            int pageSize = 10;
            return await PaginatedList<Cdi>.CreateAsync(cdis.AsNoTracking(), pageNumber ?? 1, pageSize);
        }

        // updates cdi data
        // returns no content
        // PUT: "/api/cdis/edit/1"
        [HttpPut("edit/{id}")]
        public async Task<ActionResult<Cdi>> PutCdi(
            int id, 
            string? locationName, 
            string? locationAbbr, 
            string? minYear, 
            string? maxYear, 
            string? category, 
            string? categoryId, 
            string? indicatorId, 
            string? indicator, 
            string? dataValue, 
            string? dataType, 
            string? dataTypeId, 
            string? genderId, 
            string? gender, 
            string? raceId, 
            string? race) {
            // // check if id matches before updating
            // if (id != newCdi.Id) {
            //     return BadRequest();
            // }
            var newCdi = new Cdi {
                Id = id,
                Locationabbr = locationAbbr,
                Locationname = locationName,
                Yearstart = int.Parse(minYear),
                Yearend = int.Parse(maxYear),
                Topicid = categoryId,
                Topic = category,
                Questionid = indicatorId,
                Question = indicator,
                Datavalue = dataValue,
                Datavaluetype = dataType,
                Datavaluetypeid = dataTypeId,
                Genderid = genderId,
                Gender = gender,
                Raceid = raceId,
                Race = race
            };
            // modify existing cdi by changing its state
            _context.Entry(newCdi).State = EntityState.Modified;
            // save changes to db context
            try {
                await _context.SaveChangesAsync();
            } catch (DbUpdateConcurrencyException) {
                if (!CdiExists(id)) {
                    return NotFound();
                } else {
                    throw;
                }
            }

            return Ok();
        }

        // add cdi data 
        // POST: "/api/cdis/add"
        [HttpPost("add")]
        public async Task<ActionResult<Cdi>> PostCdi(
            string? locationName, 
            string? locationAbbr, 
            string? minYear, 
            string? maxYear, 
            string? category, 
            string? categoryId, 
            string? indicatorId, 
            string? indicator, 
            string? dataValue, 
            string? dataType, 
            string? dataTypeId, 
            string? genderId, 
            string? gender, 
            string? raceId, 
            string? race) {
            if (_context.Cdis == null) {
                return Problem("Entity Set 'ChronicDiseaseIndicatorContext' is null.");
            }
            var newCdi = new Cdi {
                Locationabbr = locationAbbr,
                Locationname = locationName,
                Yearstart = minYear != null ? int.Parse(minYear) : null,
                Yearend = maxYear != null ? int.Parse(maxYear) : null,
                Topicid = categoryId,
                Topic = category,
                Questionid = indicatorId,
                Question = indicator,
                Datavalue = dataValue,
                Datavaluetype = dataType,
                Datavaluetypeid = dataTypeId,
                Genderid = genderId,
                Gender = gender,
                Raceid = raceId,
                Race = race
            };
            // add new cdi to dbcontext
            _context.Cdis.Add(newCdi);
            // save changes 
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCdi", new { id = newCdi.Id }, newCdi);
        }

        // delete cdi data using id
        // DELETE: "/api/cdis/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCdi(int id) {
            if (_context.Cdis == null) {
                return NotFound();
            }
            var cdi = await _context.Cdis.FindAsync(id);
            if (cdi == null) {
                return NotFound();
            }
            _context.Cdis.Remove(cdi);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        
        // check if cdi with id exists in db
        private bool CdiExists(int id) {
            return (_context.Cdis?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpGet("categories")]
        public List<Category> GetCdiCategories() {
            return _context.Cdis.Select(c => new Category() {
                Categoryid = c.Topicid,
                CategoryType = c.Topic
            })
            .Distinct()
            .ToList(); 
        }

        [HttpGet("indicators")]
        public List<Indicator> GetCdiIndicators() {
            return _context.Cdis.Select(c => new Indicator() {
                Indicatorid = c.Questionid,
                Indicatortype = c.Question,
            })
            .Distinct()
            .ToList(); 
        }

        [HttpGet("locations")]
        public List<Location> GetCdiLocations() {
            return _context.Cdis.Select(c => new Location() {  
                Locationabbr = c.Locationabbr, 
                Locationname = c.Locationname 
                })
                .Distinct()
                .OrderBy(l => l.Locationname)
                .ToList();
        }

        [HttpGet("minYear")]
        public int GetMinYear() {
            return _context.Cdis.Select(c => c.Yearstart).Min().GetValueOrDefault();
        }

        [HttpGet("maxYear")]
        public int GetMaxYear() {
            return _context.Cdis.Select(c => c.Yearend).Max().GetValueOrDefault();
        }

    }

}