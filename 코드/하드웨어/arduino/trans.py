import serial
import requests
import time

temperature_port = '/dev/ttyACM0'
light_port = '/dev/ttyACM1'
solar_port = '/dev/ttyACM2'
baud_rate = 9600

node_url = "http://192.168.219.54:3000/data"

try:
    with serial.Serial(temperature_port, baud_rate) as temperature_ser, serial.Serial(light_port, baud_rate) as light_ser, serial.Serial(solar_port, baud_rate) as solar_ser:
        print("Serial connections established")

        while True:
            temperature_data = None
            light_data = None
            solar_data = None

            if temperature_ser.in_waiting > 0:
                temperature_data = temperature_ser.readline().decode().strip()
                temperature_data = abs(float(temperature_data))
                print("Temperature data:", temperature_data)

                # Send temperature data to the server
                data = {'temperature': temperature_data}
                try:
                    response = requests.post(node_url, json=data, timeout=10)
                    response.raise_for_status()
                    print("Temperature data sent successfully")
                except requests.exceptions.RequestException as e:
                    print("Failed to send temperature data:", e)
                    print(e.response.text if e.response else "No response received")

            if light_ser.in_waiting > 0:
                light_data = light_ser.readline().decode().strip()
                light_data = abs(float(light_data))
                print("Light data:", light_data)

                # Send light data to the server
                data = {'light': light_data}
                try:
                    response = requests.post(node_url, json=data, timeout=10)
                    response.raise_for_status()
                    print("Light data sent successfully")
                except requests.exceptions.RequestException as e:
                    print("Failed to send light data:", e)
                    print(e.response.text if e.response else "No response received")

            if solar_ser.in_waiting > 0:
                solar_data = solar_ser.readline().decode().strip()
                solar_data = abs(float(solar_data))
                print("Solar data:", solar_data)

                # Send solar data to the server
                data = {'solar': solar_data}
                try:
                    response = requests.post(node_url, json=data, timeout=10)
                    response.raise_for_status()
                    print("Solar data sent successfully")
                except requests.exceptions.RequestException as e:
                    print("Failed to send solar data:", e)
                    print(e.response.text if e.response else "No response received")

except serial.SerialException as e:
    print("Serial connection error:", e)
