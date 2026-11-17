const API_URL = "https://rickandmortyapi.com/api/character";
const $ = (id) => document.getElementById(id);
const make = (tag, className = "", text = "") => {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
};

const ui = {
    loading: $("loadingSpinner"),
    error: $("errorContainer"),
    errorMessage: $("errorMessage"),
    characters: $("charactersContainer"),
    row: $("charactersRow"),
    previous: $("btnPrev"),
    next: $("btnNext"),
    page: $("pageIndicator")
};

let page = 1;
let requestPage = 1;
let requestUrl = `${API_URL}?page=1`;
let nextUrl = null;
let previousUrl = null;
let detailRequest = 0;

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error ${response.status} al consultar la API.`);
    return response.json();
};

const setStatusClass = (element, status) => {
    const value = status.toLowerCase();
    element.className = `status-indicator status-${["alive", "dead"].includes(value) ? value : "unknown"}`;
};

const renderCharacters = (characters) => {
    ui.row.replaceChildren();

    characters.forEach((character) => {
        const column = make("div", "col-12 col-md-6 col-lg-3");
        const card = make("article", "character-card h-100");
        const imageBox = make("div", "card-img-container");
        const image = make("img", "character-card-img");
        image.src = character.image;
        image.alt = `Imagen de ${character.name}`;
        image.loading = "eager";
        imageBox.append(image);

        const body = make("div", "card-body d-flex flex-column px-4 py-2");
        body.append(make("h2", "character-name", character.name));

        const status = make("p", "character-meta");
        const dot = make("span");
        setStatusClass(dot, character.status);
        dot.setAttribute("aria-hidden", "true");
        status.append(dot, document.createTextNode(`${character.status} - ${character.species}`));
        body.append(status);

        const location = make("div", "location-block");
        location.append(
            make("p", "location-label", "Última ubicación"),
            make("p", "location-value mb-0", character.location.name)
        );
        body.append(location);

        const button = make("button", "btn btn-primary btn-detail mt-auto", "Ver detalles");
        button.type = "button";
        button.addEventListener("click", () => showDetails(character));
        body.append(button);

        card.append(imageBox, body);
        column.append(card);
        ui.row.append(column);
    });
};

const loadCharacters = async (url = requestUrl, pageNumber = requestPage) => {
    requestUrl = url;
    requestPage = pageNumber;
    ui.loading.classList.remove("d-none");
    ui.characters.classList.add("d-none");
    ui.error.classList.add("d-none");
    ui.previous.disabled = ui.next.disabled = true;

    try {
        const data = await fetchData(url);
        if (!data.results || !data.info) throw new Error("La respuesta de la API no es válida.");

        page = pageNumber;
        nextUrl = data.info.next;
        previousUrl = data.info.prev;
        renderCharacters(data.results);
        ui.page.textContent = `Página ${page} de ${data.info.pages}`;
        ui.characters.classList.remove("d-none");
    } catch (error) {
        ui.errorMessage.textContent = `No se pudieron cargar los personajes. ${error.message}`;
        ui.error.classList.remove("d-none");
    } finally {
        ui.loading.classList.add("d-none");
        ui.previous.disabled = !previousUrl;
        ui.next.disabled = !nextUrl;
    }
};

const showDetails = async (character) => {
    const modal = bootstrap.Modal.getOrCreateInstance($("characterDetailModal"));
    const spinner = $("modalLoadingSpinner");
    const content = $("modalDetailsContent");
    const error = $("modalErrorContainer");
    const requestId = ++detailRequest;

    $("modalCharacterName").textContent = character.name;
    spinner.classList.remove("d-none");
    content.classList.add("d-none");
    error.classList.add("d-none");
    modal.show();

    try {
        const data = await fetchData(character.url);
        if (requestId !== detailRequest) return;

        $("modalCharacterName").textContent = data.name;
        $("modalCharacterImage").src = data.image;
        $("modalCharacterImage").alt = `Imagen de ${data.name}`;
        const fields = {
            modalCharId: data.id,
            modalStatusText: data.status,
            modalCharSpecies: data.species,
            modalCharGender: data.gender,
            modalCharType: data.type || "No especificado",
            modalCharOrigin: data.origin.name,
            modalCharLocation: data.location.name,
            modalCharEpisodes: data.episode.length,
            modalCharCreated: new Date(data.created).toLocaleDateString("es")
        };
        Object.entries(fields).forEach(([id, value]) => { $(id).textContent = value; });
        setStatusClass($("modalStatusDot"), data.status);
        content.classList.remove("d-none");
    } catch (err) {
        if (requestId === detailRequest) {
            error.textContent = `No se pudieron cargar los detalles. ${err.message}`;
            error.classList.remove("d-none");
        }
    } finally {
        if (requestId === detailRequest) spinner.classList.add("d-none");
    }
};

$("btnPrev").addEventListener("click", () => {
    if (previousUrl) loadCharacters(previousUrl, page - 1);
});
$("btnNext").addEventListener("click", () => {
    if (nextUrl) loadCharacters(nextUrl, page + 1);
});
$("btnRetry").addEventListener("click", () => loadCharacters());

loadCharacters();
