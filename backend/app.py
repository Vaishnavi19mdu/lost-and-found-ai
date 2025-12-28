from flask import Flask # type: ignore

app = Flask(__name__)

@app.route("/")
def home():
    return "Lost and Found AI Backend Running"

if __name__ == "__main__":
    app.run(debug=True)
