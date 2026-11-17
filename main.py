from flask import Flask, render_template
from data import PROJECTS, EXPERIENCE, EDUCATION

app = Flask(__name__)

@app.route('/')
def home():
    return render_template(
        "index.html",
        projects=PROJECTS,
        experience=EXPERIENCE,
        education=EDUCATION,
    )

if __name__ == '__main__':
    app.run(debug=True)