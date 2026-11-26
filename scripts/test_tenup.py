import time
from datetime import datetime, timezone
from urllib.parse import urlparse

import requests

PAGES = {
    "Seniors 1": "https://tenup.fft.fr/championnat/82634259",
    "Seniors 2": "https://tenup.fft.fr/championnat/82634259?division=142957",
    "Seniors 3": "https://tenup.fft.fr/championnat/82634259?division=142959&phase=231689&poule=513608",
    "Feminines 1": "https://tenup.fft.fr/championnat/82634258?division=142954",
    "Feminines 2": "https://tenup.fft.fr/championnat/82634258?division=142954&phase=231684&poule=513701",
}

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; TMT-Tennis-Site-Test/1.0; +https://github.com/)",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
}

def classify(response):
    body = response.text.lower()
    final_host = urlparse(response.url).netloc.lower()

    if "queue-it" in final_host or "queue-it" in body or "queue-it" in body or "queueit" in body:
        return "PROTECTION / FILE D'ATTENTE"
    if response.status_code in (401, 403, 429):
        return "ACCES REFUSE OU LIMITE"
    if response.status_code >= 400:
        return f"ERREUR HTTP {response.status_code}"
    if "tenup.fft.fr" not in final_host:
        return f"REDIRECTION EXTERNE ({final_host})"
    if len(response.text) < 1000:
        return "PAGE RECUE MAIS CONTENU TRES COURT"
    if any(marker in body for marker in ("classement", "rencontre", "poule", "championnat")):
        return "PAGE HTML RECUE - CONTENU A EXAMINER"
    return "PAGE HTML RECUE - DONNEES NON IDENTIFIEES"

lines = [
    "TEST D'ACCES AUX PAGES TEN'UP - TMT TENNIS",
    "Date UTC : " + datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"),
    "",
    "Ce test verifie uniquement l'accessibilite HTTP publique.",
    "Il ne contourne aucune protection et ne modifie aucun fichier du site.",
    "",
]

session = requests.Session()
session.headers.update(HEADERS)

for name, url in PAGES.items():
    try:
        response = session.get(url, timeout=35, allow_redirects=True)
        status = classify(response)
        lines.extend([
            f"{name} : {status}",
            f"  HTTP : {response.status_code}",
            f"  URL finale : {response.url}",
            f"  Taille HTML : {len(response.text)} caracteres",
            "",
        ])
        time.sleep(2)
    except requests.RequestException as exc:
        lines.extend([f"{name} : ECHEC RESEAU ({type(exc).__name__}: {exc})", ""])

report = "\n".join(lines)
print(report)
with open("rapport-tenup.txt", "w", encoding="utf-8") as f:
    f.write(report)

