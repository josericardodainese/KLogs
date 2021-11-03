const config = {
    "features": [
        {
            "title": "Tela de Home",
            "description": "Home onde vemos o logo e o menu em estado aberto.",
            "banner": "./images/PS-2.png"
        },
        {
            "title": "Tela com a toolbar e o menu de namespace aberto",
            "description": "Menu na barra de ferramentas aberta com a lista de namespaces no Cluster, quando selecionamos o namespace aberto na barra lateral e mostramos a lista de pods que pertencem ao namespace selecionado.",
            "banner": "./images/PS-3.png"
        },
        {
            "title": "Visualização de LOG",
            "description": "Visualização do LOG da POD escolhida formatado de forma fácil sem termos que rodar comandos no terminal, mostra as últimas 100 linhas de log por padrão.",
            "banner": "./images/PS-4.png"
        },
        {
            "title": "Settings",
            "description": "Tela onde configuramos as informações necessárias para a aplicação se conectar no cluster.",
            "banner": "./images/PS-5.png"
        }
    ]
}
console.log(navigator.appVersion.indexOf("Mac"))
function getIcon() {
    const icon = document.createElement('i');
    icon.classList.add('bi');
    icon.classList.add('bi-cloud-download-fill');

    return icon;
}

function getButton() {
    const button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('btn-outline-secondary');
    button.classList.add('btn-lg');
    button.classList.add('px-4');
    button.type = 'button';
    return button;
}

function getLink() {
    const link =  document.createElement('a');
    return link;
}

function getLinkDownloadByOS(assets) {

    const button = getButton();
    const icon = getIcon();
    const link  = getLink();

    // if (navigator.appVersion.indexOf("Win") != -1) Name =
    //     "Windows OS";
    if (navigator.appVersion.indexOf("Mac") != -1) {
        icon.classList.add('bi-cloud-download-fill');
        button.appendChild(icon);
        button.append(" Download for MAC")
        const assetOS = assets.filter(asset => asset['name'].indexOf(".dmg") != -1)[0];
        link.href = assetOS.browser_download_url
    } else if (navigator.appVersion.indexOf("Linux") != -1) {
        icon.classList.add('bi-cloud-download-fill');
        button.appendChild(icon);
        button.append(" Download for Linux")
        const assetOS = assets.filter(asset => asset['name'].indexOf(".deb") != -1)[0];
        link.href = assetOS.browser_download_url
    } else {
        button.innerText = "Em breve"
    }
    // if (navigator.appVersion.indexOf("X11") != -1) Name =
    //     "UNIX OS";

    link.appendChild(button);
    return link;
}

fetch("https://api.github.com/repos/josericardodainese/KLogs/releases/latest", {
    method: 'GET',
    redirect: 'follow'
})
    .then(response => response.json())
    .then(result => {
        const link = this.getLinkDownloadByOS(result.assets);
        const buttonsMain = document.querySelector('.buttons-main');
        buttonsMain.appendChild(link);
    } )



let content = '';

config.features.forEach(feature => {
    content += `
<div class="container col-xxl-8 px-4 py-5">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div class="col-10 col-sm-8 col-lg-6">
            <img src="${feature.banner}" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy">
        </div>
        <div class="col-lg-6">
            <h1 class="display-5 fw-bold lh-1 mb-3">${feature.title}</h1>
            <p class="lead">${feature.description}</p>
        </div>
    </div>
</div>
`
});

const featuresQuery = document.querySelector('.features');
featuresQuery.innerHTML = content