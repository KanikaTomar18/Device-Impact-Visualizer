from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Sample data: Energy consumption in kWh per hour and CO₂ emissions per kWh
device_data = {
    "Laptop": {"energy_per_hour": 0.05, "co2_per_kwh": 475},
    "Mobile": {"energy_per_hour": 0.015, "co2_per_kwh": 475},
    "TV": {"energy_per_hour": 0.1, "co2_per_kwh": 475}
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    device = request.json.get('device')
    hours = float(request.json.get('hours', 0))

    if device in device_data:
        energy = device_data[device]['energy_per_hour'] * hours
        co2 = energy * device_data[device]['co2_per_kwh']
        result = {
            "energy": round(energy, 3),
            "co2": round(co2, 2)
        }
        return jsonify(result)
    else:
        return jsonify({"error": "Invalid device"}), 400

if __name__ == '__main__':
    app.run(debug=True)
