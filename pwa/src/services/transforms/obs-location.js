export function transformResponse(data) {
    if (!Array.isArray(data)) {
        return [];
    }

    const result = data.map((item) => ({
        id: item?.codigo,
        name: item?.descricao
    }));

    return result;
}
