const BASE_URL = "http://localhost:3001";

async function request(path, { body, headers, ...customConfigs } = {}) {
    const config = {
        method: body ? "POST" : "GET",
        ...customConfigs,
        headers: {
            ...(body && { "Content-Type": "application/json" }),
            ...headers,
        },
    };

    if (body) config.body = JSON.stringify(body);

    const response = await fetch(`${BASE_URL}${path}`, config);

    if (!response.ok) {
        const errorMessage = await response.text().catch(() => "");
        const error = new Error(
            `[${config.method}] ${path} failed (${response.status}): ${errorMessage || response.statusText}`,
        );
        error.status = response.status;
        throw error;
    }

    if (response.status === 204) return null;

    const text = await response.text();
    return text ? JSON.parse(text) : null;
}

export const taskApi = {
    getAll: () => request("/tasks"),
    getById: (id) => request(`/tasks/${id}`),
    create: (title) => request("/tasks", { body: { title } }),
    update: (id, data) =>
        request(`/tasks/${id}`, { method: "PATCH", body: data }),
    delete: (id) => request(`/tasks/${id}`, { method: "DELETE" }),
};
