using Microsoft.EntityFrameworkCore;

namespace CDI;

public class PaginatedList<T>: List<T> {
    public int PageIndex { get; set; }
    public int TotalPages { get; set; }
    public PaginatedList(List<T> items, int count, int pageIndex, int pageSize) {
        PageIndex = pageIndex;
        TotalPages = (int)Math.Ceiling(count / (double)pageSize);
        AddRange(items);
    }
    
    public bool HasPreviousPage => PageIndex > 1;
    public bool HasNextPage => PageIndex < TotalPages;

    public static async Task<PaginatedList<T>> CreateAsync(IQueryable<T> source, int pageIndex, int pageSize) {
        // TODO: last page?
        var count = await source.CountAsync();
        var items = await source.Take(pageIndex * pageSize).ToListAsync();
        return new PaginatedList<T>(items, count, pageIndex, pageSize);
    }
}