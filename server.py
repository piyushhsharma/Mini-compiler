from flask import Flask, request, jsonify
from compiler import compile_code  # assuming you have a function like this

app = Flask(__name__)

@app.route('/compile', methods=['POST'])
def compile_code_api():
    data = request.json
    code = data.get('code', '')
    output = compile_code(code)  # replace with actual logic
    return jsonify({'output': output})

if __name__ == '__main__':
    app.run(debug=True)
