import {CheckIfLandmarksAuditResult} from "../rules/checkIfLandmarks";
import {AuditResult} from "../types";

export type Dictionary = {
    rules: {
        [key: string]: (result?: any) => string
    }
}
export const fr: Dictionary = {
    rules: {
        "check-if-ci": () => "Afin d'assurer une qualité optimale pour votre projet, nous vous recommendons de mettre en place une solution d'intégration continue",
        "check-if-button-inside-link": () => "Sémantiquement, il est interdit d'avoir un bouton dans un lien",
        "check-if-button-without-type": () => "Pour éviter des éventuels problèmes pour vos utilisateurs, nous vous conseillons de toujours définir l'attribut type pour un bouton",
        "check-if-cypress-axe-dependency": () => "Il semblerait que vous utilisez Cypress pour vos tests d'interface. Vous pourriez installer également Cypress Axe afin de vérifier le niveau d'accessibilité de vos page.",
        "check-if-html-tag-has-lang-attribute": () => "La balise HTML doit absolument définir l'attribut lang afin de configurer la langue par défaut de votre contenu",
        "check-if-image-without-alt": () => "Pour des raisons d'accessibilité, vous ne pouvez avoir d'images sant attributs alt'",
        "check-if-landmarks": (_: CheckIfLandmarksAuditResult) => {
            return "Vous devez avoir une valise <header>, <nav>, <main> et <footer> dans votre page";
        },
        "check-if-link-inside-button": () => "Sémantiquement, il est interdit d'avoir un lien dans un bouton",
        "check-if-link-inside-label": () => "Pour des raisons d'accessibilité, vous ne pouvez avoir de liens dans un label de formulaire",
        "check-if-main-lang": () => "Vous devez avoir l'attribut lang présent sur la balise html",
        "check-if-moment-dependency": () => "Il semblerait que vous utilisez la librairie Moment.js. Celle-ci n'est plus maintenue. Nous vous recommendons d'utiliser des librairies plus légères comme Day.js ou Date-fns",
        "check-if-multiple-nav-without-label": () => "Vous devez définir des libelles explicites pour vos balises nav",
        "check-if-readme": () => "Dans le but de rendre votre project facilement utilisable, veuillez créer un fichier README.md.",
        "check-if-table-caption": () => "Vous devez avoir une balise caption inside a table",
        "check-if-title": () => "Vous devez avoir un titre principal pour votre page",
        "check-if-less-three-domains": (_: AuditResult) => "Vous devez utiliser moins de trois domaines",
    }
}
