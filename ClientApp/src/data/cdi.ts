// GET all cdis
export const getCdis = async () => {
    const response = await fetch("https://localhost:7080/api/cdis");
    const data = await response.json();
    return data
}

// GET filtered cdis
export const getFilteredCdis = async (searchParams: string) => {
    const response = await fetch(`https://localhost:7080/api/cdis?${searchParams}`);
    const data = await response.json();
    return data
}

// GET a cdi using ID
export const getCdi = async (id: number) => {
    const response = await fetch(`https://localhost:7080/api/cdis/${id}`);
    const data = await response.json();
    return data
}

// UPDATE cdi
export const updateCdi = async (id: string, searchParams:string) => {
    const response = await fetch(`https://localhost:7080/api/cdis/edit/${id}?${searchParams}`,
    {
        method: 'PUT',
    });
    if (response.status != 200) {
        const data = await response.json();
        console.log(data)
        return data
    }  else {
        return response.status
    }
}

// ADD new cdi 
export const addCdi = async (searchParams: string) => {
    const response = await fetch(`https://localhost:7080/api/cdis/add?${searchParams}`,
    {
        method: 'POST',
    });
    const data = await response.json();
    console.log(data)
    return data
}

// DELETE cdi
export const deleteCdi = async (id: number) => {
    const response = await fetch('https://localhost:7080/api/cdis',
    {
        method: 'DELETE'
    })
    const data = await response.json();
    return data
}

export const getAllCdiCategories = async () => {
    const response = await fetch("https://localhost:7080/api/cdis/categories");
    const data = await response.json();
    return data;
}

export const getAllIndicators = async () => {
    const response = await fetch("https://localhost:7080/api/cdis/indicators");
    const data = await response.json();
    return data;
}

export const getAllLocations = async () => {
    const response = await fetch("https://localhost:7080/api/cdis/locations");
    const data = await response.json();
    return data;
}

export const getMinYear = async () => {
    const response = await fetch("https://localhost:7080/api/cdis/minYear");
    const data = await response.json();
    return data
}

export const getMaxYear = async () => {
    const response = await fetch("https://localhost:7080/api/cdis/maxYear");
    const data = await response.json();
    return data
}
