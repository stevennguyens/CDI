using CDI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// controller to handle CRUD operations for chronic disease indicator data in db
namespace CDI.Controllers
{
    // call route to make http request
    [Route("/api/[controller]")]
    [ApiController]
    public class CdisController: ControllerBase {
        // database context connected to postgresql db
        private readonly ChronicDiseaseIndicatorContext _context;
        public CdisController(ChronicDiseaseIndicatorContext context) {
            _context = context;
        }
        // fetches all cdi data
        // returns list of cdi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cdi>>> GetCdis() {
            if (_context.Cdis == null) {
                return NotFound();
            }
            return await _context.Cdis.ToListAsync();
        }
        // fetches cdi data using id
        // returns cdi 
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
        // updates cdi data
        // returns no content
        [HttpPut("{id}")]
        public async Task<ActionResult<Cdi>> PutCdi(int id, Cdi newCdi) {
            // check if id matches before updating
            if (id != newCdi.Id) {
                return BadRequest();
            }
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

            return NoContent();
        }

        // add cdi data 
        public async Task<ActionResult<Cdi>> PostCdi(Cdi newCdi) {
            if (_context.Cdis == null) {
                return Problem("Entity Set 'ChronicDiseaseIndicatorContext' is null.");
            }
            // add new cdi to dbcontext
            _context.Cdis.Add(newCdi);
            // save changes 
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCdi", new { id = newCdi.Id }, newCdi);
        }

        // delete cdi data using id
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

    }

}