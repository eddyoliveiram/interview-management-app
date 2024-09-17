export const fetchVagas = async () => {
    const response = await fetch('/api/vagas');
    const data = await response.json();
    return data.data || [];
};

export const createVaga = async (vaga) => {
    const response = await fetch('/api/vagas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(vaga),
    });
    return response.json();
};

export const updateVaga = async (vaga) => {
    const response = await fetch(`/api/vagas/${vaga._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(vaga),
    });
    return response.json();
};

export const deleteVaga = async (vagaId) => {
    const response = await fetch(`/api/vagas/${vagaId}`, {
        method: 'DELETE',
    });
    return response.json();
};
