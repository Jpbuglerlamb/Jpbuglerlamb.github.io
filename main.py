from flask import Flask, render_template
import data
import data_fr
from translations import TEXT

app = Flask(__name__)

CONTENT = {"en": data, "fr": data_fr}


def render_home(lang):
    """Render the CV page in the given language ("en" or "fr")."""
    content = CONTENT[lang]
    return render_template(
        "index.html",
        lang=lang,
        t=TEXT[lang],
        projects=content.PROJECTS,
        experience=content.EXPERIENCE,
        education=content.EDUCATION,
        languages=content.LANGUAGES,
    )

@app.route('/')
def home():
    return render_home("en")

@app.route('/fr/')
def home_fr():
    return render_home("fr")

if __name__ == '__main__':
    app.run(debug=True)