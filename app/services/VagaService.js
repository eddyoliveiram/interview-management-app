export const fetchVagas = async (page, limit) => {
    const response = await fetch(`/api/vagas?page=${page}&limit=${limit}`);
    const result = await response.json();
    return { data: result.data, total: result.total };
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

export const deleteVaga = async (vagaId, fileUrl) => {
    await fetch(`/api/vagas/${vagaId}`, {
        method: 'DELETE',
    });

    if (fileUrl) {
        await fetch('/api/delete-file', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileUrl }),
        });
    }
};

